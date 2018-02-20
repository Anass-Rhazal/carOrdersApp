// get car model
let car=require('../models/carModel');


// this an object that will contain car crud operation
let carService ={};


// get all cars from the DB
carService.getAllCars =   (callback) =>{

    car.find((err,cars)=>{
        if(err) throw err;
        callback(cars);
    });

};

// get car by id
carService.getCarById = (carId,callback) => {

    car.findById(carId,(err,car)=>{
        if(err) throw err;
        callback(car);
    });

};

// get car by id
carService.getCarByModel = (carModel,callback) => {

    car.findOne({model : carModel},(err,car)=>{
        if(err) throw err;
        callback(car);
    });

};

// create a new car

carService.addCar = (newCar,callback) => {

    car.create(newCar,(err,car) => {
        if(err) throw err;
        callback(car);
    });
};

// update by id car info

carService.updateCar = (carId,carData,callback) => {

    car.findByIdAndUpdate(carId,carData,{ new: true },(err,car) => {
        if(err) throw err;
        callback(car);
    });
};

// update by car Model car info

carService.updateCarByModel = (carModel,carData,callback) => {


    car.findOneAndUpdate({model : carModel },{$set:carData},{ new: true },(err,car) => {
        if(err) throw err;
        callback(car);
    });
};

//  delete car by Id from DB
carService.deleteCar = (carId,callback) => {

    car.findByIdAndRemove(carId,(err,car) => {
        if(err) throw err;
        callback(car);
    });
};


module.exports =  carService;