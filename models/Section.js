const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const SectionSchema = new Schema({
    school_id:{
        type:String,        
    },
    class_name:{
        type:String,        
        required:true
    }, 
    section:{
        type:String,        
        required:true
    },
    description:{
        type:String,        
    }, 


},{timestamps: true}
)

mongoose.model('Section',SectionSchema);
