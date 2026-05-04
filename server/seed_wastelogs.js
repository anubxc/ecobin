const mongoose = require('mongoose');
require('dotenv').config();

async function seedWasteLogs() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 });
    console.log('✅ Connected to MongoDB!');

    const WasteLog = require('./models/WasteLog');

    const logs = [
      {
        _id: new mongoose.Types.ObjectId('69f5954b480c8de9373a97ee'),
        userId: new mongoose.Types.ObjectId('69f59532480c8de9373a97e8'),
        binId: 'BIN-001',
        wasteType: 'Recyclable',
        weight: 4,
        tokensEarned: 20,
        location: 'Unknown',
        createdAt: new Date('2026-05-02T06:10:19.075+00:00'),
        updatedAt: new Date('2026-05-02T06:10:19.075+00:00')
      },
      {
        _id: new mongoose.Types.ObjectId('69f63c441c664a396e6c895d'),
        userId: new mongoose.Types.ObjectId('69f6007b39aa3c32964d2fe8'),
        binId: 'BIN-003',
        wasteType: 'Recyclable',
        weight: 15,
        tokensEarned: 75,
        location: 'Unknown',
        createdAt: new Date('2026-05-02T18:02:44.391+00:00'),
        updatedAt: new Date('2026-05-02T18:02:44.391+00:00')
      },
      {
        _id: new mongoose.Types.ObjectId('69f6557c46de5b4457a12f94'),
        userId: new mongoose.Types.ObjectId('69f6555246de5b4457a12f8a'),
        binId: 'BIN-003',
        wasteType: 'Wet',
        weight: 25,
        tokensEarned: 50,
        location: 'Unknown',
        createdAt: new Date('2026-05-02T19:50:20.781+00:00'),
        updatedAt: new Date('2026-05-02T19:50:20.781+00:00')
      },
      {
        _id: new mongoose.Types.ObjectId('69f6558446de5b4457a12f9b'),
        userId: new mongoose.Types.ObjectId('69f6555246de5b4457a12f8a'),
        binId: 'BIN-001',
        wasteType: 'Recyclable',
        weight: 30,
        tokensEarned: 150,
        location: 'Unknown',
        createdAt: new Date('2026-05-02T19:50:28.344+00:00'),
        updatedAt: new Date('2026-05-02T19:50:28.344+00:00')
      }
    ];

    let inserted = 0, skipped = 0;

    for (const log of logs) {
      const existing = await WasteLog.findById(log._id);
      if (existing) {
        console.log(`⚠️  Skipped (already exists): ${log._id}`);
        skipped++;
      } else {
        await WasteLog.create(log);
        console.log(`✅ Created: ${log.wasteType} | ${log.weight}kg | ${log.tokensEarned} tokens | BIN: ${log.binId}`);
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

seedWasteLogs();
