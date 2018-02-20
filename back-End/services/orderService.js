// get order model
let order=require('../models/orderModel');


// this an object that will contain order crud operation
let orderService ={};


// get all orders from the DB
orderService.getAllOrders =   (callback) =>{

    order.find((err,orders)=>{
        if(err) throw err;
        callback(orders);
    });

};

// get order by id
orderService.getOrderById = (orderId,callback) => {

    order.findById(orderId,(err,order)=>{
        if(err) throw err;
        callback(order);
    });

};

// create a new order

orderService.addOrder = (newOrder,callback) => {

    order.create(newOrder,(err,order) => {
        if(err) throw err;
        callback(order);
    });
};

// update order info

orderService.updateOrder = (orderId,orderData,callback) => {

    order.findByIdAndUpdate(orderId,orderData,{ new: true },(err,order) => {
        if(err) throw err;
        callback(order);
    });
};

//  delete order by Id from DB
orderService.deleteOrder = (orderId,callback) => {

    order.findByIdAndRemove(orderId,(err,order) => {
        if(err) throw err;
        callback(order);
    });
};


//  get  undone orders ( where 'done' field is false )
orderService.undoneOrders = (callback) => {

    order.find({done : false},(err,orders) => {
        if(err) throw err;
        callback(orders);
    });
};

//  update an order  ( set  'done' field to true )
orderService.makeOrderDone = (orderId,callback) => {

    order.findOneAndUpdate({_id : orderId}, {$set:{done:true}}, {new: true},(err,order) => {
        if(err) throw err;
        callback(order);
    });
};


module.exports =  orderService;