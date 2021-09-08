const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name:{
       type:String,
       required: true
    },
    title:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    link:{
        type:String,
    },
    description:{
        type:String,
    }
})
const Course = mongoose.model('Course',courseSchema);
module.exports = Course;
