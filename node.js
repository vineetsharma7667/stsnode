const express=require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 4800;
const {mongoUrl} =require('./keys');
require('./models/user');
require('./models/FeeCategory');
require('./models/FeeSubCategory');
require('./models/WaiverCategory');
require('./models/Waiver');
require('./models/Session');
require('./models/Class');
require('./models/Section');
require('./models/Category');
require('./models/Vehicle');
require('./models/VehicleType');
require('./models/Subject');
require('./models/House');
require('./models/Parent');
require('./models/Student');
require('./models/Academic');
require('./models/FeeStructure');
require('./models/Receipt');
require('./models/Fine');
require('./models/Bank');

const requireToken= require('./middleware/requireToken');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
const cors = require('cors');
app.use(cors({ origin: true }));
app.use('/public', express.static('public'));
const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);
mongoose.connect(mongoUrl,{
    auth: {
        "user":"admin2",
        "password":"T3st$3m0",  
      },
     useNewUrlParser:true,
     useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo db');
})
mongoose.connection.on('error',(err)=>{
    console.log('this is error',err);
})
.catch(error => { console.log(error)})
app.listen(PORT,()=>{
    console.log("server running"+PORT)
})