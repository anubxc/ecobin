const router = require('express').Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const WasteLog = require('../models/WasteLog');

// User dashboard summary
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const logs = await WasteLog.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(5);

    // Stats
    const allLogs = await WasteLog.find({ userId: req.user.id });
    const stats = { Wet: 0, Dry: 0, Recyclable: 0 };
    allLogs.forEach(l => { stats[l.wasteType] = (stats[l.wasteType] || 0) + l.weight; });

    res.status(200).json({ user, recentLogs: logs, stats });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
