const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const PayScaleSchema = new Schema({
    PayScaleName:{
        type:String,  
    },  
    PayScale:{
        type:String,  
    }, 
},{timestamps: true}
)
mongoose.model('PayScale',PayScaleSchema);
