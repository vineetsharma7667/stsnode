const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const FeeReceiptSchema = new Schema({
    unique_id:{
        type:String, 
        unique:true
    },
    take_computer:{
        type:String, 
    },
    is_full_free_ship:{
        type:String, 
      
    },
    is_teacher_ward:{
        type:String, 
      
    },
    fee_concession:{
        type:String, 
      
    },
    receipt_date:{
        type:String,        
    },
    defaulter_month:{
        type:String,          
    },
    receipt_no:{
        type:String,        
    },
    last_fee_date:{
        type:String,        
    },
    ref_receipt_no:{
        type:String,
    },
    session:{
        type:String,        
        required:true,
    }, 
    admission_no:{
        type:String,        
    },
    name:{
        type:String,        
    },
    class_name:{
        type:String,        
    },
    section:{
        type:String,        
    },
    account_no:{
        type:String,        
    },
    prospectus_fee:{
        type:String,        
    },
    registration_fee:{
        type:String,        
    },
    admission_fee:{
        type:String,        
    },
    security_fee:{
        type:String,        
    },
    paid_fees:{
        type:String
    },
    Allfees:{
        type:String 
    },
    paid_month:{
        type:String
    },
    paid_months:{
        type:String
    },
    paid_amount:{
        type:String
    },
    fine:{
        type:String
    },
    balance:{
        type:String
    },
    total_one_time_fee:{
        type:String,        
    },
    total_monthly_fee:{
        type:String,        
    },
    total_annual_fee:{
        type:String,        
    },
    grand_total:{
        type:String,        
    },
    payment_mode:{
        type:String,        
    },
    bank:{
        type:String,        
    },
    bank_v_no:{
        type:String,        
    },
    check_no:{
        type:String,        
    },
    bank_date:{
        type:String,        
    },
    fees:{
        type:String,    
    }
},{timestamps: true}
)

mongoose.model('Receipt',FeeReceiptSchema);
