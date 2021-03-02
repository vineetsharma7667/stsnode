const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const WaiverCategorySchema = new Schema({
    category:{
        type:String,        
        required:true
    }, 

},{timestamps: true}
)

mongoose.model('WaiverCategory',WaiverCategorySchema);
