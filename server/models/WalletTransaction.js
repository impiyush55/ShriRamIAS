const mongoose = require('mongoose');

const walletTransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['debit', 'credit'], required: true },
    amount: { type: Number, required: true },
    reason: { type: String, required: true },
    transactionDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WalletTransaction', walletTransactionSchema);
