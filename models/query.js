const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    email:{
       type:String,
       required: true
    },
    message:{
        type:String
    },
    
})
const Query = mongoose.model('Query',querySchema);
module.exports = Query;
