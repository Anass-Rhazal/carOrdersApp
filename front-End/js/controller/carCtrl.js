var app= angular.module('orderApp.carCtrl',[]);

app.controller('carCtrl', ['$scope','$rootScope','carService',  function($scope,$rootScope,carService)  {
	

 // load car model
$scope.loadCarModel = (carModel) => {

		$rootScope.carModel=carModel;

}
 

// get all  cars from the DB
$scope.getAllCars = () => {

		carService.getAllCars().then((res)=>{

				console.log(res);
				$scope.cars=res.data;

		});

}
 



}]);