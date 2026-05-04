const mongoose = require('mongoose');
require('dotenv').config();

async function seedTokens() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 });
    console.log('✅ Connected to MongoDB!');

    const Token = require('./models/Token');

    const tokens = [
      {
        _id: new mongoose.Types.ObjectId('69f5954b480c8de9373a97f2'),
        userId: new mongoose.Types.ObjectId('69f59532480c8de9373a97e8'),
        type: 'credit',
        amount: 20,
        reason: 'Waste disposal - Recyclable (4kg)',
        balanceAfter: 20,
        createdAt: new Date('2026-05-02T06:10:19.773+00:00'),
        updatedAt: new Date('2026-05-02T06:10:19.773+00:00')
      },
      {
        _id: new mongoose.Types.ObjectId('69f63c451c664a396e6c8961'),
        userId: new mongoose.Types.ObjectId('69f6007b39aa3c32964d2fe8'),
        type: 'credit',
        amount: 75,
        reason: 'Waste disposal - Recyclable (15kg)',
        balanceAfter: 75,
        createdAt: new Date('2026-05-02T18:02:45.129+00:00'),
        updatedAt: new Date('2026-05-02T18:02:45.129+00:00')
      },
      {
        _id: new mongoose.Types.ObjectId('69f6557d46de5b4457a12f98'),
        userId: new mongoose.Types.ObjectId('69f6555246de5b4457a12f8a'),
        type: 'credit',
        amount: 50,
        reason: 'Waste disposal - Wet (25kg)',
        balanceAfter: 50,
        createdAt: new Date('2026-05-02T19:50:21.481+00:00'),
        updatedAt: new Date('2026-05-02T19:50:21.481+00:00')
      },
      {
        _id: new mongoose.Types.ObjectId('69f6558546de5b4457a12f9f'),
        userId: new mongoose.Types.ObjectId('69f6555246de5b4457a12f8a'),
        type: 'credit',
        amount: 150,
        reason: 'Waste disposal - Recyclable (30kg)',
        balanceAfter: 200,
        createdAt: new Date('2026-05-02T19:50:29.044+00:00'),
        updatedAt: new Date('2026-05-02T19:50:29.044+00:00')
      }
    ];

    let inserted = 0, skipped = 0;

    for (const token of tokens) {
      const existing = await Token.findById(token._id);
      if (existing) {
        console.log(`⚠️  Skipped (already exists): ${token._id}`);
        skipped++;
      } else {
        await Token.create(token);
        console.log(`✅ Created: ${token.type.toUpperCase()} | ${token.amount} tokens | Balance: ${token.balanceAfter}`);
        inserted++;
      }
    }

    console.log(`\n📊 Done! Inserted: ${inserted}, Skipped: ${skipped}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

seedTokens();
