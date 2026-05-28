// CRUD Lab — Express + Mongoose CRUD for a Task Manager

const express  = require('express');
const mongoose = require('mongoose');

// ─── CONNECT ──────────────────────────────────────────────────────────────────
mongoose.connect('mongodb://localhost:27017/crud-lab')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// ─── SCHEMA & MODEL ───────────────────────────────────────────────────────────
const taskSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    status:      { type: String, enum: ['pending', 'in-progress', 'done'], default: 'pending' },
    priority:    { type: String, enum: ['low', 'medium', 'high'],          default: 'medium' },
    dueDate:     { type: Date },
  },
  { timestamps: true }
);
const Task = mongoose.model('Task', taskSchema);

// ─── APP ──────────────────────────────────────────────────────────────────────
const app = express();
app.use(express.json());

// CREATE — POST /tasks
app.post('/tasks', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ ALL — GET /tasks  (optional ?status= & ?priority= filters)
app.get('/tasks', async (req, res) => {
  try {
    const filter = {};
    if (req.query.status)   filter.status   = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ ONE — GET /tasks/:id
app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

// UPDATE — PUT /tasks/:id
app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE — DELETE /tasks/:id
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted', task });
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

const PORT = 3003;
app.listen(PORT, () => console.log(`CRUD Lab API running on http://localhost:${PORT}`));
