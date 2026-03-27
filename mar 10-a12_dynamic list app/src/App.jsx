import { useState } from 'react'
import './App.css'

const PRIORITY_OPTIONS = [
  { value: 'high', label: 'High', color: '#ef4444' },
  { value: 'medium', label: 'Medium', color: '#f59e0b' },
  { value: 'low', label: 'Low', color: '#22c55e' },
]

const FILTERS = ['All', 'Active', 'Completed']

function App() {
  const [tasks, setTasks] = useState([])
  const [taskText, setTaskText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [activeFilter, setActiveFilter] = useState('All')

  function addTask(e) {
    e.preventDefault()
    if (!taskText.trim()) return

    const newTask = {
      id: Date.now(),
      text: taskText.trim(),
      priority,
      done: false,
    }
    setTasks((prev) => [...prev, newTask])
    setTaskText('')
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function getPriorityColor(p) {
    return PRIORITY_OPTIONS.find((opt) => opt.value === p)?.color || '#94a3b8'
  }

  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === 'Active') return !t.done
    if (activeFilter === 'Completed') return t.done
    return true
  })

  const completedCount = tasks.filter((t) => t.done).length

  return (
    <div className="app-container">
      <h1 className="app-title">QuickTasks</h1>
      <p className="app-subtitle">
        {tasks.length === 0
          ? 'No tasks yet'
          : `${completedCount} of ${tasks.length} completed`}
      </p>

      <div className="filter-tabs">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-tab ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <form className="add-form" onSubmit={addTask}>
        <input
          type="text"
          className="task-input"
          placeholder="What needs to be done?"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          {PRIORITY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button type="submit" className="add-btn">Add</button>
      </form>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <p>
            {tasks.length === 0
              ? 'Add your first task to get started!'
              : `No ${activeFilter.toLowerCase()} tasks right now.`}
          </p>
        </div>
      ) : (
        <ol className="task-list">
          {filteredTasks.map((task, idx) => (
            <li key={task.id} className={`task-item ${task.done ? 'completed' : ''}`}>
              <span
                className="priority-dot"
                style={{ backgroundColor: getPriorityColor(task.priority) }}
                title={task.priority}
              />
              <span className="task-number">{idx + 1}.</span>
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="task-checkbox"
                />
                <span className="task-text">{task.text}</span>
              </label>
              <button
                className="delete-btn"
                onClick={() => removeTask(task.id)}
                title="Delete"
              >
                &times;
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default App
