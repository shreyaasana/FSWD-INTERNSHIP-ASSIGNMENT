const express = require('express');
const app = express();
app.use(express.json());

// In-memory task store
let tasks = [
  { id: 1, title: 'Setup project',    description: 'Initialise Node + Express', status: 'done',    priority: 'high' },
  { id: 2, title: 'Build routes',     description: 'Create CRUD endpoints',     status: 'in-progress', priority: 'high' },
  { id: 3, title: 'Write tests',      description: 'Test via Postman',           status: 'pending', priority: 'medium' },
];
let nextId = 4;

// GET /tasks           → list all tasks (optional ?status= filter)
app.get('/tasks', (req, res) => {
  const { status } = req.query;
  const result = status ? tasks.filter(t => t.status === status) : tasks;
  res.json(result);
});

// GET /tasks/:id       → get single task
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// POST /tasks          → create task
app.post('/tasks', (req, res) => {
  const { title, description, priority = 'medium' } = req.body;
  if (!title) return res.status(400).json({ message: 'title is required' });
  const task = { id: nextId++, title, description: description || '', status: 'pending', priority };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /tasks/:id       → update task (full update)
app.put('/tasks/:id', (req, res) => {
  const idx = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Task not found' });
  tasks[idx] = { ...tasks[idx], ...req.body, id: tasks[idx].id };
  res.json(tasks[idx]);
});

// PATCH /tasks/:id/status  → update only the status
app.patch('/tasks/:id/status', (req, res) => {
  const { status } = req.body;
  const allowed = ['pending', 'in-progress', 'done'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: `status must be one of: ${allowed.join(', ')}` });
  }
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Task not found' });
  task.status = status;
  res.json(task);
});

// DELETE /tasks/:id    → delete task
app.delete('/tasks/:id', (req, res) => {
  const idx = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Task not found' });
  const deleted = tasks.splice(idx, 1)[0];
  res.json({ message: 'Task deleted', task: deleted });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Task API running on http://localhost:${PORT}`));
