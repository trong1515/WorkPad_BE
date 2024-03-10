const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const AccountAPI = require("./API/AccountAPI");
const NoteAPI = require("./API/NoteAPI");
const uri = express();

uri.use(bodyParser.json());

mongoose.connect("mongodb+srv://TanPhuoc:11112222@pusen.7tdtd7c.mongodb.net/WorkPad/", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log("Connected to MongoDB");
});

uri.use("/api", AccountAPI);
uri.use("/api", NoteAPI);

const PORT = process.env.PORT || 9000;

uri.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
