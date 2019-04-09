var express = require('express');
var router = express.Router();
const Year = require('../models/modelYear')



router.route('/').get(function(req, res){
    Year.find({}, function (err , year) {
        if(err) {
            console.log(err)
        }else {
            res.render('yearManage' , {year , year})
        }
    })
})

router.route('/addYear').get(function (req, res) {
    res.render('addYear')
})

router.route('/post').post(function (req, res) {
    const year = new Year(req.body)
    year.save().then(course => { 
        res.redirect('/manage/year') 
    }).catch(err => { 
        res.status(400).send("unable to save to database") 
    })
})

router.route('/edit/:id').get(function (req, res) {
    const id = req.params.id;
    Year.findById(id, function (err, year) {
        res.render('editYear', { year: year })
    })
})

router.route('/update/:id').post(function (req, res) {
    Year.findById(req.params.id, function (err, year) {
        if (!year)
            return next(new Error('Could not load Document'))
        else {
            // do your updates here
            year.year = req.body.year
            year.semester = req.body.semester
            year.save().then(year => {
                res.redirect('/manage/year')
            })
                .catch(err => {
                    res.status(400).send("unable to update the database")
                })
        }
    })
})

router.route('/delete/:id').get(function (req, res) {
    Year.findByIdAndRemove({ _id: req.params.id },
        function (err, year) {
            if (!year) res.json(year)
            else res.redirect('/manage/year')
        })
})






module.exports = router ;