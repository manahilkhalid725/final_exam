const express = require('express');
const Task = require('../models/task');
const router = express.Router();

// Create
router.post('/', async (req, res) => {
  const { name, description, dueDate } = req.body;
  const newTask = new Task({ name, description, dueDate });
  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Error creating task' });
  }
});

// Get all
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// Get
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching task' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

// Update
router.put('/:id', async (req, res) => {
  const { name, description, dueDate } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { name, description, dueDate },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
});

module.exports = router;
