const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const ParentSchema = new Schema({
    account_no:{
        type:String,        
        required:true
    }, 
    father_name:{
        type:String,     
        required:true   
    },
    mother_name:{
        type:String,     
        required:true   
    },
    father_occu:{
        type:String,     
    },
    father_designation:{
        type:String,     
    },
    father_annual_income:{
        type:String,      
    },
    mother_occu:{
        type:String,             
    },
    mother_designation:{
        type:String,     
    },
    mother_annual_income:{
        type:String,     
    },
    parent_address:{
        type:String,     
    },
    parent_city:{
        type:String,     
    },
    parent_state:{
        type:String,     
    },parent_country:{
        type:String,     
    },
    parent_phone:{
        type:String,     
    },
    parent_mobile:{
        type:String,     
    },

    
    gaurdian_name:{
        type:String,     
    },
    gaurdian_occu:{
        type:String,     
    },
    gaurdian_designation:{
        type:String,     
    },
    gaurdian_annual_income:{
        type:String,     
    },
    gaurdian_address:{
        type:String,     
    },
    gaurdian_city:{
        type:String,     
    },
    gaurdian_state:{
        type:String,     
    },
    gaurdian_country:{
        type:String,     
    },
    gaurdian_phone:{
        type:String,     
    },
    gaurdian_mobile:{
        type:String,     
    },
    image:{
        type:String,     
    },


},{timestamps: true}
)

mongoose.model('Parent',ParentSchema);
