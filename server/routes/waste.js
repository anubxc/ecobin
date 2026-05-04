const router = require('express').Router();
const { auth } = require('../middleware/auth');
const WasteLog = require('../models/WasteLog');
const User = require('../models/User');
const Token = require('../models/Token');
const Bin = require('../models/Bin');

// Token rate per kg by waste type
const TOKEN_RATES = { Wet: 2, Dry: 3, Recyclable: 5 };

// Get all bins for users
router.get('/bins', auth, async (req, res) => {
  try {
    const bins = await Bin.find().sort({ createdAt: -1 });
    res.json(bins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add waste entry (simulates IoT bin scan)
router.post('/add', auth, async (req, res) => {
  try {
    const { binId, wasteType, weight } = req.body;
    if (!binId || !wasteType || !weight) return res.status(400).json({ message: 'All fields required' });

    const tokensEarned = Math.round(TOKEN_RATES[wasteType] * weight);

    // Create waste log
    const bin = await Bin.findOne({ binId });
    const log = await WasteLog.create({
      userId: req.user.id,
      binId,
      wasteType,
      weight,
      tokensEarned,
      location: bin?.location || 'Unknown',
    });

    // Update bin fill level
    if (bin) {
      bin.fillLevel = Math.min(100, bin.fillLevel + Math.round(weight * 5));
      if (bin.fillLevel >= 100) bin.status = 'Full';
      await bin.save();
    }

    res.status(201).json({ log, tokensEarned, message: 'Waste logged successfully. Tokens will be awarded after admin approval.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's waste history
router.get('/history', auth, async (req, res) => {
  try {
    const logs = await WasteLog.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(20);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
