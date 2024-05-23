const mongoose=require('mongoose')

const dbConnection=async()=>{
   try {
    await mongoose.connect(process.env.LOCAL_DB_URI)
   } catch (error) {
    console.log(error.message);
   }
    
}

module.exports=dbConnection