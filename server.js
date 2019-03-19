const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test123@ds143738.mlab.com:43738/users');

//ID: legendnoz002
//PASSWORD: legendnoz007 


app.use(express.static('public')); // ทุกอย่างใน dir "public" สามารถเรียกใช้ได้เลย
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.post('/login', function (req, res) {
  let username = req.body.Username
  let password = req.body.Password

  User.findOne({ Username: username, Password: password }, function (err, user) {
    if (err) {
      console.log(err)
      return res.status(500).send()
    }
    if (!user) {
      console.log('username or password not match')
      return res.status(404).send()
    }

    return res.redirect('/main1')
  })
})

app.get('/main1', function (req, res) {
  res.render('เมนูอาจารย์')
})

app.get('/f', function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log(err)
    }
    else {
      res.render('จัดการนิสิต', { users: users })//render collection "users"
    }
  })
})
app.get('/g', function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log(err)
    }
    else {
      res.render('จัดการเจ้าหน้าที่', { users: users })//render collection "users"
    }
  })
})
app.get('/c', function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log(err)
    }
    else {
      res.render('จัดการอาจารย์', { users: users })//render collection "users"
    }
  })
})

app.get('/f/create', function (req, res) {
  res.render('create')
})

app.post('/f/post', function (req, res) {
  const user = new User(req.body);
  console.log(user)
  user.save()
    .then(user => {
      res.redirect('/f');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
})








app.get('/f/edit/:id', function (req, res) { //EDIT FOLLOWED BY UPDATE
  const id = req.params.id;
  User.findById(id, function (err, user) {
    res.render('edit', { user: user })
  })
})
app.post('/f/update/:id', function (req, res) { //UPDATE 
  User.findById(req.params.id, function (err, user) {
    if (!user)
      return next(new Error('Could not load Document'))
    else {
      // do your updates here
      user.Username = req.body.Username
      user.Password = req.body.Password
      user.Utype = req.body.Utype

      user.save().then(user => {
        res.redirect('/f')
      })
        .catch(err => {
          res.status(400).send("unable to update the database")
        })
    }
  })
})
app.get('/f/delete/:id', function (req, res) {
  User.findByIdAndRemove({ _id: req.params.id },
    function (err, user) {
      if (err) res.json(err)
      else res.redirect('/f')
    })
})
app.listen(port, function () {
  console.log('Node js Express js Tutorial at port', port)
})