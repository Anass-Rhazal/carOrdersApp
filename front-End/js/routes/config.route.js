// var app = angular.module("orderApp.routes", ["ngRoute"]);
app.config( function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "js/templates/login.html",
        controller: "userCtrl"
    })
    .when("/car", {
        templateUrl : "js/templates/car.html",
        controller: "orderCtrl",
        resolve:{
            "checkIsLogged":($location,$sessionStorage) => { 
                    // get the user info
                let loggedUser=$sessionStorage.get("loggedUser");
                // check the user is logged
                if( loggedUser == null ){ 
                         $location.path('/');    //redirect user to login page.         
                }
            }
        }
    })
    .when("/admin", {
        templateUrl : "js/templates/admin.html",
        controller: "orderCtrl",
        resolve:{
            "checkIsLoggedAndIsAdmin": ($location,$sessionStorage) => {
                // get user info    
                let loggedUser=$sessionStorage.get("loggedUser");
                // check if the user is logged
                if( loggedUser != null ){ 
                    // check if the user is an admin
                    if(!loggedUser.admin)  
                         $location.path('/');    //redirect user to login page.         
                }else{
                         $location.path('/');    //redirect user to login page.
                
                }
            }
        }
    })
    .otherwise({
        redirectTo:'/'
    });
});