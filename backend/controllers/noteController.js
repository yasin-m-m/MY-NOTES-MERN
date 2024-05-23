const asyncHandler=require('express-async-handler')
const catchAsyncError=require('../middlewares/catchAsyncError')
const Note = require('../models/notesModel')
const ErrorHandler = require('../utils/errorHandler')

//Get get all notes /api/notes
const getAllNotes=catchAsyncError(asyncHandler(async(req,res,next)=>{
    try {
        const notes=await Note.find().select('-__v')
        if (!notes || notes.length===0) {
            return next(new ErrorHandler('No Notes Found',400))
        }
        res.status(200).json({success:true,notes})
    } catch (error) {
        return next(new ErrorHandler(`${error.message}`,500))
    }
}))

//Post create note /api/note
const createNote=catchAsyncError(asyncHandler(async(req,res,next)=>{
    try {
        const {title,description}=req.body
        if (!title ||!description) {
            return next(new ErrorHandler('Title And Description Are Required',400))
        }
        const createdNote=await Note.create({title,description})
        res.status(201).json({success:true,createdNote})
    } catch (error) {
        return next(new ErrorHandler(`${error.message}`,500))
    }
}))

//Get get single note /api/note/:id
const getNote=catchAsyncError(asyncHandler(async(req,res,next)=>{
    try {
        const id=req.params.id
        const note =await Note.findById(id)
        if (!note) {
            return next(new ErrorHandler('There Is No Such Note Found',400))
        }
        res.status(200).json({success:true,note})
    } catch (error) {
        return next(new ErrorHandler(`${error.message}`,500))
    }
}))

//Put  update Note /api/note/:id
const updateNote=catchAsyncError(asyncHandler(async(req,res,next)=>{
    try {
        const {title,description}=req.body
        
        if (!title || !description) {
            return next(new ErrorHandler('Title And Description Are required',400))
        }
        const id=req.params.id
        if (!id || !await Note.findById(id)) {
            return next(new ErrorHandler("There Is No Such Note Found",400))
        }
        const note=await Note.findByIdAndUpdate(id,{title,description},{new:true,runValidators:true})
        res.status(201).json({success:true,note})
    } catch (error) {
        return next(new ErrorHandler(`${error.message}`,500))
    }
}))

//Get delete note /api/note/:id
const deleteNote=catchAsyncError(asyncHandler(async(req,res,next)=>{
    try {
        const id=req.params.id
        if (!id || !await Note.findById(id)) {
            return next(new ErrorHandler("There is No such Note Found",400))
        }
        const note=await Note.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"Note deleted Successfully"})
    } catch (error) {
        return next(new ErrorHandler(`${error.message}`,500))
    }
}))

module.exports={getAllNotes,getNote,createNote,updateNote,deleteNote}

