const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    Note_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Note',
    },
    Title:{
        type: String,
        required: true,
    },
    Prioritize:{
        type: Number,
        required: true,
    },
    DateCreate:{
        type: String, 
        required: true,
    },
    EmailCreate:{
        type: String,
        required: true,
    },
    Content:{
        type: String,
        required: true,
    },
})
module.exports = mongoose.model('Note', NoteSchema, 'Note')