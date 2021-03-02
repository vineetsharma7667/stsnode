const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')
const StudentSchema = new Schema({
    unique_id:{
        unique:true,
        type:String,    
        required:true       
    },
    school_id:{
        type:String,        
    },
    session:{
        type:String,        
    }, 
    date_of_admission:{
        type:String,        
    }, 
    parent:{
        type:String,        
    }, 
    account_no:{
        type:String,        
    }, 
    admission_no:{
        type:String,        
    }, 
    security_no:{
        type:String,        
    }, 
    old_admission_no:{
        type:String,        
    }, 
    aadhar_no:{
        type:String,        
    }, 
    class_name:{
        type:String,        
    }, 
    section:{
        type:String,        
    }, 
    subjects:{
        type:String,        
    }, 
    is_start_from_first_class:{
        type:String,        
    }, 
    last_class:{
        type:String,        
    }, 
    category:{
        type:String,        
    },
    house:{
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
    nationality:{
        type:String,        
    },
    reg_no:{
        type:String,        
    },
    roll_no:{
        type:String,        
    },
    board_roll_no:{
        type:String,        
    },
    last_school:{
        type:String,        
    }, 
    balance:{
        type:String,        
    },
    religion:{
        type:String,  
    },
    fee_concession:{
        type:String,        
    }, 
    bus_fare_concession:{
        type:String,        
    }, 
    vehicle_no:{
        type:String,        
    }, 
    is_teacher_ward:{
        type:String,        
    }, 
    paid_upto_month:{
        type:String,        
    }, 
    paid_upto_year:{
        type:String,        
    }, 
    last_school_performance:{
        type:String,        
    }, 

    is_full_free_ship:{
        type:String,        
    }, 

    avail_transport:{
        type:String,        
    }, 

    take_computer:{
        type:String,        
    }, 

    no_exempt_security_deposit:{
        type:String,        
    }, 

    ncc:{
        type:String,        
    }, 

    no_exempt_registration:{
        type:String,        
    }, 

    no_exempt_admission:{
        type:String,        
    }, 

    is_repeater:{
        type:String,        
    }, 

    other_details:{
        type:String,        
    }, 

    misc_details:{
        type:String,        
    }, 
    father_name:{
        type:String,        
    },
    mother_name:{
        type:String,     
    },
    father_occu:{
        type:String,     
    },
    father_designation:{
        type:String,     
    },
    father_annual_income:{
        type:String,      
    },
    mother_occu:{
        type:String,             
    },
    mother_designation:{
        type:String,     
    },
    mother_annual_income:{
        type:String,     
    },
    parent_address:{
        type:String,     
    },
    parent_city:{
        type:String,     
    },
    parent_state:{
        type:String,     
    },parent_country:{
        type:String,     
    },
    parent_per_address:{
        type:String,     
    },
    parent_per_city:{
        type:String,     
    },
    parent_per_state:{
        type:String,     
    },parent_per_country:{
        type:String,     
    },
    parent_phone:{
        type:String,     
    },
    parent_mobile:{
        type:String,     
    },
    gaurdian_name:{
        type:String,     
    },
    gaurdian_occu:{
        type:String,     
    },
    gaurdian_designation:{
        type:String,     
    },
    gaurdian_annual_income:{
        type:String,     
    },
    gaurdian_address:{
        type:String,     
    },
    gaurdian_city:{
        type:String,     
    },
    gaurdian_state:{
        type:String,     
    },
    gaurdian_country:{
        type:String,     
    },
    gaurdian_per_address:{
        type:String,     
    },
    gaurdian_per_city:{
        type:String,     
    },
    gaurdian_per_state:{
        type:String,     
    },
    gaurdian_per_country:{
        type:String,     
    },
    gaurdian_phone:{
        type:String,     
    },
    gaurdian_mobile:{
        type:String,     
    },
    tc:{
        type:String,        
    }, 
    struck_off:{
        type:String,        
    },
    image:{
        type:String,        
    }, 
    image2:{
        type:String,        
    }, 
    image3:{
        type:String,        
    }, 
    image4:{
        type:String,        
    }, 
    // academics:[{ type: Schema.Types.ObjectId,
    //     ref:"Academic" 
    // }],

},{timestamps: true}
)
mongoose.model('Student',StudentSchema);