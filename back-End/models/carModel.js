let mongoose = require('mongoose');

// create car schema
let CarSchema = new mongoose.Schema({
    model :{
        name : String,
        year : Number
    },
    wheel: {
        current :Number,
        min :Number,
        max : Number
    },
    mirror: {
        current :Number,
        min :Number,
        max : Number
    },
    seat: {
        current :Number,
        min :Number,
        max : Number
    },
});
module.exports = mongoose.model('Car', CarSchema);