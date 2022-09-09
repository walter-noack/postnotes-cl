const Notes = require('../models/notes.models')

const getNote = (_req, res) => {
    Notes.find({}, "_id noteName noteBody")
        .then((notes) => {
            res.status(201).json({
                ok: true,
                notes,
            });
        })
        .catch(() => {
            res.status(500).json({
                ok: false,
                msg: "Falló la obtención de las notas",
            });
        });
};


const createNote = (req, res) => {
    const notes = new Notes(req.body);
    notes.save().then(() => {
        res.json({
            ok: true,
            notes
        });
    }).catch(() => {
        res.json({
            ok: false,
            msg: 'Falló la creación de la nota'
        });
    })
}

const deleteNote = (req, res) => {
    Notes.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: 'Nota eliminada',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

const getNoteByID = (req, res) => {
    Notes.findById({ _id: req.params.id })
        .then(notes => {
            res.status(200).json({
                message: 'Nota encontrada',
                notes: notes
            })
        })
        .catch(() => {
            res.json({
                ok: false,
                msg: "Falló búsqueda de ID",
            });
        });
};

const updateNote = (req, res) => {
    console.log(req.body);
    let notes = req.body;
    Notes.findByIdAndUpdate({_id:req.body._id}, notes,{ new: true})
    .then(result=>{
      res.status(200).json({
          message:'nota actualizada',
          notes:result,
      })
  })
  .catch(err=>{
      res.status(500).json({
          error:err
      })
  })
  }


module.exports = {
    getNote,
    createNote,
    deleteNote,
    getNoteByID,
    updateNote

}