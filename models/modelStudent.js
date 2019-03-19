const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    uType: {
        type: String
    },
    studentId: {
        type: Number
    },
    prifixName: {
        type: String
    },
    firstName: {
        type: String
    }, 
    lastName: {
        type: String
    }, 
    faculty: {
        type: String
    }, 
    major: {
        type: String
    }, 
    year: {
        type: Number
    }, 
    branch: {
        type: String
    }, 
    sector: {
        type: Number
    }
}, { collection: 'person' })


module.exports = mongoose.model('modelStudent', User);