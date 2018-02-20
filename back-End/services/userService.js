// get user model
let user=require('../models/userModel');


// this an object that will contain user crud operation
let userService ={};


// get all users from the DB
userService.getAllUsers =   (callback) =>{

    user.find((err,users)=>{
        if(err) throw err;
        callback(users);
    });

};

// get user by id
userService.getUserById = (userId,callback) => {

    user.findById(userId,(err,user)=>{
        if(err) throw err;
        callback(user);
    });

};

// get user by email
userService.getUserByEmail = (userEmail,callback) => {

    user.findOne({ email : userEmail},(err,user)=>{
        if(err) throw err;
        callback(user);
    });

};


// create a new user

userService.addUser = (newUser,callback) => {

    user.create(newUser,(err,user) => {
        if(err) throw err;
        callback(user);
    });
};

// update user info

userService.updateUser = (userId,userData,callback) => {

    user.findByIdAndUpdate(userId,userData,{ new: true },(err,user) => {
        if(err) throw err;
        callback(user);
    });
};

//  delete user by Id from DB
userService.deleteUser = (userId,callback) => {

    user.findByIdAndRemove(userId,(err,user) => {
        if(err) throw err;
        callback(user);
    });
};


module.exports =  userService;