const mongoose = require('mongoose');

const wasteLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  binId: { type: String, required: true },
  wasteType: { type: String, enum: ['Wet', 'Dry', 'Recyclable'], required: true },
  weight: { type: Number, required: true }, // in kg
  tokensEarned: { type: Number, required: true },
  location: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('WasteLog', wasteLogSchema);
