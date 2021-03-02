const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const BankSchema = new Schema({
    bank:{
        type:String,  
        unique:true,      
        required:true
    },  
    school_id:{
        type:String,  
    }, 
},{timestamps: true}
)
mongoose.model('Bank',BankSchema);
