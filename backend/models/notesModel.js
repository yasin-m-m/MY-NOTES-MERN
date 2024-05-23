const mongoose=require('mongoose')

const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Your Notes Should Have Title"],
        trim:true,
        maxLength:[100,"Your Title Should Not Exceed 100 Characters"]
    },
    description:{
        type:String,
        required:[true,"Your Notes Should Have Description"],
        trim:true,
        maxLength:[2000,"Your Title Should Not Exceed 2000 Characters"]
    }
})
const Note=mongoose.model('Note',noteSchema)

module.exports=Note