const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// GET all feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }).limit(10);
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST feedback (no auth required)
router.post('/', async (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) return res.status(400).json({ message: 'Name and message are required' });
  
  try {
    const feedback = new Feedback({ name, message });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE feedback (useful for cleanup)
router.delete('/:id', async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE all feedback (danger zone)
router.delete('/all/clear', async (req, res) => {
  try {
    await Feedback.deleteMany({});
    res.json({ message: 'All feedback cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
