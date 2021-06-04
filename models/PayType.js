const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const PayTypeSchema = new Schema({
    name:{
        type:String,  
    },  
    category:{
        type:String,  
    }, 
    description:{
        type:String,  
    }, 
    
},{timestamps: true}
)
mongoose.model('PayType',PayTypeSchema);
