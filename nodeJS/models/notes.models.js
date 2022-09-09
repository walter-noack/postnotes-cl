const {Schema, model} = require('mongoose');

const NoteSchema = Schema ({
    noteName: {
        type: String,
        required: true
    },

    noteBody: {
        type: String,
        required: false,
    },

   
});

module.exports = model('notes', NoteSchema);
