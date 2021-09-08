const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required : [true,'Cannot be blank']
     },
     username:{
        type: String,
        required : [true,'Cannot be blank'],
     },
    email:{
        type: String,
        required : [true,'Cannot be blank']
     },

     password:{
        type: String,
        required : [true,'Cannot be blank']
     },
})

module.exports = mongoose.model('User', userSchema);