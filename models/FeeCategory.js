const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const categorySchema = new Schema({
    category:{
        type:String,  
        unique:true,      
        required:true
    }, 
    receipt_no:{
        type:String,        
    },
    description:{
        type:String,        
    }

},{timestamps: true}
)

mongoose.model('FeeCategory',categorySchema);
