const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
  binId: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  zone: { type: String, required: true },
  fillLevel: { type: Number, default: 0, min: 0, max: 100 },
  wasteType: { type: String, enum: ['Wet', 'Dry', 'Recyclable'], required: true },
  status: { type: String, enum: ['Active', 'Full', 'Maintenance'], default: 'Active' },
  lastCollected: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Bin', binSchema);
