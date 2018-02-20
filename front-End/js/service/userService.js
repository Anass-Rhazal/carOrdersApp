angular.module('orderApp.userService',[])

.factory('userService', ['$http','LINK', function ($http,LINK)  {
			
		var user={};
		
		
			
			user.login=  (loginInfo) => {

			     return  $http.post(LINK+'/user/login',loginInfo);

			}


	

		return user;	

}])