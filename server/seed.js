// seed.js — run once to populate sample data
// Usage: node seed.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Bin = require('./models/Bin');
const WasteLog = require('./models/WasteLog');
const Token = require('./models/Token');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecobin';

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing
  await Promise.all([User.deleteMany(), Bin.deleteMany(), WasteLog.deleteMany(), Token.deleteMany()]);
  console.log('Cleared existing data');

  // Create admin
  const adminHash = await bcrypt.hash('admin123', 10);
  const admin = await User.create({
    name: 'Admin Priya',
    email: 'admin@ecobin.com',
    password: adminHash,
    role: 'admin',
    tokenBalance: 0,
  });

  // Create residents
  const hash = await bcrypt.hash('password123', 10);
  const residents = await User.insertMany([
    { name: 'Rahul Sharma', email: 'rahul@test.com', password: hash, tokenBalance: 150, totalWasteLogged: 12.5 },
    { name: 'Anjali Singh', email: 'anjali@test.com', password: hash, tokenBalance: 85, totalWasteLogged: 7.0 },
    { name: 'Vikram Patel', email: 'vikram@test.com', password: hash, tokenBalance: 220, totalWasteLogged: 20.0 },
  ]);

  // Create bins
  await Bin.insertMany([
    { binId: 'BIN-001', location: 'Sector 12, Near Park Gate', zone: 'Zone A', fillLevel: 45, wasteType: 'Recyclable', status: 'Active' },
    { binId: 'BIN-002', location: 'Market Street, Block A', zone: 'Zone B', fillLevel: 85, wasteType: 'Dry', status: 'Full' },
    { binId: 'BIN-003', location: 'Residential Zone 4', zone: 'Zone A', fillLevel: 30, wasteType: 'Wet', status: 'Active' },
    { binId: 'BIN-004', location: 'Community Centre, Main Hall', zone: 'Zone C', fillLevel: 60, wasteType: 'Recyclable', status: 'Active' },
  ]);

  // Create sample waste logs for Rahul
  const wasteLogs = [
    { userId: residents[0]._id, binId: 'BIN-001', wasteType: 'Recyclable', weight: 2.5, tokensEarned: 13, location: 'Sector 12' },
    { userId: residents[0]._id, binId: 'BIN-003', wasteType: 'Wet', weight: 1.0, tokensEarned: 2, location: 'Residential Zone 4' },
    { userId: residents[0]._id, binId: 'BIN-001', wasteType: 'Dry', weight: 3.0, tokensEarned: 9, location: 'Sector 12' },
    { userId: residents[1]._id, binId: 'BIN-002', wasteType: 'Dry', weight: 2.0, tokensEarned: 6, location: 'Market Street' },
    { userId: residents[2]._id, binId: 'BIN-004', wasteType: 'Recyclable', weight: 4.0, tokensEarned: 20, location: 'Community Centre' },
  ];
  await WasteLog.insertMany(wasteLogs);

  // Token transaction records
  await Token.insertMany([
    { userId: residents[0]._id, type: 'credit', amount: 13, reason: 'Waste disposal - Recyclable (2.5kg)', balanceAfter: 13 },
    { userId: residents[0]._id, type: 'credit', amount: 2, reason: 'Waste disposal - Wet (1kg)', balanceAfter: 15 },
    { userId: residents[0]._id, type: 'credit', amount: 9, reason: 'Waste disposal - Dry (3kg)', balanceAfter: 24 },
  ]);

  console.log('\n✅ Seed data inserted!');
  console.log('\n--- TEST CREDENTIALS ---');
  console.log('Admin  : admin@ecobin.com   / admin123');
  console.log('User 1 : rahul@test.com     / password123');
  console.log('User 2 : anjali@test.com    / password123');
  console.log('User 3 : vikram@test.com    / password123');

  await mongoose.disconnect();
}

seed().catch(console.error);
