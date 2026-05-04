const router = require('express').Router();
const { auth } = require('../middleware/auth');
const Token = require('../models/Token');
const User = require('../models/User');

// Get token wallet history
router.get('/wallet', auth, async (req, res) => {
  try {
    const transactions = await Token.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(30);
    const user = await User.findById(req.user.id).select('tokenBalance');
    res.json({ balance: user.tokenBalance, transactions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user redeem history
router.get('/redeem-history', auth, async (req, res) => {
  try {
    const redeems = await Token.find({ userId: req.user.id, type: 'debit' }).sort({ createdAt: -1 });
    res.json(redeems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Redeem tokens
router.post('/redeem', auth, async (req, res) => {
  try {
    const { amount, offer } = req.body;
    const user = await User.findById(req.user.id);
    if (user.tokenBalance < amount) return res.status(400).json({ message: 'Insufficient tokens' });

    user.tokenBalance -= amount;
    await user.save();

    await Token.create({
      userId: req.user.id,
      type: 'debit',
      amount,
      reason: `Redeemed for: ${offer}`,
      balanceAfter: user.tokenBalance,
    });

    res.json({ message: 'Tokens redeemed!', newBalance: user.tokenBalance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
