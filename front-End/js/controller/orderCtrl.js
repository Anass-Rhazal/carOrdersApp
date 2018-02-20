var app= angular.module('orderApp.orderCtrl',[]);

app.controller('orderCtrl', ['$scope','$rootScope','orderService',
function ($scope,$rootScope,orderService)  {
	

// list of  undone orders
	$rootScope.orders=[];

// this will create our list of undone object	
$scope.createUndoneOrders = () => {

		  
		  //alert message
		swal({
			title: "Are you sure?",
			text: "Careful now!",
			icon: "warning",
			buttons: true
		})
		.then((okClicked) => {
			console.log(okClicked);
			if (okClicked) {
				 // check if selected number of wheel is not null 
			if($scope.nbrWheel != null ) {
				// add an order to our list		
					$rootScope.orders.push({
						carModel:{
							name : $rootScope.carModel.name,
							year : $rootScope.carModel.year
							},
						type : "wheel" ,
						amount : $scope.nbrWheel,
						done : false
					});
			
					$scope.nbrWheel=null;
				}
			 // check if selected number of seat is not null 
				if( $scope.nbrSeat != null ) {
			// add an order to our list	
					$rootScope.orders.push({
						carModel:{
							name : $rootScope.carModel.name,
							year : $rootScope.carModel.year
							},
						type : "seat" ,
						amount : $scope.nbrSeat,
						done : false
					});
			
					$scope.nbrSeat=null;
			
				}
			 // check if  selected number of mirror is not null 
				if($scope.nbrMirror != null ) {
			// add an order to our list	
					$rootScope.orders.push({
						carModel:{
							name : $rootScope.carModel.name,
							year : $rootScope.carModel.year
							},
						type : "mirror" ,
						amount : $scope.nbrMirror,
						done : false
					});
			
					$scope.nbrMirror=null;
			
				}
			
				console.log($rootScope.orders);
			} 
		});
	


}

// clear selectednumbers variable 
$scope.clearNbrOrders = () => {

	$scope.nbrWheel=null;
	$scope.nbrSeat=null;
	$scope.nbrMirror=null;
}

// this will declare a lack
$scope.declareLack = () => {
// check if our list contain a value
if($rootScope.orders.length > 0)  {

	//alert message
		swal({
			title: "Are you sure?",
			text: "Careful now!",
			icon: "warning",
			buttons: true
		})
		.then((okClicked) => {
			console.log(okClicked);
			if (okClicked) {
				orderService.declareLack($rootScope.orders).then((res)=> {
						console.log(res);
				});
			} 
		});

}

}


// this will  get all the orders from the DB 
$scope.getAllOrders = () => {

	orderService.getAllOrders().then((res) => {

			$scope.ords = res.data;
	});

}
 

// this will launch all the orders
$scope.launchOrders = () => {
	
	//alert message
	swal({
		title: "Are you sure?",
		text: "Careful now!",
		icon: "warning",
		buttons: true
	  })
	  .then((okClicked) => {
		  console.log(okClicked);
		if (okClicked) {
			orderService.launchOrder().then((res)=> {
				console.log(res);
			})
		} 
	  });
} 


//  this will delete an order 
$scope.deleteOrder = (idOrder,index) => {

	//alert message
	swal({
		title: "Are you sure?",
		text: "Careful now!",
		icon: "error",
		buttons: true,
		dangerMode: true,
	  })
	  .then((okClicked) => {
		  console.log(okClicked);
		if (okClicked) {
			orderService.deleteOrder(idOrder).then((res)=>{
				$scope.ords.splice(index,1);	
			});
		} 
	  });
	
		


}


}]);