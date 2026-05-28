// models/task.js  — data layer (Model)
let tasks = [
  { id: 1, title: 'Setup project', description: 'Initialise Node + Express', status: 'done',    priority: 'high' },
  { id: 2, title: 'Build routes',  description: 'Create CRUD endpoints',     status: 'in-progress', priority: 'high' },
  { id: 3, title: 'Write tests',   description: 'Test via Postman',           status: 'pending', priority: 'medium' },
];
let nextId = 4;

const TaskModel = {
  findAll: (filter = {}) => {
    if (filter.status) return tasks.filter(t => t.status === filter.status);
    return [...tasks];
  },
  findById: (id) => tasks.find(t => t.id === id) || null,
  create: ({ title, description = '', priority = 'medium' }) => {
    const task = { id: nextId++, title, description, status: 'pending', priority };
    tasks.push(task);
    return task;
  },
  update: (id, data) => {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;
    tasks[idx] = { ...tasks[idx], ...data, id };
    return tasks[idx];
  },
  delete: (id) => {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;
    return tasks.splice(idx, 1)[0];
  },
};

module.exports = TaskModel;
