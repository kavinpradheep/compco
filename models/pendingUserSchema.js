const mongoose = require("mongoose");

const pendingSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  otp: String,
  createdAt: { type: Date, default: Date.now, expires: 300 }, // 5 min expiry
});

module.exports = mongoose.model("PendingUser", pendingSchema);
