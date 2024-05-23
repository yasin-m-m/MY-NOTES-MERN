const express=require('express')
const { getAllNotes, createNote, getNote, updateNote, deleteNote } = require('../controllers/noteController')
const router=express.Router()

router.route('/notes').get(getAllNotes)
router.route('/note').post(createNote)
router.route('/note/:id').get(getNote)
                          .put(updateNote)
                          .delete(deleteNote)


module.exports=router
