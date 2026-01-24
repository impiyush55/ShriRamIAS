const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, default: 'wallet' },
    status: { type: String, enum: ['active', 'inactive', 'refunded'], default: 'active' },
    enrolledAt: { type: Date, default: Date.now }
});

// Ensure a student can't enroll in the same course twice
enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
