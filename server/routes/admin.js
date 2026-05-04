const router = require('express').Router();
const { auth, adminOnly } = require('../middleware/auth');
const User = require('../models/User');
const WasteLog = require('../models/WasteLog');
const Bin = require('../models/Bin');

// Admin dashboard
router.get('/dashboard', auth, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'resident' });
    const totalLogs = await WasteLog.countDocuments();
    const bins = await Bin.find();
    const fullBins = bins.filter(b => b.fillLevel >= 80).length;
    const recentLogs = await WasteLog.find().sort({ createdAt: -1 }).limit(10).populate('userId', 'name email');

    // Waste stats
    const allLogs = await WasteLog.find();
    const wasteStats = { Wet: 0, Dry: 0, Recyclable: 0 };
    allLogs.forEach(l => { wasteStats[l.wasteType] += l.weight; });

    res.json({ totalUsers, totalLogs, totalBins: bins.length, fullBins, recentLogs, wasteStats, bins });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all users
router.get('/users', auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find({ role: 'resident' }).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all bins / add bin
router.get('/bins', auth, adminOnly, async (req, res) => {
  try {
    const bins = await Bin.find().sort({ createdAt: -1 });
    res.json(bins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/bins', auth, adminOnly, async (req, res) => {
  try {
    const bin = await Bin.create(req.body);
    res.status(201).json(bin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark bin as collected (reset fill level)
router.patch('/bins/:binId/collect', auth, adminOnly, async (req, res) => {
  try {
    const bin = await Bin.findOneAndUpdate(
      { binId: req.params.binId },
      { fillLevel: 0, status: 'Active', lastCollected: new Date() },
      { new: true }
    );
    res.json(bin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get pending waste logs
router.get('/waste/pending', auth, adminOnly, async (req, res) => {
  try {
    const logs = await WasteLog.find({ status: 'Pending' }).populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Approve waste log
router.patch('/waste/:id/approve', auth, adminOnly, async (req, res) => {
  try {
    const log = await WasteLog.findById(req.params.id);
    if (!log || log.status !== 'Pending') return res.status(400).json({ message: 'Invalid or already processed log' });

    log.status = 'Approved';
    await log.save();

    // Award tokens to user
    const user = await User.findById(log.userId);
    user.tokenBalance += log.tokensEarned;
    user.totalWasteLogged += log.weight;
    await user.save();

    const Token = require('../models/Token');
    await Token.create({
      userId: user._id,
      type: 'credit',
      amount: log.tokensEarned,
      reason: `Waste disposal approved - ${log.wasteType} (${log.weight}kg)`,
      balanceAfter: user.tokenBalance,
    });

    res.json({ message: 'Log approved', log });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reject waste log
router.patch('/waste/:id/reject', auth, adminOnly, async (req, res) => {
  try {
    const log = await WasteLog.findById(req.params.id);
    if (!log || log.status !== 'Pending') return res.status(400).json({ message: 'Invalid or already processed log' });

    log.status = 'Rejected';
    await log.save();

    res.json({ message: 'Log rejected', log });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all redeem history (across all users)
router.get('/redeem-history', auth, adminOnly, async (req, res) => {
  try {
    const Token = require('../models/Token');
    const redeems = await Token.find({ type: 'debit' }).populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(redeems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
