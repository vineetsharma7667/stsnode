const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const VehicleSchema = new Schema({
    vehicle_type:{
        type:String,        
        required:true
    }, 
    vehicle_no:{
        type:String,        
        required:true
    }, 
    root:{
        type:String,        
        required:true
    }, 
    root_description:{
        type:String,        
    }, 
    driver_name:{
        type:String,        
        required:true
    }, 
    contact_no:{
        type:String,        
        required:true
    }, 
    owner_address:{
        type:String,        
        required:true
    }, 
},{timestamps: true}
)
mongoose.model('Vehicle',VehicleSchema);
