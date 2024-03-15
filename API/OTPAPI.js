const express = require("express");
const router = express.Router();
const OTPModel = require("../Model/OTPModel");
const AccountModel = require("../Model/AccountModel");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

router.use(bodyParser.json());

router.post('/send-otp', async (req, res) => {
    const generateOTP = Math.floor(100000 + Math.random() * 900000);
    const Email = req.body.Email;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'txtrong109@gmail.com',
            pass: 'wfgd hbds zysx bpzp'
        }
    });
    const msg = '<p> Hii <b>'+Email+'</b>, </br> <h4>'+ 123111 +'</h4></p>';
    const mailOptions = {
        from: 'txtrong109@gmail.com',
        to: Email,
        html: msg
    };
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    
    // const errors = validationResult(req);
    
    // if (!errors.isEmpty()){
    //     return res.status(400).json({
    //         success: false,
    //         message: "Errors",
    //         errors: errors.array()
    //     });
    // }

    // const existingAccount = await AccountModel.findOne({ Email: Email});

    // if (!existingAccount){
    //     return res.status(404).json({
    //         success: false,
    //         message: "Account not found"
    //     });
    // }
    // if (existingAccount.is_verified == 1){
    //     return res.status(400).json({
    //         success: false,
    //         message: existingAccount.Email+"mail is already verified"
    //     });
    // }
    
    // const enterOTP = new OTPModel({
    //     Account_id: existingAccount._id,
    //     Otp: getotp
    // }).save();

    // await transporter.sendMail({
    //     from: 'txtrong109@gmail.com',
    //     to: Email,
    //     subject: 'OTP for Email Verification',
    //     html: msg
    // });
    // return res.json({
    //     success: true,
    //     message: "OTP sent to "+ Email +" please verify your email"
    // });
    })
});

module.exports = router;