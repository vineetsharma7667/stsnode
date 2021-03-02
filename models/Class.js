const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const ClassSchema = new Schema({
    school_id:{
        type:String,    
    },  
    class_name:{
        type:String,    
        required:true,
    }, 
    actual_class:{
        type:String,        
    }, 
    description:{
        type:String,        
    }, 
},{timestamps: true}
)

mongoose.model('Class',ClassSchema);
