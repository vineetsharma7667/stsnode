const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const feesubcategorySchema = new Schema({
    fee_category:{
        type:String,        
        required:true
    }, 
    fee_sub_category:{
        type:String,    
        unique:true,    
        required:true
    }, 
    amount:{
        type:String,        
    },
    month:{
        type:String,        
    },
    status:{
        type:String,        
    }

},{timestamps: true}
)

mongoose.model('FeeSubCategory',feesubcategorySchema);
