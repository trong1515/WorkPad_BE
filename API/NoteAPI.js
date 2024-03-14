const express = require("express");
const router = express.Router();
const uri = express();
const NoteModel = require("../Model/NoteModel");
const bodyParser = require("body-parser");

uri.use(bodyParser.json());
uri.use("/api", router);

router.post('/api/save-note', async (req, res) => {
    const Tilte = req.body.Title;
    const Content = req.body.Content;
    const newNote = new NoteModel({ Tilte, Content });
    const saveNote = await newNote.save();
    if (saveNote){
        res.json({Status: "Success"})
    } else {
        res.json({Status: "Error"})
    }
})
router.post('/api/update-content', async (req, res) => {
    const Note_id = req.body.Note_id;
    const newContent = req.body.newContent;
    const existingNote = await NoteModel.findById(Note_id);
    if (existingNote){
        existingNote.Content = newContent;
        const updateContent = await existingNote.save();
        res.json({Status: "Success", data: updateContent})
    } else {
        res.json({Status: "Error"})
    }
})
router.post('/api/get-note', async (req, res) => {
    const Note_id = req.body.Note_id;
    const note = await NoteModel.findOne({ _id: Note_id});
    if (note){
        res.json({Status: "Success", data: note})
    } else {
        res.json({Status: "Error"})
    }
})
router.post('/api/delete-note', async (req, res) => {
    const Note_id = req.body.Note_id;
    const existingNote = await NoteModel.findById(Note_id);
    if (existingNote){
        const deleteNote = await NoteModel.delete;
        NoteModel.deleteOne({ _id: Note_id });
        res.json({Status: "Success", data: deleteNote})
    } else {
        res.json({Status: "Error"})
    }
});

module.exports = uri.use("/api", router);
