const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const EmployeeSchema = new Schema({
    name:{
        type:String,  
    },  
    dob:{
        type:String,  
    }, 
    doa:{
        type:String,  
    }, 
    sex:{
        type:String,  
    }, 
    designation:{
        type:String,  
    }, 
    pay_level:{ type:Schema.Types.ObjectId,
        ref:"PayType"
    },
},{timestamps: true}
)
mongoose.model('Employee',EmployeeSchema);
