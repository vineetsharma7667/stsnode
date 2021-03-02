const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const CategorySchema = new Schema({
    category:{
        type:String,    
        unique:true,    
        required:true
    }, 
    description:{
        type:String,        
    }, 
},{timestamps: true}
)
mongoose.model('Category',CategorySchema);
