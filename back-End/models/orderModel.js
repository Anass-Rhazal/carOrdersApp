let mongoose = require('mongoose');

// create order schema
let orderSchema = new mongoose.Schema({
        carModel:{
            name : String,
            year : Number
                },
        type : String ,
        amount : Number,
        done : Boolean

});
module.exports = mongoose.model('Order', orderSchema);