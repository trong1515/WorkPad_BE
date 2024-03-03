const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    Title:{
        type: String,
        required: true,
    },
    Prioritize:{
        type: Interger,
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
});