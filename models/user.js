

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  
  username: {
    type: string
  },
  password: {
    type: string
  },
  ID: {
    type: string
  },
  name: {
    type: string
  },
  surname: {
    type: string
  },
  faculty: {
    type: string
  },
  branch: {
    type: string
  },
  year: {
    type: char
  },
  course: {
    type: string
  },
  group: {
    type: string
  },
  userType: {
    type: string
  },
  position: {
    type: string
  },
},{
    collection: 'users'
});

module.exports = mongoose.model('User', User);