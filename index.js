const express = require("express");
const mongoose = require("mongoose");
const AccountAPI = require("./API/AccountAPI");
const NoteAPI = require("./API/NoteAPI");
const OTPAPI = require("./API/OTPAPI");
const app = express();

mongoose.connect("mongodb+srv://TanPhuoc:11112222@pusen.7tdtd7c.mongodb.net/WorkPad?retryWrites=true&w=majority&appName=PUsen");

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log("Connected to MongoDB");
});

app.use("/api", AccountAPI);
app.use("/api", NoteAPI);
app.use("/api", OTPAPI);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
