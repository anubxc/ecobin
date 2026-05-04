const mongoose = require('mongoose');
require('dotenv').config();

async function seedFeedbacks() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 });
    console.log('✅ Connected to MongoDB!');

    const Feedback = require('./models/Feedback');

    const feedbacks = [
      {
        _id: new mongoose.Types.ObjectId('69f49e639368d9dea08f4628'),
        name: 'Anubhav Gupta',
        message: 'Test',
        createdAt: new Date('2026-05-01T12:36:51.446+00:00')
      },
      {
        _id: new mongoose.Types.ObjectId('69f4f63b16744b714c258e8e'),
        name: 'Vishal',
        message: "best ever App I've ever seen",
        createdAt: new Date('2026-05-01T18:51:39.904+00:00')
      }
    ];

    let inserted = 0, skipped = 0;

    for (const fb of feedbacks) {
      const existing = await Feedback.findById(fb._id);
      if (existing) {
        console.log(`⚠️  Skipped (already exists): ${fb.name}`);
        skipped++;
      } else {
        await Feedback.create(fb);
        console.log(`✅ Created: "${fb.message}" by ${fb.name}`);
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

seedFeedbacks();
