const express = require("express");
const router = express.Router();
const uri = express();
const bcrypt = require("bcrypt");
const NoteModel = require("../Model/NoteModel");
const bodyParser = require("body-parser");

uri.use(bodyParser.json());
uri.use("/api", router);

router.post('/save-note', async (req, res) => {
    const Tilte = req.body.Title;
    const Content = req.body.Content;
    try {
        const newNote = new NoteModel({ Title, Content }); // Corrected typo here
        const saveNote = await newNote.save();
        res.status(200).json({ message: "Success", data: saveNote });
    } catch (error) {
        res.status(400).json({ message: "Error", error: error });
        return res.status(500).json({ message: "Server Error" });
    }
})
router.post('/update-content', async (req, res) => {
    const id = req.body.id;
    const newContent = req.body.newContent;
    try {
        const existingNote = await NoteModel.findById(id);
        if (!existingNote) {
            return res.status(400).json({ message: "Error" });
        }
        existingNote.Content = newContent;
        const updateContent = await existingNote.save();
        res.status(200).json({ message: "Success", data: updateContent });
    } catch (error) {
        res.status(400).json({ message: "Error", error: error });
        return res.status(500).json({ message: "Server Error" });
    }
})
router.post('/get-note', async (req, res) => {
    const id = req.body.id;
    try {
        const note = await NoteModel.findOne({ _id: id });
        if (!note) {
            return res.status(400).json({ message: "Error" });
        }
        res.status(200).json({ message: "Success", data: note });
    } catch(error) {
        res.status(400).json({ message: "Error", error: error });
        return res.status(500).json({ message: "Server Error" });
    }
})
router.post('/delete-note', async (req, res) => {
    const id = req.body.id;
    try {
        const existingNote = await NoteModel.findById(id);
        if (!existingNote) {
            return res.status(400).json({ message: "Error" });
        }
        const deleteNote = await Note
        Model.deleteOne({ _id: id });
        res.status(200).json({ message: "Success", data: deleteNote });
    } catch (error) {
        res.status(400).json({ message: "Error", error: error });
        return res.status(500).json({ message: "Server Error" });
    }
});

module.exports = uri;
