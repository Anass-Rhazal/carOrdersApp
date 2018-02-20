angular.module('orderApp.carService',[])

.factory('carService', ['$http','LINK', function ($http,LINK) {
			
		var car={};
		
		

			car.getAllCars=  () => {
				
			     return  $http.get(LINK+'/car/');

			}


			

			car.addCar=  (c) => {

			     return  $http.post(LINK+'/car/',c);

			}


	

		return car;	

}])