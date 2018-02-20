let express = require('express');
let router = express.Router();


// this will send you to home page

router.get('/',(req,res)=>{

    res.send('welcome to my login app');

});

module.exports = router;