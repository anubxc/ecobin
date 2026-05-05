const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createToken = user => jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

const serializeUser = user => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  tokenBalance: user.tokenBalance,
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(422).json({ message: 'Name, email, and password are required' });
    
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role: role || 'resident', authProvider: 'local' });

    const token = createToken(user);
    res.status(201).json({ token, user: serializeUser(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(422).json({ message: 'Email and password are required' });
    
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    if (!user.password) return res.status(401).json({ message: 'Please continue with Google for this account' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = createToken(user);
    
    // Set cookie with token (optional)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    res.status(200).json({ token, user: serializeUser(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

// Google sign-in
// router.post('/google', async (req, res) => {
//   try {
//     const { credential } = req.body;
//     if (!process.env.GOOGLE_CLIENT_ID) {
//       return res.status(500).json({ message: 'Google sign-in is not configured on the server' });
//     }
//     if (!credential) return res.status(400).json({ message: 'Google credential is required' });

//     const ticket = await googleClient.verifyIdToken({
//       idToken: credential,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload();
//     if (!payload?.email_verified) {
//       return res.status(400).json({ message: 'Google email is not verified' });
//     }

//     let user = await User.findOne({ email: payload.email });
//     if (!user) {
//       user = await User.create({
//         name: payload.name || payload.email.split('@')[0],
//         email: payload.email,
//         googleId: payload.sub,
//         authProvider: 'google',
//         role: 'resident',
//       });
//     } else {
//       user.googleId = user.googleId || payload.sub;
//       user.authProvider = user.authProvider === 'local' ? 'local' : 'google';
//       await user.save();
//     }

//     const token = createToken(user);
//     res.json({ token, user: serializeUser(user) });
//   } catch (err) {
//     res.status(401).json({ message: 'Google sign-in failed' });
//   }
// });

module.exports = router;
