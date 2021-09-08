// Packages and modules of JS
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const alert = require('alert');
const session = require('express-session');
const ejsMate = require('ejs-mate');
const User = require('./models/user');
const Course = require('./models/course');
const Query = require('./models/query');

// MongoDB Connection
mongoose.connect('mongodb://localhost/log', { useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err);
})
db.once('open', () => {
  console.log("MongoDB Connected Successfully");
});

// Using express 
const app = express();

//port
const PORT = process.env.PORT || 3000;

app.engine('ejs', ejsMate)
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(session({secret: 'notagoodsecret'}))
app.use(express.urlencoded({ extended: true }));

//Rendering ejs pages using get request
app.get('/', async(req, res) => {
  let courses = await Course.find({});
  res.render('home',{courses});
})

app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/contact', (req, res) => {
  res.render('contact');
})

app.get('/register', function (req, res) {
  res.render('register');
})

// Registration form API
app.post('/register', async (req, res) => {
  
  const { name, username, email, password } = req.body;
  try{
  //Finding username in database (is exists or not)
  const buser = await User.findOne({ username : username });
  if(buser!==null)
  {
    alert("User already exists");
    return res.redirect('/register');
  }
  
  //Bcrypting the password before storing in the database
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    name,
    username,
    email,
    password: hash
  })
  

  //Saving registered data in database
  await user.save();

  req.session.user=user._id;
  res.redirect('/');
}catch(e){
   console.log(e);
}

})



// Login form API
app.post('/login', async (req, res) => {

  const { usernmae, password } = req.body;
  try {
    //Matching entered data from database
    const user = await User.findOne({ username : usernmae });
    if(user===null)
    {
      alert("User doesn not exists");
      return  res.redirect('/register');

    }
    // Comparing the entered password from the password which is stored in the database
    const valid = await bcrypt.compare(password, user.password);
    
    if (valid) {

      req.session.user= user._id;
      return res.redirect("/secrete");
    }
    else {
      alert("Wrong password or username");
      res.redirect('/register');
    }
  }
  catch (e) {
    console.log(e);
  }

})

//Logout API
app.post('/logout',(req,res)=>{

  try{
  // making user to null
  req.session.user = null;
  res.redirect('/secrete');
  }catch(e)
  {
    console.log(e);
  }
})


// Secrete API
app.get('/secrete',(req,res)=>{

try{

  if(!req.session.user)
  {
    //console.log(req.session.user);
    return res.redirect('/register');
  }
  res.redirect('/');
}catch (e) {
  console.log(e);
}

})

app.post('/query',async (req,res)=>{
  const q = new Query(req.body);
  await q.save();
  res.redirect('/');
})
// Listening the sever
 app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
})