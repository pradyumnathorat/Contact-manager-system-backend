
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const contactSchema = new schema({
    firstName : { 
        type : String ,
        required : true
    },
    lastName : { 
        type : String ,
        required : true
    },
    email : {
        type : String ,
        required : true,
        unique : true
    },
    phone : {
        type : String ,
        required : true,
        unique : true
    }
})

const contsctModel = mongoose.model('contact', contactSchema);
module.exports = contsctModel;
