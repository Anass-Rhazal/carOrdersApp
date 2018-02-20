angular.module('orderApp.orderService',[])

.factory('orderService', ['$http','LINK', function  ($http,LINK){
			
		var order={};
		

order.getAllOrders=  () => {

     return  $http.get(LINK+'/order/');

}



order.addOrder=  (o) => {

     return  $http.post(LINK+'/order/',o);

}

order.deleteOrder=  (idOrder) => {

	return  $http.delete(LINK+'/order/'+idOrder);

}


order.declareLack=  (orders) => {

     return  $http.post(LINK+'/order/lack',orders);

}


order.launchOrder=  () => {

     return  $http.post(LINK+'/order/launch',{});

}


		return order;	

}])