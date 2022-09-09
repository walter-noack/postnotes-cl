
require('dotenv').config();

const express = require ('express');
const cors = require('cors');
const {stringConnection} = require('./database/config');

const app = express();

app.use(cors());
app.use(express.json());
stringConnection();

app.use('/api/notes', require('./routes/notes.route'));

app.listen(process.env.PORT,() =>{
    console.log('El servidor está corriendo en el puerto: ' + process.env.PORT)
});

