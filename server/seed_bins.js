const mongoose = require('mongoose');
require('dotenv').config();

async function seedBins() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 });
    console.log('✅ Connected to MongoDB!');

    const Bin = require('./models/Bin');

    const bins = [
      {
        binId: 'BIN-001',
        location: 'Main Street',
        zone: 'Downtown',
        wasteType: 'Recyclable',
        fillLevel: 45,
        status: 'Active',
        lastCollected: new Date('2026-05-02T08:00:00Z')
      },
      {
        binId: 'BIN-002',
        location: 'Park Road',
        zone: 'Suburbs',
        wasteType: 'Wet',
        fillLevel: 65,
        status: 'Active',
        lastCollected: new Date('2026-05-01T10:00:00Z')
      },
      {
        binId: 'BIN-003',
        location: 'Market Square',
        zone: 'Downtown',
        wasteType: 'Dry',
        fillLevel: 30,
        status: 'Active',
        lastCollected: new Date('2026-05-02T09:30:00Z')
      },
      {
        binId: 'BIN-004',
        location: 'Shopping Center',
        zone: 'Downtown',
        wasteType: 'Recyclable',
        fillLevel: 75,
        status: 'Active',
        lastCollected: new Date('2026-04-30T14:00:00Z')
      },
      {
        binId: 'BIN-005',
        location: 'Residential Area A',
        zone: 'Suburbs',
        wasteType: 'Wet',
        fillLevel: 55,
        status: 'Active',
        lastCollected: new Date('2026-05-02T07:00:00Z')
      },
      {
        binId: 'BIN-006',
        location: 'Community Park',
        zone: 'Suburbs',
        wasteType: 'Dry',
        fillLevel: 40,
        status: 'Active',
        lastCollected: new Date('2026-05-02T11:00:00Z')
      }
    ];

    let inserted = 0, skipped = 0;

    for (const bin of bins) {
      const existing = await Bin.findOne({ binId: bin.binId });
      if (existing) {
        console.log(`⚠️  Skipped (already exists): ${bin.binId}`);
        skipped++;
      } else {
        await Bin.create(bin);
        console.log(`✅ Created: ${bin.binId} | ${bin.wasteType} | Location: ${bin.location} | Fill: ${bin.fillLevel}%`);
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

seedBins();
