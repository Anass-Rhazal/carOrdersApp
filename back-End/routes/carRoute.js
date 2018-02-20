let express = require('express');
let router = express.Router();

let carCtrl= require('../controller/carCtrl');
let userCtrl= require('../controller/userCtrl');
// get request  that will getAllCars

router.get('/',userCtrl.tokenVerification,carCtrl.getAllCars);

// post request that will create a new car

router.post('/',userCtrl.tokenVerification,carCtrl.createCar);

module.exports = router;