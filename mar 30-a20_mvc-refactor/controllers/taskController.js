// controllers/taskController.js  — business logic (Controller)
const TaskModel = require('../models/task');

const VALID_STATUSES = ['pending', 'in-progress', 'done'];

const TaskController = {
  getAll: (req, res) => {
    const { status } = req.query;
    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: `status must be one of: ${VALID_STATUSES.join(', ')}` });
    }
    res.json(TaskModel.findAll(status ? { status } : {}));
  },

  getOne: (req, res) => {
    const task = TaskModel.findById(parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  },

  create: (req, res) => {
    const { title, description, priority } = req.body;
    if (!title) return res.status(400).json({ message: 'title is required' });
    const task = TaskModel.create({ title, description, priority });
    res.status(201).json(task);
  },

  update: (req, res) => {
    const task = TaskModel.update(parseInt(req.params.id), req.body);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  },

  updateStatus: (req, res) => {
    const { status } = req.body;
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: `status must be one of: ${VALID_STATUSES.join(', ')}` });
    }
    const task = TaskModel.update(parseInt(req.params.id), { status });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  },

  remove: (req, res) => {
    const task = TaskModel.delete(parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted', task });
  },
};

module.exports = TaskController;
