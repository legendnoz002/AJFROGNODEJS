const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const studentManage = require('./routes/studentRouter')
const staffManage = require('./routes/staffRouter')
const teacherManage = require('./routes/teacherRouter')

const User = require('./models/user')



mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test123@ds117816.mlab.com:17816/ooad');

//ID: legendnoz002
//PASSWORD: legendnoz007 

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/manage/student', studentManage)
app.use('/manage/staff', staffManage)
app.use('/manage/teacher', teacherManage)

app.get('/', function (req, res) {
  res.render('login',{err: false})
})

app.post('/login', function (req, res) {
  let username = req.body.username
  let password = req.body.password

  User.findOne({ username: username, password: password }, function (err, user) { // แก้
    if (err) {
      console.log(err)
      return res.render('login',{err: true})
    }
    if (!user) {
      return res.render('login',{err: true})
    }

    if(user.uType == 'student') {
      ///////////////// render "STUDENT MENU" //////////////////
    }
    if(user.uType == 'teacher') {
      ///////////////// render "STUDENT MENU" //////////////////
    }
    if(user.uType == 'staff') {
      ///////////////// render "STUDENT MENU" //////////////////
    }

    return res.redirect('/main')
  })
})

app.get('/main', function (req, res) {
  res.render('menuTeacher')
})

app.listen(port, function () {
  console.log('Node js Express js Tutorial at port', port)
})