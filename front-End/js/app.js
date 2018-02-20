var app = angular.module('orderApp',['ngRoute','swxSessionStorage','orderApp.orderCtrl','orderApp.carCtrl','orderApp.userCtrl','orderApp.orderService','orderApp.carService','orderApp.userService']);


// constant that will  store the link to the api
app.constant('LINK', 'http://localhost:5000');


// middleware to add token to the header of a request
app.config(['$httpProvider',function ($httpProvider) {

    $httpProvider.interceptors.push(['$sessionStorage', function ( $sessionStorage) {
        return {
            'request':  (config) => {
                
                config.headers = config.headers || {};
                if ($sessionStorage.get("token")) {
                    config.headers.Authorization = 'Bearer ' + $sessionStorage.get("token");
                }
                return config;
            }
        };
     }]);

}]);