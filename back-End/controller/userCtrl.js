
let bcrypt= require('bcrypt');
let jwt=require('jsonwebtoken');
let config= require('../config/config.json');

//  get services
let userService=require('../services/userService');


let userCtrl = {};

//  get all users and send him on json form

userCtrl.getAllUsers =  (req,res)=>{
            userService.getAllUsers((users) => {
                console.log(users);
                res.json(users);
            });
};


//   get user  by and send him on json form
userCtrl.getUserById = (req,res)=>{

    let userId=req.params.id;
    userService.getUserById(userId,(user) => {

        console.log(user);
        res.json(user);


    });

};


//  create a new user in DB

userCtrl.addUser = (req,res) => {

    let  newUser= req.body;

    // this  will hash user  password and store only the hash in DB
    bcrypt.hash(newUser.password, 10, function(err, hash) {
        if(err) throw  err;
        newUser.password =  hash;

        userService.addUser(newUser,(user) => {

            console.log(user);
            res.json(user);


        });
    });




};


//  update info  of existed user in DB

userCtrl.updateUser  = (req,res) => {

    let  userData= req.body;
    let userId=req.params.id;

    userService.updateUser(userId,userData,(user) => {

        console.log(user);
        res.json(user);


    });

};


//  remove  a  user   from DB

userCtrl.deleteUser = (req,res) => {

    let userId=req.params.id;

    userService.deleteUser(userId,(user) => {
        console.log(user);
        res.json(user);
    });


};

// sign in by email and password

userCtrl.login = (req,res) => {

let userEmail= req.body.email;
let userPassword = req.body.password;


// find the user by email
    userService.getUserByEmail(userEmail, (user) => {

        // check if user is exist
        if(!user) {
            // send flash message  => user not found
            res.json({message : "user not found"});
        }
        else {
            // compare the plain password with the hash
            bcrypt.compare(userPassword, user.password, function(err, results) {

                // Passwords match
                if(results) {


                    // payload for token contain username and email of the user
                    let payload={
                        username:user.username,
                        email:user.email
                    };

                    // get jwt secret key
                    let secretKey=  config.secretKey;
                    // create JWT token using payload that we create before
                    let token = jwt.sign(payload, secretKey, {
                        expiresIn: 15000 // expires in 24 hours
                    });

                    // send user info + token  as response
                     res.json({
                         user:user,
                         token:token
                     });

                }
                // Passwords don't match
                else {
                    //send flash message  => incorrect password
                    res.json({message : "incorrect password"});
                }
            });

        }

    } );


};

// middleware to Verify Token
userCtrl.tokenVerification =  (req,res,next) => {

    // Get auth header value
    let bearerHeader = req.headers['authorization'];

    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        let bearer = bearerHeader.split(' ');
        // Get token from array
        let bearerToken = bearer[1];

       //  verify jwt  token
        jwt.verify(bearerToken, config.secretKey, (err, decodedData) => {
            if(err) {
                res.sendStatus(403);
            } else {
                // Next middleware
                req.decodedData=decodedData;
                next();

            }
        });

    } else {
        // Forbidden
        res.sendStatus(403);
    }

};

module.exports = userCtrl;