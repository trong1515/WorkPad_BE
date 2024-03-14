const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const AccountAPI = require("./API/AccountAPI");
const NoteAPI = require("./API/NoteAPI");
const OTPAPI = require("./API/OTPAPI");
const uri = express();
const router = express.Router();

uri.use(bodyParser.json());
uri.use("/api", router);

mongoose.connect("mongodb+srv://TanPhuoc:11112222@pusen.7tdtd7c.mongodb.net/WorkPad/");

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log("Connected to MongoDB");
});

router.use("/api", AccountAPI);
router.use("/api", NoteAPI);
router.use("/api", OTPAPI);

const PORT = process.env.PORT || 8800;

uri.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
