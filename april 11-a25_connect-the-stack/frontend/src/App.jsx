// Connect the Stack — React frontend connected to the backend Task API
import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:3003'; // points to crud-lab backend

const STATUSES  = ['pending', 'in-progress', 'done'];
const PRIORITIES = ['low', 'medium', 'high'];

const STATUS_COLORS = {
  pending:     'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  done:        'bg-green-100 text-green-800',
};
const PRIORITY_COLORS = {
  low:    'bg-gray-100 text-gray-600',
  medium: 'bg-orange-100 text-orange-700',
  high:   'bg-red-100 text-red-700',
};

export default function App() {
  const [tasks,   setTasks]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [form,    setForm]    = useState({ title: '', description: '', priority: 'medium' });
  const [editId,  setEditId]  = useState(null);
  const [filter,  setFilter]  = useState('');

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const url = filter ? `${API}/tasks?status=${filter}` : `${API}/tasks`;
      const { data } = await axios.get(url);
      setTasks(data);
      setError('');
    } catch {
      setError('Failed to fetch tasks. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, [filter]);

  // Submit (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    try {
      if (editId) {
        await axios.put(`${API}/tasks/${editId}`, form);
      } else {
        await axios.post(`${API}/tasks`, form);
      }
      setForm({ title: '', description: '', priority: 'medium' });
      setEditId(null);
      fetchTasks();
    } catch {
      setError('Failed to save task.');
    }
  };

  // Update status inline
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/tasks/${id}`, { status });
      fetchTasks();
    } catch {
      setError('Failed to update status.');
    }
  };

  // Delete
  const deleteTask = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await axios.delete(`${API}/tasks/${id}`);
      fetchTasks();
    } catch {
      setError('Failed to delete task.');
    }
  };

  // Load task into edit form
  const startEdit = (task) => {
    setEditId(task._id);
    setForm({ title: task.title, description: task.description, priority: task.priority });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({ title: '', description: '', priority: 'medium' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 Task Manager</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-5 mb-6 space-y-3">
          <h2 className="font-semibold text-gray-700">{editId ? 'Edit Task' : 'New Task'}</h2>
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Task title *"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Description (optional)"
            rows={2}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <select
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
            value={form.priority}
            onChange={e => setForm({ ...form, priority: e.target.value })}
          >
            {PRIORITIES.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)} priority</option>)}
          </select>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm font-medium transition">
              {editId ? 'Update Task' : 'Add Task'}
            </button>
            {editId && (
              <button type="button" onClick={cancelEdit} className="px-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm transition">
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Filter */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            onClick={() => setFilter('')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${!filter ? 'bg-blue-600 text-white' : 'bg-white border text-gray-600 hover:bg-gray-100'}`}
          >All</button>
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${filter === s ? 'bg-blue-600 text-white' : 'bg-white border text-gray-600 hover:bg-gray-100'}`}
            >{s}</button>
          ))}
        </div>

        {/* Error */}
        {error && <div className="bg-red-50 text-red-700 rounded-lg p-3 mb-4 text-sm">{error}</div>}

        {/* Task list */}
        {loading ? (
          <p className="text-center text-gray-400 py-8">Loading tasks…</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No tasks yet. Add one above!</p>
        ) : (
          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task._id} className="bg-white rounded-xl shadow-sm p-4 flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{task.title}</p>
                  {task.description && <p className="text-sm text-gray-500 mt-0.5 truncate">{task.description}</p>}
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[task.status]}`}>{task.status}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</span>
                  </div>
                </div>
                <div className="flex gap-1 flex-col items-end">
                  <select
                    value={task.status}
                    onChange={e => updateStatus(task._id, e.target.value)}
                    className="text-xs border rounded px-1 py-0.5 focus:outline-none"
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <div className="flex gap-1 mt-1">
                    <button onClick={() => startEdit(task)} className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition">Edit</button>
                    <button onClick={() => deleteTask(task._id)} className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded transition">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
