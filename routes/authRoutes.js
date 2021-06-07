const express = require('express')
const { Router } = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const { jwtkey } = require('../keys');
const { json } = require('body-parser');
const router = express.Router()

const User = mongoose.model('user')
const FeeCategory = mongoose.model('FeeCategory')
const FeeSubCategory = mongoose.model('FeeSubCategory')
const WaiverCategory = mongoose.model('WaiverCategory')
const Waiver = mongoose.model('Waiver')
const Session = mongoose.model('Session')
const Class = mongoose.model('Class')
const Section = mongoose.model('Section')
const Category = mongoose.model('Category')
const Vehicle = mongoose.model('Vehicle')
const VehicleType = mongoose.model('VehicleType')
const Subject = mongoose.model('Subject')
const House = mongoose.model('House')
const Parent = mongoose.model('Parent')
const Student = mongoose.model('Student')
const Academic = mongoose.model('Academic')
const Fine = mongoose.model('Fine')
const FeeStructure = mongoose.model('FeeStructure')
const Receipt = mongoose.model('Receipt')
const Bank = mongoose.model('Bank')
const SuspensionalFee = mongoose.model('SuspensionalFee')
const TransferCertificate = mongoose.model('TransferCertificate')
const DefaulterMaker = mongoose.model('DefaulterMaker')

const PreAdmissionForm = mongoose.model('PreAdmissionForm')

// Employeee Routes
const Employee = mongoose.model('Employee')
const PayType = mongoose.model('PayType')
const PayCategory = mongoose.model('PayCategory')
const Designation = mongoose.model('Designation')
const PayScaleType = mongoose.model('PayScaleType')
const PayScaleTABLE = mongoose.model('PayScale')




const cors = require('cors');
multer = require('multer')
multer({
    limits: { fieldSize: 2 * 1024 * 1024 }
  })
router.use(cors({ origin: true }));
//code for images
var multer = require('multer');
const e = require('express');

var storage = multer.diskStorage({


    destination: function(req, file, callback) {
        callback(null, './public/uploads');
      },
      filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname)
      }
    });
    
    const upload = multer({ storage: storage });

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname)
//     }
// })
// var upload = multer({ storage: storage })
//end code for images


// signin Routes
router.post('/signin', async (req, res) => {
    console.log("yes im vineet")
    const { username, password,} = req.body
    console.log(req.body)
    console.log(username, password)
    if (!username || !password) {
        return res.status(422).send({ error: "must provide email or password2" })
    }
    const user = await User.findOne({ username ,password})
    console.log(user)
    if (!user) {
        return res.status(422).send({ error: "must provide email or password3" })
    }
    try {
        // await user.comparePassword(password);
        const token = jwt.sign({ userId: user.id }, jwtkey)
        console.log(user.id)
        res.send({ token: token, userid: user.id, user})
    }
    catch (err) {
        return res.status(422).send({ error: "must provide email or password4" })
    }
})
// End Signin routes


// Start Transfer certificate routes

