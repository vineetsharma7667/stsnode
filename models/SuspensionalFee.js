const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const SuspensionalFeeSchema = new Schema({
    admission_no:{
        type:String,        
    }, 
    account_no:{
        type:String,        
    }, 
    class_name:{
        type:String,        
    }, 
    remark:{
        type:String,        
    }, 
    receipt_date:{
        type:String,        
    }, 
    bank:{
        type:String,        
    }, 
    amount:{
        type:String,        
    }, 
},{timestamps: true}
)
mongoose.model('SuspensionalFee',SuspensionalFeeSchema);
