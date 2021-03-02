const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const FineSchema = new Schema({
    category:{
        type:String,   
    },  
    fine_date:{
        type:String,        
    },  
    amount:{
        type:String,        
    },  
},{timestamps: true}
)
mongoose.model('Fine',FineSchema);
