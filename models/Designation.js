const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const DesignationSchema = new Schema({
    name:{
        type:String,  
    },  
    description:{
        type:String,  
    }, 
},{timestamps: true}
)
mongoose.model('Designation',DesignationSchema);
