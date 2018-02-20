let express = require('express');
let router = express.Router();

let orderCtrl= require('../controller/orderCtrl');
let userCtrl= require('../controller/userCtrl');
// get request  that will getAllOrders

router.get('/',userCtrl.tokenVerification,orderCtrl.getAllOrders);

// post request that will create a new order

router.post('/',userCtrl.tokenVerification,orderCtrl.createOrder);

// delete request that will delete an order

router.delete('/:id',userCtrl.tokenVerification,orderCtrl.deleteOrder);

// post request  that will declare a lack in the store

router.post('/lack',userCtrl.tokenVerification,orderCtrl.declareLack);

// post request  that will launch all undone orders

router.post('/launch',userCtrl.tokenVerification,orderCtrl.launchOrder);


/*// post request  that will launch an undone order

router.post('/launch/:id',userCtrl.tokenVerification,orderCtrl.launchSingleOrder);*/



module.exports = router;