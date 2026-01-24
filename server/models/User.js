const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'admin', 'faculty'], default: 'student' },
    walletBalance: { type: Number, default: 50 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
