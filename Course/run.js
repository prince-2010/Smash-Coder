const mongoose = require('mongoose');
const courses = require('./courses');
const Course = require('../models/course');

mongoose.connect('mongodb://localhost/log', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err);
})
db.once('open', () => {
  console.log("MongoDB Connected Successfully");
});

Course.insertMany(courses)
.then(res=>{
    console.log(res)
})
.catch(e=>{
    console.log(e)
})