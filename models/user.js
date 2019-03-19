

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  
  username: {
    type: String
  },
  password: {
    type: String
  },
  ID: {
    type: String
  },
  name: {
    type: String
  },
  surname: {
    type: String
  },
  faculty: {
    type: String
  },
  branch: {
    type: String
  },
  year: {
    type: String
  },
  course: {
    type: String
  },
  group: {
    type: String
  },
  userType: {
    type: String
  },
  position: {
    type: String
  },
},{
    collection: 'users'
});

module.exports = mongoose.model('User', User);