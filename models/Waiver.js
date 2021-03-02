const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const WaiverCategorySchema = new Schema({
    FeeCat:{
        type:String,        
        required:true
    }, 
    FeeSubCat:{
        type:String,        
    },
    ExcemptionOrDeduction:{
        type:String,        
    },
    CategoryOrGender:{
        type:String,        
    },
    WaiverCat:{
        type:String,        
    },
    Gender:{
        type:String,        
    }

},{timestamps: true}
)

mongoose.model('Waiver',WaiverCategorySchema);
