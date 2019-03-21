var express = require('express');
var router = express.Router();
const Teacher = require('../models/modelTeacher')



router.route('/').get(function(req, res){
    Teacher.find({uType : 'teacher'} , function (err , person) {
        if(err) {
            console.log(err)
        }else {
            res.render('teacherManage' , {person , person})
        }
    })
})

router.route('/addTeacher').get(function (req, res) {
    res.render('addTeacher')
})
router.route('/addStaff').get(function (req, res) {
    res.render('addStaff')
})

router.route('/addTeacher').get(function (req, res) {
    res.render('addTeacher')
})

router.route('/post').post(function (req, res) {
    const teacher = new Teacher(req.body)
    teacher.uType = "teacher"
    console.log(teacher)
    teacher.save().then(teacher => { res.redirect('/manage/teacher') }).catch(err => { res.status(400).send("unable to save to database") })
})

router.route('/edit/:id').get(function (req, res) {
    const id = req.params.id;
    Teacher.findById(id, function (err, person) {
        res.render('editTeacher', { person: person })
    })
})

router.route('/update/:id').post(function (req, res) {
    Teacher.findById(req.params.id, function (err, person) {
        if (!person)
            return next(new Error('Could not load Document'))
        else {
            // do your updates here
            person.username = req.body.username
            person.password = req.body.password
            person.prefixName = req.body.prefixName
            person.firstName = req.body.firstName
            person.lastName = req.body.lastName
            person.faculty = req.body.faculty
            person.major = req.body.major
            person.position = req.body.position
            

            person.save().then(person => {
                res.redirect('/manage/Teacher')
            })
                .catch(err => {
                    res.status(400).send("unable to update the database")
                })
        }
    })
})

router.route('/delete/:id').get(function (req, res) {
    Teacher.findByIdAndRemove({ _id: req.params.id },
        function (err, person) {
            if (!person) res.json(person)
            else res.redirect('/manage/Teacher')
        })
})






module.exports = router ;