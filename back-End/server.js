/***************/
// get the packages
/***************/
let express = require('express');
let app = express();
let morgan  = require('morgan');
let bodyParser = require('body-parser');

let mongoose= require('./config/connect');//  mongoose  connection

let homeRoute=require('./routes/homeRoute');
let userRoute=require('./routes/userRoute');
let orderRoute=require('./routes/orderRoute');
let carRoute=require('./routes/carRoute');

/***************/
// Configuration
/***************/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev')); // this used to log requests to the console

// this allow external  request
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    next();
});

/***************/
// routes
/***************/

// configuration all  routes
app.use('/',homeRoute);
app.use('/user',userRoute);
app.use('/order',orderRoute);
app.use('/car',carRoute);

// start the  server on port => 5000

let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`connected to http://localhost:${port}`);
});
