const express = require("express");
const router = express.Router();
const uri = express();
const bcrypt = require("bcrypt");
const AccountModel = require("../Model/AccountModel");
const bodyParser = require("body-parser");
uri.use(bodyParser.json());

uri.use("/api", router);

const HashPassword = async (Password) => bcrypt.hash(Password, 10);

const ComparePassword = async (Password, hash) => await bcrypt.compare(Password, hash);

router.post("/api/update-pass", async (req, res) => {
    const Email = req.body.Email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    try {
        const isPasswordMatch = await ComparePassword(oldPassword);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect old password" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New passwords do not match" });
        }

        const hashedPassword = await HashPassword(newPassword);

        const result = await AccountModel.updateOne({ Email: Email }, { $set: { Password: hashedPassword } });

        if (result.nModified > 0) {
            return res.status(200).json({ message: "Password updated successfully" });
        } else {
            return res.status(400).json({ message: "Error updating password" });
        }
    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/api/update-name", async (req, res) => {
    const Email = req.body.Email;
    const Name = req.body.Name;
    try {
        const existingAccount = await AccountModel.findOne({ Email: Email });

        if (!existingAccount) {
            return res.status(400).json({ message: "Account not found" });
        }

        const result = await AccountModel.updateOne({ Email: Email }, { $set: { Name: Name } });

        if (result.nModified > 0) {
            return res.status(200).json({ message: "Name updated successfully" });
        } else {
            return res.status(400).json({ message: "Error updating name" });
        }
    } catch (error) {
        console.error("Error updating name:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = uri;
