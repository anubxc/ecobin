const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// GET all feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }).limit(10);
    if (feedbacks.length === 0) return res.status(404).json({ message: 'No feedback found' });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST feedback (no auth required)
router.post('/', async (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) return res.status(422).json({ message: 'Name and message are required' });
  if (name.trim().length === 0 || message.trim().length === 0) return res.status(422).json({ message: 'Name and message cannot be empty' });
  
  try {
    const feedback = new Feedback({ name, message });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE feedback (useful for cleanup)
router.delete('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.status(200).json({ message: 'Feedback deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE all feedback (danger zone)
router.delete('/all/clear', async (req, res) => {
  try {
    const result = await Feedback.deleteMany({});
    if (result.deletedCount === 0) return res.status(404).json({ message: 'No feedback to clear' });
    res.status(200).json({ message: 'All feedback cleared', deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
