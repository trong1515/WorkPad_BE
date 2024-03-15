const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    Title:{
        type: String,
        required: true,
    },
    Prioritize:{
        type: Number,
        required: true,
        default: 0
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