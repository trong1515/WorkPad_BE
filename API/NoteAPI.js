const uri = require("express").Router();
const bcrypt = require("bcrypt");
const e = require("express");
const NodeModel = require("../Model/NodeModel");
const bodyParser = require("body-parser");
const { model } = require("mongoose");
uri.use(bodyParser.json());

uri.post('/save-note', async (req, res) => {
    const { Title, Content } = req.body;
    try {
        const newNote = new NodeModel({ Title, Content });
        const saveNote = await newNote.save();
        res.status(200).json({ message: "Note saved successfully", data: saveNote });
    } catch (error) {
        res.status(400).json({ message: "Error while saving note", error: error });
        return res.status(500).json({ message: "Internal server error" });
    }
})

model.exports = uri;