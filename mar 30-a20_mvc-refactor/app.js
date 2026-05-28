// app.js  — application entry point
const express   = require('express');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(express.json());

app.use('/tasks', taskRoutes);

app.get('/', (req, res) => res.json({ message: 'Task Manager API (MVC)' }));

const PORT = 3002;
app.listen(PORT, () => console.log(`MVC Task API running on http://localhost:${PORT}`));
