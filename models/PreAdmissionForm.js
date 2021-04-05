const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const PreAdmissionFormSchema = new Schema({
 
    session:{
        type:String,        
    }, 
    date_of_admission:{
        type:String,        
    }, 
    class_name:{
        type:String,        
    }, 
    name:{
        type:String,        
    }, 
    sex:{
        type:String,        
    }, 
    dob:{
        type:String,        
    }, 
    father_name:{
        type:String,        
    },
    mother_name:{
        type:String,     
    },
    parent_address:{
        type:String,     
    },
    parent_mobile:{
        type:String,     
    },
    tc_status:{
        type:String,
    }
    // academics:[{ type: Schema.Types.ObjectId,
    //     ref:"Academic" 
    // }],

},{timestamps: true}
)
mongoose.model('PreAdmissionForm',PreAdmissionFormSchema);
