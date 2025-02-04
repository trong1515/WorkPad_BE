const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const AccountModel = require("../Model/AccountModel");

const HashPassword = async (Password) => bcrypt.hash(Password, 10);

const ComparePassword = async (Password, hash) => await bcrypt.compare(Password, hash);

router.post("/change-pass", async (req, res) => {
    const Email = req.body.Email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const existingAccount = await AccountModel.findOne({ Email: Email });
    const isPasswordMatch = await ComparePassword(oldPassword, existingAccount.Password);
    if (isPasswordMatch){
        const hashedPassword = await HashPassword(newPassword);
        await AccountModel.updateOne({ Email: Email }, { $set: { Password: hashedPassword } });
        res.json({Status: "Success"})
    } else {
        res.json({Status: "Error"})
    }
});

router.post("/update-name", async (req, res) => {
    const Email = req.body.Email;
    const Name = req.body.Name;
    const existingAccount = await AccountModel.findOne({ Email: Email });
    if (existingAccount){
        await AccountModel.updateOne({ Email: Email }, { $set: { Name: Name } });
        res.json({Status: "Success"})
    }
    else {
        res.json({Status: "Error"})
    }
});

module.exports = router;
