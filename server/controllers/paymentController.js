const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const WalletTransaction = require('../models/WalletTransaction');

exports.payWithWallet = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { courseId } = req.body;
        const studentId = req.user.id; // From JWT middleware

        // 1. Validate Course
        const course = await Course.findById(courseId).session(session);
        if (!course) {
            throw new Error('Course not found');
        }

        // 2. Check existing enrollment
        const existingEnrollment = await Enrollment.findOne({ studentId, courseId }).session(session);
        if (existingEnrollment) {
            return res.status(400).json({ success: false, message: 'Already enrolled in this course' });
        }

        // 3. Check Wallet Balance
        const student = await User.findById(studentId).session(session);
        if (student.walletBalance < course.price) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient wallet balance',
                redirectTo: '/wallet/recharge'
            });
        }

        // 4. Atomic Operations:
        // a) Deduct Balance
        student.walletBalance -= course.price;
        await student.save({ session });

        // b) Create Enrollment
        const enrollment = new Enrollment({
            studentId,
            courseId,
            amount: course.price,
            paymentMethod: 'wallet',
            status: 'active'
        });
        await enrollment.save({ session });

        // c) Log Wallet Transaction
        const transaction = new WalletTransaction({
            userId: studentId,
            type: 'debit',
            amount: course.price,
            reason: `Purchased Course: ${course.title}`
        });
        await transaction.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: 'Course purchased successfully!',
            enrollment
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAdminStats = async (req, res) => {
    try {
        const totalEnrollments = await Enrollment.countDocuments({ status: 'active' });

        const revenueData = await Enrollment.aggregate([
            { $match: { status: 'active' } },
            { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
        ]);

        const walletRevenue = await Enrollment.aggregate([
            { $match: { status: 'active', paymentMethod: 'wallet' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const recentEnrollments = await Enrollment.find()
            .populate('studentId', 'name email')
            .populate('courseId', 'title')
            .sort({ enrolledAt: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            stats: {
                totalSales: revenueData[0]?.totalRevenue || 0,
                totalEnrollments,
                walletRevenue: walletRevenue[0]?.total || 0
            },
            recentEnrollments
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
