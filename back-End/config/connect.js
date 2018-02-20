let mongoose = require('mongoose');
let conncetionLink = require('./config.json').link;
// connection to mongoDB
mongoose.connect(conncetionLink);