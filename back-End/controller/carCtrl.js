
let carService= require('../services/carService');

let carCtrl={};



// create a car

carCtrl.createCar =   (req,res) => {
    // set our new car
    let newCar = req.body;

    carService.addCar(newCar,(car)=>{
        res.json(car);
    })
};


// get all cars from DB
carCtrl.getAllCars = (req,res) => {

    carService.getAllCars((cars) => {res.json(cars)});
};

module.exports= carCtrl;

