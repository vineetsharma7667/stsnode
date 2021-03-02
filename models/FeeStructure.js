const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const FeeStructureSchema = new Schema({
    unique_id:{
        unique:true,
        type:String,    
        required:true     
    }, 
    session:{
        type:String,        
        required:true
    }, 
    school_id:{
        type:String,        
    }, 
    class_name:{
        type:String,        
    },
    section:{
        type:String,        
    },
    fees:{
        type:String,        
    },
    total_one_time_fee:{
        type:String,        
    },
    total_annual_fee:{
        type:String,        
    },
    total_monthly_fee:{
        type:String,        
    },
    grand_total:{
        type:String,        
    },
},{timestamps: true}
)

mongoose.model('FeeStructure',FeeStructureSchema);
