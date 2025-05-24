const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  message: { type: String, required: true }
});

module.exports = mongoose.model('Contact', ContactSchema);
