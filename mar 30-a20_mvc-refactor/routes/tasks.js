// routes/tasks.js  — routing layer (View-side routing)
const express = require('express');
const router  = express.Router();
const TaskController = require('../controllers/taskController');

router.get   ('/',           TaskController.getAll);
router.get   ('/:id',        TaskController.getOne);
router.post  ('/',           TaskController.create);
router.put   ('/:id',        TaskController.update);
router.patch ('/:id/status', TaskController.updateStatus);
router.delete('/:id',        TaskController.remove);

module.exports = router;
