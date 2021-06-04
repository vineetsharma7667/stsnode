const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const DefaulterMakerSchema = new Schema({
    session:{
        type:String,   
    },  
    name:{
        type:String,        
    },
    admission_no:{
        type:String,        
    },
    account_no:{
        type:String,        
    },
    class_name:{
        type:String,        
    },
    section:{
        type:String,        
    },
    annual_fees:{
        type:String,        
    },
    monthly:{
        type:String,        
    },
    fine:{
        type:String,        
    },  
    student_balance:{
        type:String,        
    },
    TotalPreviousBalance:{
        type:String,        
    },
},{timestamps: true}
)
mongoose.model('DefaulterMaker',DefaulterMakerSchema);
