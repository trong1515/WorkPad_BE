const express = require("express");
const router = express.Router();
const uri = express();
const OTPModel = require("../Model/OTPModel");
const AccountModel = require("../Model/AccountModel");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

uri.use(bodyParser.json());
uri.use("/api", router);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'txtrong109@gmail.com',
        pass: 'trong1515'
    }
});

const generateOTP = Math.floor(100000 + Math.random() * 900000);

router.post('/api/send-otp', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            message: "Errors",
            errors: errors.array()
        });
    }

    const Email = req.body.Email;
    const existingAccount = await AccountModel.findOne({ Email: Email});

    if (!existingAccount){
        return res.status(404).json({
            success: false,
            message: "Account not found"
        });
    }
    if (existingAccount.is_verified == 1){
        return res.status(400).json({
            success: false,
            message: existingAccount.Email+"mail is already verified"
        });
    }
    
    const enterOTP = new OTPModel({
        Account_id: existingAccount._id,
        Otp: getotp
    }).save();

    const msg = '<p> Hii <b>'+existingAccount.Name+'</b>, </br> <h4>'+generateOTP+'</h4></p>';
    await transporter.sendMail({
        from: 'txtrong109@gmail.com',
        to: existingAccount.Email,
        subject: 'OTP for Email Verification',
        html: msg
    });
    return res.status(200).json({
        success: true,
        message: "OTP sent to "+existingAccount.Email+" please verify your email"
    });
});

module.exports = uri.use("/api", router);