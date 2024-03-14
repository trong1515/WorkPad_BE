const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    Account_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Account',
    },
    Otp:{
        type: Number,
        required: true, 
    },
    Timestamp:{
        type: Date,
        default: Date.now,
        required: true,
        get: (Timestamp) => Timestamp.getTime(),
        set: (Timestamp) => new Date(Timestamp),
    },
});
module.exports = mongoose.model('OTP', OTPSchema, 'OTP');