router.post('/StoreTcDetails', upload.single('image'), async (req, res) => {
console.log("yes i am in")
const { date_of_tc,date_of_aplication,name,account_no,parents,class_name,section,category,nationality,date_of_admission,dob,house,address,security_deposit,return_mode,bank,tc_no,cheque_no,reason,working_days,present_days,admission_no,is_promoted,promoted_in,result,last_school,result_remark,concession,concession_remark,games_remark,other_remark,conduct,session,tc_status,student_id,academic_id,left_on} = req.body;

Student.findByIdAndUpdate({_id:student_id},{tc_status}, function(err, resultt){
    if(err){
        console.log("yes error here"+err)
        res.send(err)
    }
    else{
        Academic.findByIdAndUpdate({_id:academic_id},{tc_status}, function(errr, resulttt){
            if(errr){
                res.send(errr)
            }
            else{
                const Tcdata = new TransferCertificate({student:student_id,academic_id:academic_id,date_of_tc,date_of_aplication,name,account_no,parents,class_name,section,category,nationality,date_of_admission,dob,house,address,security_deposit,return_mode,bank,tc_no,cheque_no,reason,working_days,present_days,admission_no,is_promoted,promoted_in,result,last_school,result_remark,concession,concession_remark,games_remark,other_remark,conduct,session,tc_status,left_on })
                 Tcdata.save();
                if (Tcdata) {
                    res.send(Tcdata)
                }
                else {
                    console.log("data is not stored")
                }
            }
        })
    }
})

})
router.post('/getTransferCertificate', async (req, res) => {
    const {admission_no} = req.body
    console.log(req.body)
    try {
            await TransferCertificate.find({admission_no}).populate('student').sort({ _id: -1 }).exec((err,data)=>{
            console.log("gfgfdgfdgfdgsadsadadsa",data)
            res.send(data[0])
        })
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
router.post('/getAllTransferCertificate', async (req, res) => {
    const {admission_no} = req.body
    console.log(req.body)
    try {
            await TransferCertificate.find({}).populate('student').sort({ _id: -1 }).exec((err,data)=>{
            console.log("gfgfdgfdgfdgsadsadadsa",data)
            res.send(data)
        })
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})

router.put('/UpdateTcData', upload.single('image') ,async (req, res) => {
    console.log("Yes I Am In")
    const { _id,date_of_tc,date_of_aplication,name,account_no,parents,class_name,section,category,nationality,date_of_admission,dob,house,address,security_deposit,return_mode,bank,tc_no,cheque_no,reason,working_days,present_days,admission_no,is_promoted,promoted_in,result,last_school,result_remark,concession,concession_remark,games_remark,other_remark,conduct,session,tc_status,student_id,academic_id,left_on} = req.body;
    // const image = req.file.path
    TransferCertificate.findByIdAndUpdate({_id},{date_of_tc,date_of_aplication,name,account_no,parents,class_name,section,category,nationality,date_of_admission,dob,house,address,security_deposit,return_mode,bank,tc_no,cheque_no,reason,working_days,present_days,admission_no,is_promoted,promoted_in,result,last_school,result_remark,concession,concession_remark,games_remark,other_remark,conduct,session,tc_status,student_id,academic_id,left_on}, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})
router.post('/RecoverFromTc', upload.single('image'), async (req, res) => {
    console.log("yes i am in")
    const { tc_status,_id,academic_id,student_id} = req.body;
    
    Student.findByIdAndUpdate({_id:student_id},{tc_status}, function(err, resultt){
        if(err){
            console.log("yes error here"+err)
            res.send(err)
        }
        else{
            Academic.findByIdAndUpdate({_id:academic_id},{tc_status}, function(errr, resulttt){
                if(errr){
                    res.send(errr)
                }
                else{
                   var Tcdata=  TransferCertificate.findByIdAndRemove(_id).exec();
                    if (Tcdata) {
                        res.send(Tcdata)
                    }
                    else {
                        console.log("data is not stored")
                    }
                }
            })
        }
    })

    })
// End Transfer certificate routes
// Suspensioanle fee
router.post('/StoreSuspensionalVoucher', upload.single('image'), async (req, res) => {
const { admission_no,bank,remark,account_no,receipt_date,class_name,amount } = req.body;
try {
    const SuspensionalFees = new SuspensionalFee({admission_no,bank,remark,account_no,receipt_date,class_name,amount })
    await SuspensionalFees.save();
    if (SuspensionalFees) {
        console.log("SuspensionalFees")
    }
    else {
        console.log("data is not stored")
    }
    console.log(SuspensionalFees);
    res.send(SuspensionalFees)
} catch (err) {
    return res.status(422).send(err.message)
}
})
router.get('/getSuspensionalFee', async (req, res) => {
try {
    const data = await SuspensionalFee.find()
    if (data) {
        
    }
    
    res.send(data)
}
catch (err) {
    return res.status(422).send({ error: "error for fetching food data" })
}
})
router.post('/getSuspensionalFeeWithAdmissionNoZero', async (req, res) => {
    const { admission_no,session} = req.body
try {
    const data = await Receipt.find({admission_no,session})
    if (data) {
        
    }
    
    res.send(data)
}
catch (err) {
    return res.status(422).send({ error: "error for fetching food data" })
}

})


router.put('/SuspensionalFeeData', upload.single('image') ,async (req, res) => {
    console.log("Yes I Am In")
    const { _id,admission_no,bank,remark,account_no,receipt_date,class_name,amount  } = req.body;
    // const image = req.file.path
    SuspensionalFee.findByIdAndUpdate({_id},{ admission_no,bank,remark,account_no,receipt_date,class_name,amount  }, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})

router.delete('/deleteSuspensionalFee', (req, res) => {
    const { _id } = req.body
    console.log(_id)
    SuspensionalFee.findByIdAndRemove(_id).exec();
    res.send({ res: "Deleted Sucessfully" })
})
// End Suspensioanle fee
// Start Fee category routes
router.post('/StoreFeeCatogory', upload.single('image'), async (req, res) => {
const { category,description } = req.body;
try {
const Fee_cat = new FeeCategory({ category,description })
await Fee_cat.save();
if (Fee_cat) {
    console.log("Fee_cat")
}
else {
    console.log("data is not stored")
}
console.log(Fee_cat);
res.send(Fee_cat)
} catch (err) {
return res.status(422).send(err.message)

}
})

router.get('/getCategory', async (req, res) => {
try {
    const data = await FeeCategory.find()
    if (data) {
        
    }
    
    res.send(data)
}
catch (err) {
    return res.status(422).send({ error: "error for fetching food data" })
}
})
// end Fee category routes

// Start Fee Sub category routes
router.post('/StoreFeeSubCatogory', upload.single('image'), async (req, res) => {
const { fee_category,fee_sub_category,amount,month,status} = req.body;
try {
    const Fee_sub_cat = new FeeSubCategory({ fee_category,fee_sub_category,amount,month,status})
    await Fee_sub_cat.save();
    if (Fee_sub_cat) {
        console.log("Fee_sub_cat")
    }
    else {
        console.log("data is not stored")
    }
    console.log(Fee_sub_cat);
    res.send(Fee_sub_cat)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})

router.get('/getSubCategory', async (req, res) => {
    try {
        const data = await FeeSubCategory.find()
        if (data) {
            
        }
        
        res.send(data)
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
}) 
router.put('/updateFeeSubCategory', upload.single('image') ,async (req, res) => {
    console.log("Yes I Am In")
    const { _id,fee_category,fee_sub_category,amount,month,status } = req.body;
    // const image = req.file.path
    FeeSubCategory.findByIdAndUpdate({_id},{ fee_category,fee_sub_category,amount,month,status }, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})
router.delete('/deleteFeeSubCategory', (req, res) => {
    const { _id } = req.body
    console.log(_id)
    FeeSubCategory.findByIdAndRemove(_id).exec();
    res.send({ res: "Deleted Sucessfully" })
})
// end Fee Sub category routes


// Start Waiver Category routes
router.post('/StoreWaiverCategory', upload.single('image'), async (req, res) => {
console.log("yes im in");
const { category} = req.body;
try {
    const WaiverCat = new WaiverCategory({ category })
    await WaiverCat.save();
    if (WaiverCat) {
        console.log("WaiverCat")
    }
    else {
        console.log("data is not stored")
    }
    console.log(WaiverCat);
    res.send(WaiverCat)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})

router.get('/getWaiverCategory', async (req, res) => {
    try {
        const data = await WaiverCategory.find()
        if (data) {
            
        }
        
        res.send(data)
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
// end Waiver Category routes

// Start Waiver routes
router.post('/StoreWaiver', upload.single('image'), async (req, res) => {
console.log(req.body);
const { FeeCat,FeeSubCat,ExcemptionOrDeduction,CategoryOrGender,WaiverCat,Gender} = req.body;
try {
    const Waiver_cat = new Waiver({ FeeCat,FeeSubCat,ExcemptionOrDeduction,CategoryOrGender,WaiverCat,Gender })
    await Waiver_cat.save();
    if (Waiver_cat) {
        console.log("Waiver_cat")
    }
    else {
        console.log("data is not stored")
    }
    console.log(Waiver_cat);
    res.send(Waiver_cat)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})
// end Waiver routes

// Start Session routes
router.post('/StoreSession', upload.single('image'), async (req, res) => {
console.log(req.body);
const { from,to,session_code,school_id} = req.body;
try {
    const Session_data = new Session({from,to,session_code,school_id })
    await Session_data.save();
    if (Session_data) {
        console.log("Session_data")
    }
    else {
        console.log("data is not stored")
    }
    console.log(Session_data);
    res.send(Session_data)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})


router.post('/getSession', upload.single('image'), async (req, res) => {
    console.log(req.body);
    const {school_id} = req.body;
    try {
        const data = await Session.find({school_id})
        if (data) {
            
        }
        
        res.send(data)
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
        
    }
})
router.delete('/deleteSession', (req, res) => {
    const { _id } = req.body
    console.log(_id)
    Session.findByIdAndRemove(_id).exec();
    res.send({ res: "Deleted Sucessfully" })
})
// end Session routes

// Start Class routes
router.post('/StoreClass', upload.single('image'),async (req, res) => {
console.log("yes im in");
console.log(req.body);
const {class_name,actual_class,description,school_id,session} = req.body;
try {
    const class_data = new Class({class_name,actual_class,description,school_id,session })
    await class_data.save();
    if (class_data) {
        console.log("class_data")
    }
    else {
        console.log("data is not stored")
    }
    console.log(class_data);
    res.send(class_data)
} catch (err) {
    console.log(err.message.toString().includes('duplicate'))
    if(err.message.toString().includes('duplicate')){
       var errmsg = "please enter a unique value class"+req.body.class_name +" already exist"
       return res.send(errmsg)
    }
    
}
})

router.get('/getClass', async (req, res) => {
    try {
        const data = await Class.find()
        if (data) {
            
        }
        
        res.send(data)
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
router.post('/getClass', async (req, res) => {
    const {school_id} = req.body
    console.log(req.body)
    try {
         await Class.find({school_id}).exec((err,data)=>{
            res.send(data)
        })
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
router.put('/updateClass', upload.single('image') ,async (req, res) => {
    const { _id,school_id,class_name,actual_class,description } = req.body;
    // const image = req.file.path
    Class.findByIdAndUpdate({_id},{  school_id,class_name,actual_class,description }, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})
router.delete('/deleteClass', (req, res) => {
    const { _id } = req.body
    console.log(_id)
    Class.findByIdAndRemove(_id).exec();
    res.send({ res: "Deleted Sucessfully" })
})
// end Class routes


// Start Section routes
router.post('/StoreSection', upload.single('image'), async (req, res) => {
console.log(req.body);
const {school_id,class_name,section,description} = req.body;
try {
    const section_data = new Section({school_id,class_name,section,description })
    await section_data.save();
    if (section_data) {
        console.log("section_data")
    }
    else {
        console.log("data is not stored")
    }
    console.log(section_data);
    res.send(section_data)
} catch (err) {
    return res.status(422).send(err.message)
}
})
router.post('/getSection', async (req, res) => {
    const {  school_id} = req.body
    try {
        const data = await Section.find({school_id})
        if (data) {
            
        }
        
        res.send(data)
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
router.put('/updateSection', upload.single('image') ,async (req, res) => {
    const { _id,school_id,class_name,section,description} = req.body;
    // const image = req.file.path
    Section.findByIdAndUpdate({_id},{school_id,class_name,section,description}, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})
router.delete('/deleteSection', (req, res) => {
    const { _id } = req.body
    console.log(_id)
    Section.findByIdAndRemove(_id).exec();
    res.send({ res: "Deleted Sucessfully" })
})
// end Section routes


// Start Category routes
router.post('/StoreCategory', upload.single('image'), async (req, res) => {
console.log(req.body);
const {category,description} = req.body;
try {
    const category_data = new Category({category,description})
    await category_data.save();
    if (category_data) {
        console.log("category_data")
    }
    else {
        console.log("data is not stored")
    }
    console.log(category_data);
    res.send(category_data)
} catch (err) {
    return res.status(422).send(err.message)
}
})

router.get('/getCastCategory', async (req, res) => {
    try {
        const data = await Category.find()
        if (data) {
            
        }
        
        res.send(data)
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
router.delete('/deleteCategory', (req, res) => {
    const { _id } = req.body
    console.log(_id)
    Category.findByIdAndRemove(_id).exec();
    res.send({ res: "Deleted Sucessfully" })
})
// end Category routes

// Start Vehicle routes
router.post('/StoreVehicle', upload.single('image'), async (req, res) => {
console.log(req.body);
const {vehicle_type,vehicle_no,root,root_description,driver_name,contact_no,owner_address} = req.body;
try {
    const Vehicle_data = new Vehicle({vehicle_type,vehicle_no,root,root_description,driver_name,contact_no,owner_address})
    await Vehicle_data.save();
    if (Vehicle_data) {
        console.log("Vehicle_data")
    }
    else {
        console.log("data is not stored")
    }
    console.log(Vehicle_data);
    res.send(Vehicle_data)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})

   
router.get('/getVehicle', async (req, res) => {
    try {
        const data = await Vehicle.find()
        if (data) {
            
        }
        
        res.send(data)
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
router.put('/updateVehicle', upload.single('image') ,async (req, res) => {
    const { _id,vehicle_type,vehicle_no,root,root_description,driver_name,contact_no } = req.body;
    // const image = req.file.path
    Vehicle.findByIdAndUpdate({_id},{vehicle_type,vehicle_no,root,root_description,driver_name,contact_no }, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})
router.delete('/deleteVehicle', (req, res) => {
    const { _id } = req.body
    console.log(_id)
    Vehicle.findByIdAndRemove(_id).exec();
    res.send({ res: "Deleted Sucessfully" })
})
// end Vehicle routes


// Start Vehicle Type routes
router.post('/StoreVehicleType', upload.single('image'), async (req, res) => {
console.log(req.body);
const {vehicle_type} = req.body;
try {
    const Vehicle_type_data = new VehicleType({vehicle_type})
    await Vehicle_type_data.save();
    if (Vehicle_type_data) {
        console.log("Vehicle_type_data")
    }
    else {
        console.log("data is not stored")
    }
    console.log(Vehicle_type_data);
    res.send(Vehicle_type_data)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})
router.get('/getVehicleType', async (req, res) => {
    try {
        const data = await VehicleType.find()
        if (data) {
            
        }
        
        res.send(data)
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
router.put('/updateVehicleType', upload.single('image') ,async (req, res) => {
    const { _id,vehicle_type } = req.body;
    // const image = req.file.path
    VehicleType.findByIdAndUpdate({_id},{  vehicle_type }, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})
router.delete('/deleteVehicleType', (req, res) => {
    const { _id } = req.body
    console.log(_id)
    VehicleType.findByIdAndRemove(_id).exec();
    res.send({ res: "Deleted Sucessfully" })
})
// end Vehicle Type routes

// Bank routes
router.post('/StoreBankData', upload.single('image'), async (req, res) => {
console.log(req.body);
const {bank,school_id} = req.body;
try {
    const Bank_data = new Bank({bank,school_id})
    await Bank_data.save();
    if (Bank_data) {
        console.log("Bank_data")
    }
    else {
        console.log("data is not stored")
    }
    console.log(Bank_data);
    res.send(Bank_data)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})
router.post('/getBankData', async (req, res) => {
const { school_id} = req.body
try {
const data = await Bank.find({school_id})
if (data) {
    
}

res.send(data)
}
catch (err) {
return res.status(422).send({ error: "error for fetching food data" })
}

})
router.put('/UpdateBankData', upload.single('image') ,async (req, res) => {
console.log("Yes I Am In")
const { _id,bank,school_id} = req.body;
// const image = req.file.path
Bank.findByIdAndUpdate({_id},{bank,school_id}, function(err, result){
    if(err){
        res.send(err)
    }
    else{
        res.send(result)
    }
})
})
router.delete('/deleteBank', (req, res) => {
const { _id } = req.body
console.log(_id)
Bank.findByIdAndRemove(_id).exec();
res.send({ res: "Deleted Sucessfully" })
})
// end Bank routes

// Start Subject routes
router.post('/StoreSubject', upload.single('image'), async (req, res) => {
console.log(req.body);
const {school_id,class_name,subject,subject_code,board_code,order_no,description} = req.body;
try {
    const subject_data = new Subject({school_id,class_name,subject,subject_code,board_code,order_no,description})
    await subject_data.save();
    if (subject_data) {
        console.log("subject_data")
    }
    else {
        console.log("data is not stored")
    }
    console.log(subject_data);
    res.send(subject_data)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})


router.get('/getSubjects', async (req, res) => {
    try {
        const data = await Subject.find()
        if (data) {
            
        }
        
        res.send(data)
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
router.put('/updateSubject', upload.single('image') ,async (req, res) => {
    console.log("Yes I Am In")
    const { _id,school_id,class_name,subject,subject_code,board_code,order_no,description } = req.body;
    // const image = req.file.path
    Subject.findByIdAndUpdate({_id},{school_id,class_name,subject,subject_code,board_code,order_no,description }, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})
router.delete('/deleteSubject', (req, res) => {
    const { _id } = req.body
    console.log(_id)
    Subject.findByIdAndRemove(_id).exec();
    res.send({ res: "Deleted Sucessfully" })
})
// end Subject routes

// Start House routes
router.post('/StoreHouse', upload.single('image'), async (req, res) => {
console.log(req.body);
const {house_name,color} = req.body;
try {
    const House_data = new House({house_name,color})
    await House_data.save();
    if (House_data) {
        console.log("House_data")
    }
    else {
        console.log("data is not stored")
    }
    console.log(House_data);
    res.send(House_data)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})

router.get('/getHouse', async (req, res) => {
    try {
        const data = await House.find()
        if (data) {
            
        }
        
        res.send(data)
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
router.put('/updateHouse', upload.single('image') ,async (req, res) => {
    console.log("Yes I Am In")
    const { _id,house_name,color } = req.body;
    // const image = req.file.path
    House.findByIdAndUpdate({_id},{ house_name,color }, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})
router.delete('/deleteHouse', (req, res) => {
    const { _id } = req.body
    console.log(_id)
    House.findByIdAndRemove(_id).exec();
    res.send({ res: "Deleted Sucessfully" })
})
// end House routes
// Start Parent routes
router.post('/StoreParent', upload.single('image'), async (req, res) => {
console.log(req.body);
const image = req.file.path
const {account_no,father_name,mother_name,father_occu,father_designation,father_annual_income,mother_occu,mother_desgination,mother_annual_income,parent_address,parent_city,parent_state,parent_country,parent_phone,parent_mobile,gaurdian_name,gaurdian_occu,gaurdian_designation,gaurdian_annual_income,gaurdian_address,gaurdian_city,gaurdian_state,gaurdian_country,gaurdian_phone,gaurdian_mobile} = req.body;
try {
    const Parent_data = new Parent({image,account_no,father_name,mother_name,father_occu,father_designation,father_annual_income,mother_occu,mother_desgination,mother_annual_income,parent_address,parent_city,parent_state,parent_country,parent_phone,parent_mobile,gaurdian_name,gaurdian_occu,gaurdian_designation,gaurdian_annual_income,gaurdian_address,gaurdian_city,gaurdian_state,gaurdian_country,gaurdian_phone,gaurdian_mobile})
    await Parent_data.save();
    if (Parent_data) {
        console.log("Parent_data")
    }
    else {
        console.log("data is not stored")
    }
    console.log(Parent_data);
    res.send(Parent_data)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})

router.get('/getParent', async (req, res) => {
    try {
        const data = await Parent.find()
        if (data) {
            
        }
        
        res.send(data)
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
// end Parent routes



// Start Student routes
router.post('/StoreStudent', upload.fields([{
name: 'image',maxCount: 1
}, {
name: 'image2',maxCount: 1
},{
name: 'image3',maxCount: 1
},{
name: 'image4',maxCount: 1
}]), async (req, res) => {
console.log("yes i am in")
const balance=0
const {school_id,unique_id,session,date_of_admission,parent,admission_no,security_no,old_admission_no,aadhar_no,class_name,section,subjects,is_start_from_first_class,last_class,category,house,name,sex,dob,nationality,reg_no,roll_no,board_roll_no,last_school,fee_concession,bus_fare_concession,vehicle_no,is_teacher_ward,paid_upto_month,paid_upto_year,last_school_performance,is_full_free_ship,avail_transport,take_computer,no_exempt_security_deposit,ncc,no_exempt_registration,no_exempt_admission,is_repeater,other_details,misc_details,account_no,father_name,mother_name,father_occu,father_designation,father_annual_income,mother_occu,mother_desgination,mother_annual_income,parent_address,parent_city,parent_state,parent_country,parent_per_address,parent_per_city,parent_per_state,parent_per_country,parent_phone,parent_mobile,gaurdian_name,gaurdian_occu,gaurdian_designation,gaurdian_annual_income,gaurdian_address,gaurdian_city,gaurdian_state,gaurdian_country,gaurdian_per_address,gaurdian_per_city,gaurdian_per_state,gaurdian_per_country,gaurdian_phone,gaurdian_mobile,religion} = req.body;

var image,image2,image3,image4
if(req.files.image != undefined){
image = req.files.image[0].path;
}
else{
image = req.body.image
}
if(req.files.image2 != undefined){
image2= req.files.image2[0].path;
}
else{
    image2 = req.body.image2
}
if(req.files.image3 != undefined){
image3= req.files.image3[0].path;
}
else{
image3 = req.body.image3
}
if(req.files.image4 != undefined){
image4= req.files.image4[0].path;
}
else{
image4 = req.body.image4 
}
try {
    const Student_data = new Student({image,image2,image3,image4,school_id,tc_status:'0',unique_id,session,date_of_admission,balance,parent,admission_no,security_no,old_admission_no,aadhar_no,class_name,section,subjects,is_start_from_first_class,last_class,category,house,name,sex,dob,nationality,reg_no,roll_no,board_roll_no,last_school,fee_concession,bus_fare_concession,vehicle_no,is_teacher_ward,paid_upto_month,paid_upto_year,last_school_performance,is_full_free_ship,avail_transport,take_computer,no_exempt_security_deposit,ncc,no_exempt_registration,no_exempt_admission,is_repeater,other_details,misc_details,account_no,father_name,mother_name,father_occu,father_designation,father_annual_income,mother_occu,mother_desgination,mother_annual_income,parent_address,parent_city,parent_state,parent_country, parent_per_address,parent_per_city,parent_per_state,parent_per_country,parent_phone,parent_mobile,gaurdian_name,gaurdian_occu,gaurdian_designation,gaurdian_annual_income,gaurdian_address,gaurdian_city,gaurdian_state,gaurdian_country,gaurdian_per_address,gaurdian_per_city,gaurdian_per_state,gaurdian_per_country,gaurdian_phone,gaurdian_mobile,religion})
    await Student_data.save();
    if (Student_data) {
       await console.log("Student_data")
        const Academic_data = new Academic({student:Student_data._id,tc_status:'0',school_id,unique_id,session,class_name,section,admission_no,account_no})
        Academic_data.save();
    }
    else {
        console.log("data is not stored")
    }
    console.log(Student_data);
    res.send(Student_data)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})

    router.post('/getStudent', async (req, res) => {
    const { session,school_id} = req.body
    console.log(req.body)
    try {
            await Academic.find({session,school_id,tc_status:"0"}).populate('student').sort({ _id: -1 }).exec((err,data)=>{
            console.log("gfgfdgfdgfdgsadsadadsa",data)
            res.send(data)
        })
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})



router.post('/getStudentAccount_no', async (req, res) => {
    // const { session,school_id} = req.body
    console.log(req.body+"account no")
    try {
            await Academic.find({tc_status:"0"}).populate('student').sort({ _id: -1 }).exec((err,data)=>{
            console.log("gfgfdgfdgfdgsadsadadsa",data)
            res.send(data)
        })
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
// router.post('/getStudentCount', async (req, res) => {
//     const { session} = req.body
//     console.log(req.body)
//     try {
//             await Academic.find({session,tc_status:"0"}).populate('student').sort({ _id: -1 }).exec((err,data)=>{
//             console.log("gfgfdgfdgfdgsadsadadsa",data)
//             res.send(data.length)
//         })
//     }
//     catch (err) {
//         return res.status(422).send({ error: "error for fetching food data" })
//     }
// })
router.post('/singleparentdata', async (req, res) => {
    const { session,account_no} = req.body
    console.log(req.body)
    try {
            await Academic.find({account_no,tc_status:'0'}).populate('student').sort({ _id: -1 }).exec((err,data)=>{
            console.log("gfgfdgfdgfdgsadsadadsa",data)
            res.send(data)
        })
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
router.post('/singleparentdataWithSession', async (req, res) => {
    const { session,account_no} = req.body
    console.log(req.body)
    try {
            await Academic.find({account_no,session}).populate('student').sort({ _id: -1 }).exec((err,data)=>{
            console.log("gfgfdgfdgfdgsadsadadsa",data)
            res.send(data)
        })
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
router.post('/getStudentForUpgrade', async (req, res) => {
    const { session, class_name} = req.body
    console.log(req.body)
    try {
         await Academic.find({session,class_name,tc_status:"0"}).populate('student').sort({ _id: -1 }).exec((err,data)=>{
            console.log("gfgfdgfdgfdgsadsadadsa",data)
            res.send(data)
        })
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
router.post('/getStudentForUpgradeSingle', async (req, res) => {
    const { session, class_name,section} = req.body
    console.log(req.body)
    try {
         await Academic.find({session,class_name,section,tc_status:"0"}).populate('student').sort({ admission_no: -1 }).exec((err,data)=>{
            console.log("gfgfdgfdgfdgsadsadadsa",data)
            res.send(data)
        })
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
router.post('/singlestudentdata', async (req, res) => {
    const { session,admission_no,school_id} = req.body
    console.log(req.body)
    try {
         await Academic.find({admission_no,school_id}).populate('student').sort({ _id: -1 }).exec((err,data)=>{
            console.log("gfgfdgfdgfdgsadsadadsa",data)
            res.send(data)
        })
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
router.post('/singlestudentdata_with_session', async (req, res) => {
    const { session,admission_no,school_id} = req.body
    console.log(req.body)
    try {
         await Academic.find({session,admission_no,school_id}).populate('student').sort({ _id: -1 }).exec((err,data)=>{
            console.log("gfgfdgfdgfdgsadsadadsa",data)
            res.send(data)
        })
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
router.post('/searchByAdmission_noForTc', async (req, res) => {
    const { session,admission_no,school_id} = req.body
    console.log(req.body)
    try {
         await Academic.find({session,admission_no,school_id,tc_status:0}).populate('student').sort({ _id: -1 }).exec((err,data)=>{
            console.log("gfgfdgfdgfdgsadsadadsa",data)
            res.send(data)
        })
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})

  router.post('/GetStudentWithRange', async (req, res) => {
    const { session, FromAdmissionNo,ToAdmissionNo} = req.body
    console.log(req.body)
    try {
         await Academic.find({session,tc_status:"0",admission_no : {$gte : FromAdmissionNo},
         admission_no : {$lte : ToAdmissionNo}}).populate('student').sort({ _id: -1 }).exec((err,data)=>{
            console.log("gfgfdgfdgfdgsadsadadsa",data)
            res.send(data)
        })
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
// router.post('/singlestudentdata', async (req, res) => {
//     console.log('yes im in')
//     const { admission_no } = req.body;
//     try {
//        const data = await Student.find({ admission_no })
//         if (data) {
//             
//         }
        
//         res.send(data)
//     }
//     catch (err) {
//         return res.status(422).send({ error: "error for fetching profile data" })
//     }
// })

router.post('/singlestudentdata', upload.single('image'),async (req, res) => {
    console.log("yes im in");
    console.log(req.body);
    const { admission_no } = req.body;
    console.log("yes im in"+StudentData);
    try {
      const  studen_upgrade_data=   Academic.insertMany(JSON.parse(StudentData)).then(function(){ 
        console.log("Data inserted")  // Success 
        res.send(studen_upgrade_data)
        res()
        }).catch(function(error){ 
        console.log(error)      // Failure 
    }); 
    } catch (err) {
        console.log(err.message.toString().includes('duplicate'))  
    }
    })
router.put('/updateStudent', upload.fields([{
    name: 'image',maxCount: 1
  }, {
    name: 'image2',maxCount: 1
  },{
    name: 'image3',maxCount: 1
  },{
    name: 'image4',maxCount: 1
  }]) ,async (req, res) => {
    const {old_id,_id,unique_id,school_id,session,oldsession,date_of_admission,parent,admission_no,security_no,old_admission_no,aadhar_no,class_name,oldclass_name,section,oldsection,subjects,is_start_from_first_class,last_class,category,house,name,sex,dob,nationality,reg_no,roll_no,board_roll_no,last_school,balance,fee_concession,bus_fare_concession,vehicle_no,is_teacher_ward,paid_upto_month,paid_upto_year,last_school_performance,is_full_free_ship,avail_transport,take_computer,no_exempt_security_deposit,ncc,no_exempt_registration,no_exempt_admission,is_repeater,other_details,misc_details,account_no,father_name,mother_name,father_occu,father_designation,father_annual_income,mother_occu,mother_desgination,mother_annual_income,parent_address,parent_city,parent_state,parent_country, parent_per_address,parent_per_city,parent_per_state,parent_per_country,parent_phone,parent_mobile,gaurdian_name,gaurdian_occu,gaurdian_designation,gaurdian_annual_income,gaurdian_address,gaurdian_city,gaurdian_state,gaurdian_country,gaurdian_per_address,gaurdian_per_city,gaurdian_per_state,gaurdian_per_country,gaurdian_phone,gaurdian_mobile,religion } = req.body;
    console.log("Yes I Am In"+oldsession)
    var image,image2,image3,image4
    if(req.files.image != undefined){
    image = req.files.image[0].path;
    }
    else{
    image = req.body.image
    }
    if(req.files.image2 != undefined){
    image2= req.files.image2[0].path;
    }
    else{
        image2 = req.body.image2
    }
    if(req.files.image3 != undefined){
    image3= req.files.image3[0].path;
    }
    else{
    image3 = req.body.image3
    }
    if(req.files.image4 != undefined){
    image4= req.files.image4[0].path;
    }
    else{
    image4 = req.body.image4 
    }
    Student.findByIdAndUpdate({_id:old_id},{image,image2,image3,image4,unique_id,school_id,session:oldsession,date_of_admission,parent,admission_no,security_no,old_admission_no,aadhar_no,class_name:oldclass_name,section:oldsection,subjects,is_start_from_first_class,last_class,category,house,name,sex,dob,nationality,reg_no,roll_no,board_roll_no,last_school,balance,fee_concession,bus_fare_concession,vehicle_no,is_teacher_ward,paid_upto_month,paid_upto_year,last_school_performance,is_full_free_ship,avail_transport,take_computer,no_exempt_security_deposit,ncc,no_exempt_registration,no_exempt_admission,is_repeater,other_details,misc_details,account_no,father_name,mother_name,father_occu,father_designation,father_annual_income,mother_occu,mother_desgination,mother_annual_income,parent_address,parent_city,parent_state,parent_country, parent_per_address,parent_per_city,parent_per_state,parent_per_country,parent_phone,parent_mobile,gaurdian_name,gaurdian_occu,gaurdian_designation,gaurdian_annual_income,gaurdian_address,gaurdian_city,gaurdian_state,gaurdian_country,gaurdian_per_address,gaurdian_per_city,gaurdian_per_state,gaurdian_per_country,gaurdian_phone,gaurdian_mobile,religion }, function(err, result){
        if(err){                
            res.send(err)
        }
        else{
            Academic.findByIdAndUpdate({_id},{unique_id,school_id,session,class_name,section,admission_no,account_no }, function(err, result){
                if(err){
                    res.send(err)
                }
                else{
                    res.send(result)
                }
            })
            // res.send(result)
        }
    })
})

router.post('/StudentStrenght', async (req, res) => {
    console.log('yes im in' + req.body.class_name)
    const {session,section,class_name } = req.body;
     if(class_name == ""){
        try {
            await Academic.find({session,tc_status:'0'}).populate('student').sort({ class_name: 1 }).exec((err,data)=>{
                console.log("gfgfdgfdgfdgsadsadadsa",data)
                res.send(data)
            })
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
         }
    }
    else if(section ==""){
        try {
            if(class_name!="PRE-NUR"){
            await Academic.find({session,class_name,tc_status:"0"}).populate('student').sort({ section: 1 }).exec((err,data)=>{
                console.log("gfgfdgfdgfdgsadsadadsa",data)
                res.send(data)
            })
            }else{
                await Academic.find({session,class_name,section,tc_status:"0"}).populate('student').sort({ _id: -1 }).exec((err,data)=>{
                    console.log("gfgfdgfdgfdgsadsadadsa",data)
                    res.send(data)
                })
            }
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
        }
    }
    else{
        console.log("yes ia am in vineet")
        try {
            await Academic.find({session,class_name,section,tc_status:'0'}).populate('student').sort({ section: -1 }).exec((err,data)=>{
                console.log("gfgfdgfdgfdgsadsadadsa",data)
                res.send(data)
            })
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
         }
    }
   
})
router.post('/StudentStrenghtForSecurityClassWise', async (req, res) => {
    console.log('yes im in' + req.body.class_name)
    const {session,section,class_name } = req.body;
     if(class_name == ""){
        try {
            await Academic.find({session}).populate('student').sort({ class_name: 1 }).exec((err,data)=>{
                console.log("gfgfdgfdgfdgsadsadadsa",data)
                res.send(data)
            })
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
         }
    }
    else if(section ==""){
        try {
            if(class_name!="PRE-NUR"){
            await Academic.find({session,class_name}).populate('student').sort({ section: 1 }).exec((err,data)=>{
                console.log("gfgfdgfdgfdgsadsadadsa",data)
                res.send(data)
            })
            }else{
                await Academic.find({session,class_name,section}).populate('student').sort({ _id: -1 }).exec((err,data)=>{
                    console.log("gfgfdgfdgfdgsadsadadsa",data)
                    res.send(data)
                })
            }
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
        }
    }
    else{
        console.log("yes ia am in vineet")
        try {
            await Academic.find({session,class_name,section}).populate('student').sort({ section: -1 }).exec((err,data)=>{
                console.log("gfgfdgfdgfdgsadsadadsa",data)
                res.send(data)
            })
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
         }
    }
   
})


router.post('/StudentStrenghtForSecurityALL', async (req, res) => {
    console.log('yes im in' + req.body.class_name)
    const { session} = req.body;

        try {
            await Student.find().sort({ admission_no: 1 }).exec((err,data)=>{
                console.log("gfgfdgfdgfdgsadsadadsa",data)
                res.send(data)
            })
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
         }
   
})

router.delete('/deleteFeeStructure', (req, res) => {
    const { _id } = req.body
    console.log(_id)
    FeeStructure.findByIdAndRemove(_id).exec();
    res.send({ res: "Deleted Sucessfully" })
})
router.post('/StoreUpgradeStudent', upload.single('image'),async (req, res) => {
    console.log("yes im in");
    console.log(req.body);
    const {StudentData} = req.body;
    console.log("yes im in"+StudentData);
    try {
      const  studen_upgrade_data=   Academic.insertMany(JSON.parse(StudentData)).then(function(){ 
        console.log("Data inserted")  // Success 
        res.send(studen_upgrade_data)
        }).catch(function(error){ 
        console.log(error)      // Failure 
    }); 
    } catch (err) {
        console.log(err.message.toString().includes('duplicate'))  
    }
    })
    router.post('/ImportStudent',upload.single('image'),async (req, res) => {
        console.log("yes im in");
        // console.log(req.body);
        const {StudentData} = req.body;
        console.log("yes im in"+ StudentData);

        
        try {
          const  Student_data=   Student.insertMany(JSON.parse(StudentData)).then(result=>{ 
            console.log("Data inserted")  // Success 
            if (Student_data) {
                for (var i = 0; i <result.length; i++) {
                 const Academic_data = new Academic({student:result[i]._id,school_id:result[i].school_id,unique_id:result[i].unique_id,session:result[i].session,class_name:result[i].class_name,section:result[i].section,admission_no:result[i].admission_no,account_no:result[i].account_no,tc_status:result[i].tc_status})
                 Academic_data.save();
                }
             }
             else {
                 console.log("data is not stored")
             }
            res.send(Student_data)
            }).catch(function(error){ 
            console.log(error)      // Failure 
        }); 
        } catch (err) {
            console.log(err.message.toString().includes('duplicate'))  
        }
    })
    router.post('/Importallfees',upload.single('image'),async (req, res) => {
        console.log("yes im in");
        
        const {AllFeeData} = req.body;
        console.log(AllFeeData.length);
        // console.log("yes im in"+ AllFeeData);
        try {
          const  AllFeeDataa=   Receipt.insertMany(JSON.parse(AllFeeData)).then(result=>{ 
            console.log("Data inserted")  // Success 
            if (AllFeeDataa) {
                res.send(AllFeeDataa)
             }
            })
        } catch (err) {
            console.log(err.message.toString().includes('duplicate'))  
        }
    })
  
    router.post('/DeleteUpgradeStudent', upload.single('image'),async (req, res) => {
        const {IdArray} = req.body;
            Academic.deleteMany(
                        {
                        _id: {
                            $in: JSON.parse(IdArray)
                        }
                        },
                        function(err, result) {
                        if (err) {
                            res.send(err);
                            console.log("delete error "+err)
                        } else {
                            console.log("delete")
                            res.send(result);
                        }
                        }
                    );
    })
    router.put('/UpdateReceipt', upload.single('image') ,async (req, res) => {
        const { _id,bank,paid_month,receipt_no,receipt_date,last_fee_date,balance} = req.body;
        // const image = req.file.path
        Receipt.findByIdAndUpdate({_id},{bank,paid_month,receipt_no,receipt_date,last_fee_date,balance}, function(err, result){
            if(err){
                res.send(err)
            }
            else{
                res.send(result)
            }
        })
    })
// end Student routes
// Start Fee Structure routes
router.post('/StoreFeeStructure', upload.single('image'), async (req, res) => {
console.log(req.body);
const {session,unique_id,school_id,class_name,section,total_one_time_fee,fees,total_monthly_fee,total_annual_fee,grand_total} = req.body;
try {
    const Fee_structure_data = new FeeStructure({session,unique_id,school_id,class_name,section,total_one_time_fee,fees,total_monthly_fee,total_annual_fee,grand_total})
    await Fee_structure_data.save();
    if (Fee_structure_data) {
        console.log("Fee_structure_data")
    }
    else {
        console.log("data is not stored")
    }
    console.log(Fee_structure_data);
    res.send(Fee_structure_data)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})
router.post('/storeImportStructure', upload.single('image'),async (req, res) => {
    console.log("yes im in");
    // console.log(req.body);
    const {AllImportFeeStructure} = req.body;
    console.log("yes im in"+AllImportFeeStructure);
    try {
      const  studen_upgrade_data=   FeeStructure.insertMany(JSON.parse(AllImportFeeStructure)).then(function(){ 
        console.log("Data inserted")  // Success 
        res.send(studen_upgrade_data)
        }).catch(function(error){ 
        console.log(error)      // Failure 
    }); 
    } catch (err) {
        console.log(err.message.toString().includes('duplicate'))  
    }
    })

    router.post('/getFeeStructure', upload.single('image'), async (req, res) => {
        console.log(req.body);
        const {school_id,session} = req.body;
    try {
        const data = await FeeStructure.find({school_id,session})
        if (data) {
            
        }
        
        res.send(data)
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})

router.post('/FeeAmount', upload.single('image'),async (req, res) => {
    console.log('yes im in '+req.body.class_name)
    const { class_name,section } = req.body;
    console.log('yes im in '+class_name+" gfgdf "+section)
    try {
       const data = await FeeStructure.find({ class_name })
        if (data) {
            
        }
        
        res.send(data)
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching profile data" })
    }
})
router.post('/FeesClasswise', async (req, res) => {
    console.log('yes im in' + req.body.class_name+"-"+req.body.section)
    const { class_name,session,section } = req.body;
    if(class_name!="12" && class_name!="11"){
        try {
        const data = await FeeStructure.find({ class_name,session })
            if (data) {
                
            }
            res.send(data)
        }
        catch (err) {
            return res.status(422).send({ error: "error for fetching profile data" })
        }
    }
    else{
        try {
            const data = await FeeStructure.find({ class_name,section,session })
                if (data) {
                    console.log("yeah its working")
                }
                res.send(data)
            }
            catch (err) {
                return res.status(422).send({ error: "error for fetching profile data" })
            }
    }
})
 router.put('/updateFeeStructure', upload.single('image') ,async (req, res) => {
    console.log("Yes I Am In")
    const { _id,session,school_id,class_name,section,total_one_time_fee,fees,total_monthly_fee,total_annual_fee,grand_total } = req.body;
    // const image = req.file.path
    FeeStructure.findByIdAndUpdate({_id},{ session,school_id,class_name,section,total_one_time_fee,fees,total_monthly_fee,total_annual_fee,grand_total }, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            console.log("Done")
            res.send(result)
        }
    })
})
router.delete('/deleteFeeStructure', (req, res) => {
    const { _id } = req.body
    console.log(_id)
    FeeStructure.findByIdAndRemove(_id).exec();
    res.send({ res: "Deleted Sucessfully" })
})
// end Fee Structure routes
// Start Fee Receipt routes
router.post('/StoreReceipt', upload.single('image'), async (req, res) => {
console.log("unique_id"+req.body.unique_id);
const {receipt_date,take_computer,fee_concession,is_full_free_ship,is_teacher_ward,fees,defaulter_month,name,ref_receipt_no,last_fee_date,session,admission_no,class_name,section,prospectus_fee,registration_fee,admission_fee,security_fee,account_no,paid_fees,Allfees,paid_month,paid_months,fine,paid_amount,balance,total_one_time_fee,total_monthly_fee,total_annual_fee,grand_total,payment_mode,bank,bank_v_no,check_no,bank_date,unique_id} = req.body;
try {
    const dataa = await Receipt.findOne({ session }).sort({ _id: -1 }).exec((err,data)=>{
        var receipt_no
        if(data !=null){
             receipt_no= parseInt(data.receipt_no)+1
        }else{
            receipt_no= 1
        }

            const Fee_structure_data = new Receipt({unique_id:session+receipt_no,receipt_date,take_computer,fee_concession,is_full_free_ship,is_teacher_ward,fees,defaulter_month,name,receipt_no,last_fee_date,ref_receipt_no,session,admission_no,class_name,section,prospectus_fee,registration_fee,admission_fee,security_fee,account_no,paid_fees,Allfees,paid_month,paid_months,fine,paid_amount,balance,total_one_time_fee,total_monthly_fee,total_annual_fee,grand_total,payment_mode,bank,bank_v_no,check_no,bank_date})
     Fee_structure_data.save();
    if (Fee_structure_data) {
        console.log("Fee_structure_data")
    }
    else {
        console.log("data is not stored")
    }
    // console.log(Fee_structure_data);
    res.send(Fee_structure_data)
        
       
    })
   

} catch (err) {
    return res.status(422).send(err.message)
 
}
})

router.post('/SearchOldfee', async (req, res) => {
    console.log('yes im in' + req.body.admission_no)
    const { admission_no } = req.body;
    try {
       const data = await Receipt.find({ admission_no }).sort({last_fee_date:1})
        if (data) {
            
        }
        res.send(data)
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching profile data" })
    }
})
router.post('/DefaulterByMonth', async (req, res) => {
    console.log('yes im in' + req.body.session)
    const { session,DefaulterByMonth,class_name,section } = req.body;
    const defaulter_month =DefaulterByMonth
    var _id=[];
   
    try {
        if(class_name !='' && section !='' ){
        const data = await Receipt.aggregate(
            [
                {$match: { class_name: { $in: [class_name] },section: { $in: [section] } }
            },
              { $sort: { last_fee_date: 1,  } },
              {
                $group:
                  {
                    _id: "$admission_no",
                    last_id: { $last: "$_id" }
                  }
              }
            ]
         )
         if(data){
             data.map((item,index)=>{
                _id.push(mongoose.Types.ObjectId(item.last_id))
             })
         }
       var alldata=  Receipt.find({
            '_id': { $in: _id},last_fee_date: { 
                        $lt: defaulter_month
                    }
                    // *********** remove session from here example (  },session  )
        }, function(err, docs){
            // var docs_id=[];
            // docs.map((item,index)=>{
              
            //     docs_id.push(mongoose.Types.ObjectId(item._id))
            //  }) 


            // ,balance: { 
            //     $lte: 0
            // }
            Receipt.find({
                '_id': { $in: _id}
                // *********** remove session from here example (  },session  )
            }, function(err, docss){
                //  console.log(data);
                 var array3 = docss.filter(function(obj) { return docs.indexOf(obj) == -1; });
                 res.send(array3)
            }).sort({ section: 1 });
             
            //  res.send(docs)
        }).sort({ section: 1 });
    }else if(class_name !='' && section ==''){
        console.log("yahi wala hai")
        const data = await Receipt.aggregate(
            [
                {$match: { class_name: { $in: [class_name] } }
            },
              { $sort: { last_fee_date: 1,  } },
              {
                $group:
                  {
                    _id: "$admission_no",
                    last_id: { $last: "$_id" }
                  }
              }
            ]
         )
         if(data){
             data.map((item,index)=>{
                _id.push(mongoose.Types.ObjectId(item.last_id))
             })
         }
       var alldata=  Receipt.find({
            '_id': { $in: _id},last_fee_date: { 
                        $lt: defaulter_month
                    },session
                    // *********** remove session from here example (  },session  )
        }, function(err, docs){
            // var docs_id=[];
            // docs.map((item,index)=>{
              
            //     docs_id.push(mongoose.Types.ObjectId(item._id))
            //  }) 
            console.log(docs)
            Receipt.find({
                '_id': { $in: _id},session
                // *********** remove session from here example (  },session  )
            }, function(err, docss){
                //  console.log(data);
                 var array3 = docss.filter(function(obj) { return docs.indexOf(obj) == -1; });
                 res.send(array3)
            }).sort({ section: 1 });
             
            //  res.send(docs)
        }).sort({ section: 1 });
    }
    else{
        const data = await Receipt.aggregate(
            [
                // {$match: { class_name: { $in: ["PRE-NUR"] } }
            // },
              { $sort: { last_fee_date: 1, _id: 1 } },
              {
                $group:
                  {
                    _id: "$admission_no",
                    last_id: { $last: "$_id" }
                  }
              }
            ]
         )
         if(data){
             data.map((item,index)=>{
                _id.push(mongoose.Types.ObjectId(item.last_id))
             })
         }
       var alldata=  Receipt.find({
            '_id': { $in: _id},last_fee_date: { 
                        $lt: defaulter_month
                    }
                    // *********** remove session from here example (  },session  )
        }, function(err, docs){
            Receipt.find({
                '_id': { $in: _id}
                // *********** remove session from here example (  },session  )
            },function(err, docss){
                //  console.log(data);
                 var array3 = docss.filter(function(obj) { return docs.indexOf(obj) == -1; });
                 res.send(array3)
            }).sort({ class_name: 1 });;
            //  console.log(docs.length);
            //  res.send(docs)
        }).sort({ class_name: 1 });
    }
        // await Receipt.find({ '_id': { $in: _id},session, last_fee_date: { 
        //             $lt: new Date(defaulter_month)
        //         } })
        
    //    console.log(alldata);
    //    console.log(data.length);
        // if(class_name ==''){
        //     const data = await Receipt.find({ session, last_fee_date: { 
        //         $lt: new Date(defaulter_month)
        //     } })
        //     if (data) {
        //         
        //     }
        //     res.send(data)
        // } else{
        //     const data = await Receipt.find({ session,last_fee_date: { 
        //         $lt: new Date(defaulter_month)
        //     },class_name })
        //     if (data) {
        //         
        //     }
        //     res.send(data)
        // }

    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching profile data" })
    }
})
router.get('/getFeeReceipt', async (req, res) => {
    try {
        const data = await Receipt.find()
        if (data) {
            
        }
        
        res.send(data)
    }
    catch (err) {
        // return res.status(422).send({ error: "error for fetching food data" })
    }
})
router.post('/getFeeReceipt', async (req, res) => {
    console.log('yes im in' + req.body.session)
    const { session } = req.body;
        try {
            const dataa = await Receipt.findOne({ session }).sort({ _id: -1 }).exec((err,data)=>{
                console.log("gfgfdgfdgfdgsadsadadsa",data)
                
                if(data !=null){
                res.send(data)
                }else{
                res.send([undefined]) 
                }
                console.log("vineet"+data)
            })
           
             console.log("vineet"+dataa)
            //  res.send(dataa)
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching Receipt data" })
         }
  

   
})
router.post('/getFeeSummary', async (req, res) => {
    console.log('yes im in fee summary' + req.body.summaryFrom)
    const { bank,summaryFrom,summaryTo} = req.body;
    if(bank != ""){
        try {
            const dataa = await Receipt.find({receipt_date: {
                $gte: summaryFrom,
                $lte: summaryTo
            },bank}).sort({ receipt_date: 1 }).exec((err,data)=>{
                console.log("gfgfdgfdgfdgsadsadadsa",data)
                
                if(data !=null){
                res.send(data)
                }else{
                res.send([undefined]) 
                }
                console.log("vineet"+data)
            })
           
             console.log("vineet"+dataa)
            //  res.send(dataa)
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching Receipt data" })
         }
        }else{
            try {
                const dataa = await Receipt.find({receipt_date: {
                    $gte: summaryFrom,
                    $lte: summaryTo
                }}).sort({ receipt_date: 1 }).exec((err,data)=>{
                    console.log("gfgfdgfdgfdgsadsadadsa",data)
                    
                    if(data !=null){
                    res.send(data)
                    }else{
                    res.send([undefined]) 
                    }
                    console.log("vineet"+data)
                })
               
                 console.log("vineet"+dataa)
                //  res.send(dataa)
             }
             catch (err) {
                 return res.status(422).send({ error: "error for fetching Receipt data" })
             }
         }
})

router.post('/getadmission_no', async (req, res) => {
    console.log('yes im in' + req.body.session)
    const { session } = req.body;
        try {
            const dataa = await Student.findOne({}).sort({ _id: -1 }).exec((err,data)=>{
                console.log("gfgfdgfdgfdgsadsadadsa",data)
                
                if(data !=null){
                res.send(data)
                }else{
                res.send([undefined]) 
                }
                console.log("vineet"+data)
            })
           
             console.log("vineet"+dataa)
            //  res.send(dataa)
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching Receipt data" })
         }
  

   
})
// router.post('/getSummary', upload.single('image'), async (req, res) => {
//     console.log(req.body);
//     const {summaryFrom,summaryTo} = req.body;
//     try {
//         const data = await Receipt.find({"receipt_date":{ $gte:summaryFrom, $lt:summaryTo }
//     })
//         if (data) {
//             
//         }
//         
//         res.send(data)
//     }
//     catch (err) {
//         return res.status(422).send({ error: "error for fetching food data" });
//         console.log(err)
//     }
// })
router.patch('/UpdateBalance',upload.single('image'),async (req, res) => {    
    const { _id,balance,paid_upto_month } = req.body;
    console.log(req.body)
    Student.findByIdAndUpdate({_id},{balance,paid_upto_month}, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})
router.delete('/DeleteReceipt', (req, res) => {
    const { _id } = req.body
    console.log(_id)
    Receipt.findByIdAndRemove(_id).exec();
    res.send({ res: "Deleted Sucessfully" })
})
router.post('/VoucherByDate', async (req, res) => {
    console.log('yes im in' + req.body.Bank)
    const { Bank,VoucherDate } = req.body;
    const receipt_date = VoucherDate
    const bank = Bank
    if(Bank ==""){
        try {
            const data = await Receipt.find({receipt_date})
             if (data) {
                 
             }
             res.send(data)
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
         }
    }else{
        try {
            const data = await Receipt.find({ bank,receipt_date })
             if (data) {
                 
             }
             res.send(data)
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
         }
    }
   
})
router.post('/SuspiciousVoucherByDate', async (req, res) => {
    console.log('yes im in' + req.body.Bank)
    const { Bank,VoucherDate } = req.body;
    const receipt_date = VoucherDate
    const bank = Bank
    if(Bank ==""){
        try {
            const data = await SuspensionalFee.find({receipt_date})
             if (data) {
                 
             }
             res.send(data)
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
         }
    }else{
        try {
            const data = await SuspensionalFee.find({ bank,receipt_date })
             if (data) {
                 
             }
             res.send(data)
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
         }
    }
   
})

router.post('/printvoucherbydate', async (req, res) => {
    console.log('yes im in' + req.body.Bank)
    const {VoucherDate,Bank } = req.body;
    const receipt_date = VoucherDate
    const bank = Bank
   
   
    if(Bank ==""){
        try {
            const data = await Receipt.find({receipt_date})
             if (data) {
                 
             }
             res.send(data)
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
         }
    }else{
        try {
            const data = await Receipt.find({ bank,receipt_date })
             if (data) {
                 
             }
             res.send(data)
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
         }
    }
    
})

router.post('/VoucherInDetail', async (req, res) => {
    console.log('yes im in' + req.body.Bank)
    const { Bank,VoucherDate } = req.body;
    const receipt_date = VoucherDate
    const bank = Bank
    if(Bank ==""){
        try {
            const data = await Receipt.find({receipt_date}).sort({receipt_no:1})
             if (data) {
                 
             }
             res.send(data)
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
         }
    }else{
        try {
            const data = await Receipt.find({ bank,receipt_date }).sort({receipt_no:1})
             if (data) {
                 
             }
             res.send(data)
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
         }
    }
   
})
router.post('/suspiciousVoucher', async (req, res) => {
    console.log('yes im in' + req.body.Bank)
    const { Bank,VoucherDate,class_name} = req.body;
    const receipt_date = VoucherDate
    const bank = Bank
    if(Bank =="" ){
        try {
            const data = await SuspensionalFee.find({receipt_date})
             if (data) {
                 
             }
             res.send(data)
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
         }
    }
    else{
        try {
            const data = await SuspensionalFee.find({ bank,receipt_date})
             if (data) {
                 
             }
             res.send(data)
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
         }
    }
   
})

router.post('/VoucherByClass', async (req, res) => {
    console.log('yes im in' + req.body.Bank)
    const { Bank,VoucherDate,class_name} = req.body;
    const receipt_date = VoucherDate
    const bank = Bank
    if(Bank =="" ){
        try {
            const data = await Receipt.find({receipt_date,class_name})
             if (data) {
                 
             }
             res.send(data)
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
         }
    }
    else{
        try {
            const data = await Receipt.find({ bank,receipt_date,class_name })
             if (data) {
                 
             }
             res.send(data)
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
         }
    }
   
})

// End Fee Receipt routes

// Start Fine routes
router.post('/StoreFine', upload.single('image'), async (req, res) => {
const { category,fine_date,amount} = req.body;
try {
    const Fine_data = new Fine({ category,fine_date,amount})
    await Fine_data.save();
    if (Fine_data) {
        console.log("Fine_data")
    }
    else {
        console.log("data is not stored")
    }
    console.log(Fine_data);
    res.send(Fine_data)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})

router.get('/getFine', async (req, res) => {
    try {
        const data = await Fine.find()
        if (data) {
            
        }
        
        res.send(data)
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
}) 
router.put('/updateFine', upload.single('image') ,async (req, res) => {
    console.log("Yes I Am In")
    const { _id,category,fine_date,amount } = req.body;
    // const image = req.file.path
    Fine.findByIdAndUpdate({_id},{ category,fine_date,amount }, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})
// end Fine routes

// Defaulter Maker Routes
router.post('/ImportallDefaulter',upload.single('image'),async (req, res) => {
    console.log("yes im in");
    
    const {AllDefaulterData} = req.body;
    console.log(AllDefaulterData.length);
    // console.log("yes im in"+ AllDefaulterData);
    try {
      const  AllDefaulterDataa=   DefaulterMaker.insertMany(JSON.parse(AllDefaulterData)).then(result=>{ 
        console.log("Data inserted")  // Success 
        if (AllDefaulterDataa) {
            res.send(AllDefaulterDataa)
         }
        })
    } catch (err) {
        console.log(err.message.toString().includes('duplicate'))  
    }
})

router.post('/GetDefaulterMoneySingleStudent', async (req, res) => {
    const { session,admission_no} = req.body
    console.log(req.body)
    try {
        const data = await DefaulterMaker.find({admission_no,session})
        if (data) {
            
        }
        
        res.send(data[0])
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})

router.put('/UpdateSpeceficPreviousSessionAmount', upload.single('image'), async (req, res) => {
    console.log(req.body);
    const {_id,TotalPreviousBalance,name} = req.body;
    try {
        if(name !=""){
        DefaulterMaker.findByIdAndUpdate({_id},{ TotalPreviousBalance }, function(err, result){
            if(err){
                res.send(err)
            }
            else{
                res.send(result)
            }
        })
    }
    } catch (err) {
        return res.status(422).send(err.message)
     
    }
})
// End defaulter Makers Routes





// ***************************************************
// *************** Employees Routes ******************


// Employe routes
router.post('/StoreEmployee', upload.single('image'), async (req, res) => {
console.log(req.body);
const {name,dob,doa,sex,designation,pay_level} = req.body;
try {
    const EmployeeData = new Employee({name,dob,doa,sex,designation,pay_level})
    await EmployeeData.save();
    if (EmployeeData) {
        console.log("EmployeeData")
    }
    else {
        console.log("data is not stored")
    }
    console.log(EmployeeData);
    res.send(EmployeeData)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})
router.post('/getEmployees', async (req, res) => {
const { school_id} = req.body
try {
await Employee.find().populate('pay_level').sort({ _id: -1 }).exec((err, data) => {
    console.log("gfgfdgfdgfdgsadsadadsa", data)
    res.send(data)
})

}
catch (err) {
return res.status(422).send({ error: "error for fetching food data" })
}

})



// PayType routes


router.post('/StorePayType', upload.single('image'), async (req, res) => {
console.log(req.body);
const {name,category,description} = req.body;
try {
    const PayTypeData = new PayType({name,category,description})
    await PayTypeData.save();
    if (PayTypeData) {
        console.log("PayTypeData")
    }
    else {
        console.log("data is not stored")
    }
    console.log(PayTypeData);
    res.send(PayTypeData)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})
router.post('/getPayType', async (req, res) => {
const { school_id} = req.body
try {
const data = await PayType.find({})
if (data) {
    
}

res.send(data)
}
catch (err) {
return res.status(422).send({ error: "error for fetching food data" })
}

})

router.put('/UpdatePayType', upload.single('image'), async (req, res) => {
console.log(req.body);
const {_id,name,category,description} = req.body;
try {
    PayType.findByIdAndUpdate({_id},{ name,category,description }, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
} catch (err) {
    return res.status(422).send(err.message)
 
}
})

router.delete('/DeletePayType', (req, res) => {
const { _id } = req.body
console.log(_id)
PayType.findByIdAndRemove(_id).exec();
res.send({ res: "Deleted Sucessfully" })
})
// end Pay Type Routes


// Pay Ctegory routes


router.post('/StorePayCategory', upload.single('image'), async (req, res) => {
console.log(req.body);
const {name,description} = req.body;
try {
    const PaycatData = new PayCategory({name,description})
    await PaycatData.save();
    if (PaycatData) {
        console.log("PaycatData")
    }
    else {
        console.log("data is not stored")
    }
    console.log(PaycatData);
    res.send(PaycatData)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})
router.post('/getPayCategoty', async (req, res) => {
const { school_id} = req.body
try {
const data = await PayCategory.find({})
if (data) {
    
}

res.send(data)
}
catch (err) {
return res.status(422).send({ error: "error for fetching food data" })
}

})

router.put('/UpdatePayCategory', upload.single('image'), async (req, res) => {
console.log(req.body);
const {_id,name,description} = req.body;
try {
    PayCategory.findByIdAndUpdate({_id},{ name,description }, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
} catch (err) {
    return res.status(422).send(err.message)
 
}
})

router.delete('/DeletePayCategory', (req, res) => {
const { _id } = req.body
console.log(_id)
PayCategory.findByIdAndRemove(_id).exec();
res.send({ res: "Deleted Sucessfully" })
})
// end Pay Category Routes


// Pay Designation routes


router.post('/StoreEmployeeDesignation', upload.single('image'), async (req, res) => {
console.log(req.body);
const {name,description} = req.body;
try {
    const DesignationData = new Designation({name,description})
    await DesignationData.save();
    if (DesignationData) {
        console.log("DesignationData")
    }
    else {
        console.log("data is not stored")
    }
    console.log(DesignationData);
    res.send(DesignationData)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})
router.post('/getDesignation', async (req, res) => {
const { school_id} = req.body
try {
const data = await Designation.find({})
if (data) {
    
}

res.send(data)
}
catch (err) {
return res.status(422).send({ error: "error for fetching food data" })
}

})

router.put('/UpdateDesignation', upload.single('image'), async (req, res) => {
console.log(req.body);
const {_id,name,description} = req.body;
try {
    Designation.findByIdAndUpdate({_id},{ name,description }, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
} catch (err) {
    return res.status(422).send(err.message)
 
}
})

router.delete('/DeleteDesignation', (req, res) => {
const { _id } = req.body
console.log(_id)
Designation.findByIdAndRemove(_id).exec();
res.send({ res: "Deleted Sucessfully" })
})
// end Pay Designation Routes


// Pay Scale Type routes


router.post('/StorePayScaleType', upload.single('image'), async (req, res) => {
console.log(req.body);
const {name,description} = req.body;
try {
    const PayScaleTypeData = new PayScaleType({name,description})
    await PayScaleTypeData.save();
    if (PayScaleTypeData) {
        console.log("PayScaleTypeData")
    }
    else {
        console.log("data is not stored")
    }
    console.log(PayScaleTypeData);
    res.send(PayScaleTypeData)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})
router.post('/getPayScaleType', async (req, res) => {
const { school_id} = req.body
try {
const data = await PayScaleType.find({})
if (data) {
    
}

res.send(data)
}
catch (err) {
return res.status(422).send({ error: "error for fetching food data" })
}
})

router.put('/UpdatePayScaleType', upload.single('image'), async (req, res) => {
console.log(req.body);
const {_id,name,description} = req.body;
try {
    PayScaleType.findByIdAndUpdate({_id},{ name,description }, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
} catch (err) {
    return res.status(422).send(err.message)
 
}
})

router.delete('/DeletePayScaleType', (req, res) => {
const { _id } = req.body
console.log(_id)
PayScaleType.findByIdAndRemove(_id).exec();
res.send({ res: "Deleted Sucessfully" })
})

// end Pay Scale Type Routes


// Pay Scale routes


router.post('/StorePayScale', upload.single('image'), async (req, res) => {
console.log(req.body);
const {PayScaleName,PayScale} = req.body;
try {
    const PayScaleData = new PayScaleTABLE({PayScaleName,PayScale})
    await PayScaleData.save();
    if (PayScaleData) {
        console.log("PayScaleData")
    }
    else {
        console.log("data is not stored")
    }
    console.log(PayScaleData);
    res.send(PayScaleData)
} catch (err) {
    return res.status(422).send(err.message)
 
}
})
router.post('/getPayScale', async (req, res) => {
const { school_id} = req.body
try {
const data = await PayScaleTABLE.find({})
if (data) {
    
}

res.send(data)
}
catch (err) {
return res.status(422).send({ error: "error for fetching food data" })
}
})

router.put('/UpdatePayScale', upload.single('image'), async (req, res) => {
console.log(req.body);
const {_id,PayScaleName,PayScale} = req.body;
try {
    PayScaleTABLE.findByIdAndUpdate({_id},{ PayScaleName,PayScale }, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
} catch (err) {
    return res.status(422).send(err.message)
 
}
})

router.delete('/DeletePayScale', (req, res) => {
const { _id } = req.body
console.log(_id)
PayScaleTABLE.findByIdAndRemove(_id).exec();
res.send({ res: "Deleted Sucessfully" })
})
// end Pay Scale Routes
// Update Subects Routes
router.patch('/UpdateSubjects',upload.single('image'),async(req,res)=>{ 
       
    const { IdArray,subjects } = req.body;
    // console.log(req.body)
    try{
    JSON.parse(IdArray).map(async(item,index)=>{
        var _id =item
        // console.log(subjects)
        await Student.findByIdAndUpdate({_id},{subjects}, function(err, result){
            if(err){
                console.log(err)
            }
            if(JSON.parse(IdArray).length-1==index){
                res.send(result)
            }
            // console.log(result)
           
        })
    })

    
} catch (err) {
    console.log(err)
    return res.status(422).send(err.message)
 
}
    
   
})

// End Update Subjects Routes

//  Fee Recipt By Range Routes
router.post('/GetFeeReceiptByRange', async (req, res) => {
    console.log('yes im in' + req.body.FromReceiptNo)
    const {session,FromReceiptNo,ToReceiptNo } = req.body;
     
        try {
            await Receipt.find({session,receipt_no: { $lte: parseInt(ToReceiptNo)},receipt_no: { $gte: parseInt(FromReceiptNo) }}).exec((err,data)=>{
                console.log("gfgfdgfdgfdgsadsadadsa",data)
                res.send(data)
            })
         }
         catch (err) {
             return res.status(422).send({ error: "error for fetching profile data" })
         }
    
})
router.patch('/UpdateFeeReceiptByRange',upload.single('image'),async(req,res)=>{ 
    console.log("Yes I am In "+req.body.bank)
    const { IdArray,bank,receipt_date } = req.body;
    
    if(bank=="" && receipt_date!="" ){
        try{
            JSON.parse(IdArray).map(async(item,index)=>{
                var _id =item
                // console.log(subjects)
                await Receipt.findByIdAndUpdate({_id},{receipt_date}, function(err, result){
                    if(err){
                        console.log(err)
                    }
                    if(JSON.parse(IdArray).length-1==index){
                        res.send(result)
                    }
                    // console.log(result)
                   
                })
            })
        } catch (err) {
            console.log(err)
            return res.status(422).send(err.message)
         
        }
    }else if(receipt_date=="" && bank!=""){
        try{
            JSON.parse(IdArray).map(async(item,index)=>{
                var _id =item
                // console.log(subjects)
                await Receipt.findByIdAndUpdate({_id},{bank}, function(err, result){
                    if(err){
                        console.log(err)
                    }
                    if(JSON.parse(IdArray).length-1==index){
                        res.send(result)
                    }
                    // console.log(result)
                   
                })
            })
        } catch (err) {
            console.log(err)
            return res.status(422).send(err.message)
         
        }
    }
    else if(receipt_date!="" && bank !=""){
        try{
            JSON.parse(IdArray).map(async(item,index)=>{
                var _id =item
                // console.log(subjects)
                await Receipt.findByIdAndUpdate({_id},{bank,receipt_date}, function(err, result){
                    if(err){
                        console.log(err)
                    }
                    if(JSON.parse(IdArray).length-1==index){
                        res.send(result)
                    }
                    // console.log(result)
                   
                })
            })
        } catch (err) {
            console.log(err)
            return res.status(422).send(err.message)
         
        }
    }    
})
// End Fee Recipt By Ranges Routes

// Dashboard Student Count Routes

router.post('/getStudentCount', async (req, res) => {
    const { session,school_id} = req.body
    console.log(req.body)
    try {
        Academic.count({session,school_id,tc_status:"0"}, function(err, result) {
            if (err) {
              console.log(err);
            } else {
                console.log(result)
                res.send({"count":result})
            }
          });
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching food data" })
    }
})
// End Dashboard Student Count Routes


//  Security Register All Routes

router.post('/SearchOldfeeSecurityRegisterAll', async (req, res) => {
    console.log('yes im in' + req.body.admission_no)
    const { admission_no } = req.body;
    try {
       const data = await Receipt.find({ admission_no,security_fee:{ $ne: "" } }).sort({last_fee_date:1})
        if (data) {
            
        }
        res.send(data)
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching profile data" })
    }
})
// End Security Register All Routes







    // Start PreAdmissionForm routes
    router.post('/StorePreAdmissionForm', upload.single('image'), async (req, res) => {
    console.log(req.body);
    const {session,date_of_admission,class_name,name,sex,dob,father_name,mother_name,parent_address,parent_mobile} = req.body;
    try {
        const PreAdmissionData_data = new PreAdmissionForm({session,date_of_admission,class_name,name,sex,dob,father_name,mother_name,parent_address,parent_mobile,tc_status:"1"})
        await PreAdmissionData_data.save();
        if (PreAdmissionData_data) {
            console.log("PreAdmissionData_data")
        }
        else {
            console.log("data is not stored")
        }
        console.log(PreAdmissionData_data);
        res.send(PreAdmissionData_data)
    } catch (err) {
        return res.status(422).send(err.message)
     
    }
    })
    router.get('/getPreAdmissionFormData', async (req, res) => {
        try {
            const data = await PreAdmissionForm.find()
            if (data) {
                console.log(data[0])
            }
            console.log(data[0])
            res.send(data)
        }
        catch (err) {
            return res.status(422).send({ error: "error for fetching food data" })
        }
    })
    router.put('/updatePreadmissionFormData', upload.single('image') ,async (req, res) => {
        const { _id,session,date_of_admission,class_name,name,sex,dob,father_name,mother_name,parent_address,parent_mobile,tc_status } = req.body;
        // const image = req.file.path
        PreAdmissionForm.findByIdAndUpdate({_id},{session,date_of_admission,class_name,name,sex,dob,father_name,mother_name,parent_address,parent_mobile,tc_status}, function(err, result){
            if(err){
                res.send(err)
            }
            else{
                res.send(result)
            }
        })
    })
    router.delete('/deletePreAdmissionFormData', (req, res) => {
        const { _id } = req.body

        PreAdmissionForm.findByIdAndRemove(_id).exec();
        res.send({ res: "Deleted Sucessfully" })
    })

    router.post('/getPreAdmissionStudentForUpgrade', async (req, res) => {
        const { session} = req.body
        console.log(req.body)
        try {
             await PreAdmissionForm.find({session,tc_status:"1"}).exec((err,data)=>{
                console.log("gfgfdgfdgfdgsadsadadsa",data)
                res.send(data)
            })
        }
        catch (err) {
            return res.status(422).send({ error: "error for fetching food data" })
        }
    })
    router.post('/UpdatePreAdmissionStudentStatusForSorted', upload.single('image'),async (req, res) => {
        const {IdArray} = req.body;
        PreAdmissionForm.update( {_id: { $in: JSON.parse(IdArray) }}, { tc_status: "0" }, { multi: true }, function(err, result) {
            if (err) {
                res.send(err, null);
            } 
            else {
                res.send(result);
            }
        }) 
    })
    router.post('/getPreAdmissionStudentForUpgradeAcademics', async (req, res) => {
        const { session,class_name} = req.body
        console.log(req.body)
        try {
             await PreAdmissionForm.find({session,class_name,tc_status:"0"}).sort({class_name:'1'}).exec((err,data)=>{
                console.log("gfgfdgfdgfdgsadsadadsa",data)
                res.send(data)
            })
        }
        catch (err) {
            return res.status(422).send({ error: "error for fetching food data" })
        }
    })
// end PreAdmissionForm routes
module.exports = router

