let mongoose = require('mongoose');

// create user schema
let UserSchema = new mongoose.Schema({
    username: String,
    email:String,
    password: String,
    admin : Boolean,
  //  img:{ data: Buffer, contentType: String } // used to upload profile img to the DB

});
module.exports = mongoose.model('User', UserSchema);