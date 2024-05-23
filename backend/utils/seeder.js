const notes = require('../data/notes.json');
const Note = require('../models/notesModel');
require('dotenv').config()
const connectDatabase = require('../config/dbConnection')


connectDatabase();

const seedNotes = async ()=>{
    try{
        await Note.deleteMany();
        console.log('Products deleted!')
        await Note.insertMany(notes);
        console.log('All products added!');
    }catch(error){
        console.log(error.message);
    }
    process.exit();
}

seedNotes();