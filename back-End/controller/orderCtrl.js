let orderService= require('../services/orderService');
let carService= require('../services/carService');

let orderCtrl={};

//  this will declare a lack in our store ( need  to make  an order)

orderCtrl.declareLack = (req,res) => {

    // get the parts that we will add  to order
    let orders =  req.body;

      // map orders table and create a promise for each element
    orders.map((order) => {
        return new Promise((resolve) => {

            // add parts to be declared as order
            orderService.addOrder(order,()=>{});
        });
    });
    //  resolve all the promises (this will done with asynchronous way )
    Promise.all(orders).then(() => {
         res.json({orders});
    });



};

// this will launch all undone orders
orderCtrl.launchOrder =  (req,res) => {

orderService.undoneOrders((orders) => {

    // map orders table and create a promise for each element
    orders.map((order) => {
        return new Promise((resolve) => {
             // set car model
            let carModel= order.carModel;

            // find car by model
            carService.getCarByModel(carModel,(car)=>{

                // set type of order => car part
                let orderType = order.type;
                // set the  old current Amount
                let currentAmount=car[orderType].current;
                // set the min  Amount
                let minAmount=car[orderType].min;
                // set the max  Amount
                let maxAmount=car[orderType].max;
                // calculate   the new current  Amount
                let newCurrentAmount= order.amount+currentAmount>= maxAmount ? maxAmount : order.amount+currentAmount;
                //set the data that to update the car
                let carData = {
                    [orderType] : {
                        "current" :  newCurrentAmount  ,
                        "min" : minAmount,
                        "max" : maxAmount
                    }
                };
                // update car By id
                carService.updateCar(car._id,carData,() => {
                    //  make an order done by setting done field to true
                    orderService.makeOrderDone(order._id,() => {});
                });

            });
            resolve();
        });
    });
    //  resolve all the promises (this will done with asynchronous way )
    Promise.all(orders).then(() => {
        res.json({orders});
    });

});

};


// create an order

orderCtrl.createOrder =   (req,res) => {
    // set our new order
    let newOrder = req.body;

    orderService.addOrder(newOrder,(order)=>{
            res.json(order);
    })
};


// get all orders from DB
orderCtrl.getAllOrders = (req,res) => {

    orderService.getAllOrders((orders) => {res.json(orders)});
};

// delete order by id  from DB
orderCtrl.deleteOrder = (req,res) => {

    // get order id from request
    let orderId=req.params.id;

        orderService.deleteOrder(orderId,(order) => {
            console.log(order);
            res.json(order);
        });

};

module.exports =  orderCtrl;