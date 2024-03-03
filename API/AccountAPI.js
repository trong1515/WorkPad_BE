const uri = require("express").Router();
const bcrypt = require("bcrypt");
const e = require("express");
const AccountModel = require("../Model/AccountModel");
const bodyParser = require("body-parser");
uri.use(bodyParser.json());

const HashPassword = async (Password) => {
    const hash = await bcrypt.hash(Password, 10);
    return hash;
}
const ComparePassword = async (Password, hash) => {
    const isMath = await bcrypt.compare(Password, hash); 
    return isMath;
}

uri.post("/update-pass", async (req, res) => {
    const { Email, oldPassword, newPassword, confirmPassword } = req.body;
    try {
        const existingAccount = await AccountModel.findOne({ Email: Email });

        if (!existingAccount){
            return res.status(400).json({ message: "Account not found" });
        }
        const isPasswordMatch = await ComparePassword(oldPassword, existingAccount.Password);
        if (!isPasswordMatch){
            return res.status(400).json({ message: "Invalid password" });
        }
        if (newPassword !== confirmPassword){
            return res.status(400).json({ message: "Password not match" });
        }
        const HashPassword = await HashPassword(newPassword);
        
        const result = await AccountModel.updateOne({Email: Email}, {$set: {Password: HashPassword}});
        if (result.matchedCount > 0){
            return res.status(200).json({ message: "Password updated" });
        } else {
            return res.status(400).json({ message: "Password not updated" });
        }
    } catch (error) {
        console.error("Can't update password", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

uri.post("/update-name", async (req, res) => {
    const { Email, Name } = req.body;
    try {
        const existingAccount = await AccountModel.findOne({ Email: Email });
        if (!existingAccount){
            return res.status(400).json({ message: "Account not found" });
        }
        const result = await AccountModel.updateOne({Email: Email}, {$set: {Name: Name}});
        if (result.matchedCount > 0){
            return res.status(200).json({ message: "Name updated" });
        } else {
            return res.status(400).json({ message: "Name not updated" });
        }
    } catch (error) {
        console.error("Can't update name", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});