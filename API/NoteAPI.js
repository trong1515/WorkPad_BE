const express = require("express");
const router = express.Router();
const NoteModel = require("../Model/NoteModel");

router.post('/save-note', async (req, res) => {
    const DateTime = new Date();
    const day = DateTime.getDate();
    const month = DateTime.getMonth() + 1;
    const year = DateTime.getFullYear();
    const Tilte = req.body.Title;
    const Content = req.body.Content;
    const Email = req.body.Email;
    const newNote = new NoteModel({ Title: Tilte, Content: Content, EmailCreate: Email, DateCreate: (day + "/" + month + "/" + year) });
    const saveNote = await newNote.save();
    if (saveNote){
        res.json({Status: "Success"})
    } else {
        res.json({Status: "Error"})
    }
})
router.post('/update-content', async (req, res) => {
    const Note_id = req.body.Note_id;
    const newContent = req.body.newContent;
    const existingNote = await NoteModel.findByIdAndUpdate(Note_id, { $set: { Content: newContent }});
    if (existingNote){
        res.json({ Status: "Success"});
    } else {
        res.json({ Status: "Error" });
    }
})
router.post('/get-note', async (req, res) => {
    const Note_id = req.body.Note_id;
    const note = await NoteModel.findById(Note_id);
    if (note){
        res.json({Status: "Success", data: note})
    } else {
        res.json({Status: "Error"})
    }
})
router.post('/delete-note', async (req, res) => {
    const Note_id = req.body.Note_id;
    const existingNote = await NoteModel.findById(Note_id);
    if (existingNote){
        const deleteNote = await NoteModel.deleteOne({ _id: Note_id });
        res.json({Status: "Success", data: deleteNote})
    } else {
        res.json({Status: "Error"})
    }
});

module.exports = router;
