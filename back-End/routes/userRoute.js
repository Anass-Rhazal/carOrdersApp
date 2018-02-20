let express = require('express');
let router = express.Router();

//  get services

let userCtrl=require('../controller/userCtrl');

//  get request that will get all users and send him on json form

router.get('/',userCtrl.tokenVerification,userCtrl.getAllUsers);


//  get request that will get user  by and send him on json form

router.get('/:id',userCtrl.tokenVerification,userCtrl.getUserById);


// post request that will create a new user in DB

router.post('/',userCtrl.addUser);


// put request that will update info  of existed user in DB

router.put('/:id',userCtrl.tokenVerification,userCtrl.updateUser);


// delete request that will remove  a  user   from DB

router.delete('/:id',userCtrl.tokenVerification,userCtrl.deleteUser);

// post request for user login

router.post('/login',userCtrl.login);

module.exports = router;