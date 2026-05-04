const mongoose = require('mongoose');
require('dotenv').config();

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 });
    console.log('✅ Connected to MongoDB!');

    const User = require('./models/User');

    const users = [
      {
        _id: new mongoose.Types.ObjectId('69f49f099368d9dea08f462e'),
        name: 'Anubhav Gupta',
        email: 'anubhavbbdit@gmail.com',
        password: '$2a$10$Y.JSlkW0lk1yKGQnIc5.n.U.ZgvVEXdZ8FwdNYOuw/Dw/rGL11Ut.',
        authProvider: 'local',
        role: 'resident',
        tokenBalance: 0,
        totalWasteLogged: 0
      },
      {
        _id: new mongoose.Types.ObjectId('69f4a687d4dc990ceb82883d'),
        name: 'Sarthak kumar',
        email: 'sarthakkumar201206@gmail.com',
        password: '$2a$10$5Xo4jZ1KvCYPCa9aI3x4zuPDOgBvP2zhT1ejbjuN5/eVzbI0ojXoG',
        authProvider: 'local',
        role: 'resident',
        tokenBalance: 0,
        totalWasteLogged: 0
      },
      {
        _id: new mongoose.Types.ObjectId('69f59532480c8de9373a97e8'),
        name: 'Richa Sharma',
        email: 'relatingxrelatables@gmail.com',
        password: '$2a$10$GD9XbypEupllyHCUsoFwV.wygyjPgilfTBs6kp1ajZzuU5.HhFXGG',
        authProvider: 'local',
        role: 'resident',
        tokenBalance: 0,
        totalWasteLogged: 0
      },
      {
        _id: new mongoose.Types.ObjectId('69f6007b39aa3c32964d2fe8'),
        name: 'Lucky Kumar',
        email: 'luckykumar21766@gmail.com',
        password: '$2a$10$PbGY.4hWAir1gTUY5s1zHuNCDb9M3eL8dUux782Fw2LOjJ9J7/h7C',
        authProvider: 'local',
        role: 'resident',
        tokenBalance: 0,
        totalWasteLogged: 0
      },
      {
        _id: new mongoose.Types.ObjectId('69f6555246de5b4457a12f8a'),
        name: 'Hariom',
        email: 'hari@gmail.com',
        password: '$2a$10$8yV0Yz83kv5QtfzOHu2SUeqP6SaZDM4CH7OPKd3uW8sU7XjftiBy.',
        authProvider: 'local',
        role: 'resident',
        tokenBalance: 0,
        totalWasteLogged: 0
      }
    ];

    let inserted = 0, skipped = 0;

    for (const userData of users) {
      const existing = await User.findOne({ email: userData.email });
      if (existing) {
        console.log(`⚠️  Skipped (already exists): ${userData.email}`);
        skipped++;
      } else {
        await User.create(userData);
        console.log(`✅ Created: ${userData.name} (${userData.email})`);
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

seedUsers();
