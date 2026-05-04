const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Reads MONGO_URI from .env automatically

async function createAdmin() {
  const MONGO_URI = process.env.MONGO_URI;
  console.log('Connecting to:', MONGO_URI.substring(0, 50) + '...');

  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 15000 });
    console.log('✅ Connected to MongoDB!');

    const User = require('./models/User');

    // Check if already exists
    const existing = await User.findOne({ email: 'admin@ecobin.com' });
    if (existing) {
      existing.role = 'admin';
      await existing.save();
      console.log('✅ Existing user updated to admin! Email: admin@ecobin.com');
    } else {
      const hash = await bcrypt.hash('admin123', 10);
      const admin = await User.create({
        name: 'EcoBin Admin',
        email: 'admin@ecobin.com',
        password: hash,
        role: 'admin',
        authProvider: 'local'
      });
      console.log('✅ Admin account created!');
      console.log('   Email   : admin@ecobin.com');
      console.log('   Password: admin123');
      console.log('   Role    :', admin.role);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

createAdmin();
