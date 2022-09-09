const {Router} = require('express');
const {createNote, getNote, deleteNote, getNoteByID, updateNote} = require ('../controller/notes.controller');


const router = Router();

router
    .post('/', createNote)
    .get('/', getNote)
    .delete("/:id", deleteNote)
    .get("/:id", getNoteByID)
    .put("/:id", updateNote);

module.exports = router; 
 

