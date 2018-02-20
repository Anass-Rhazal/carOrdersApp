var app= angular.module('orderApp.userCtrl',[]);

app.controller('userCtrl', ['$scope','userService','$sessionStorage','$location',
function ($scope,userService,$sessionStorage,$location)  {
	// var that will take true if there is an error and show a flash message  else there is noting to say
            $scope.flashMessage=false;
     
     // function for sign in      
    $scope.login =  () => {
        
        // get the email and password and store it in object form 
        let loginInfo  = {
            "email": $scope.email,
            "password" :  $scope.password
        }
    // service for login
    userService.login(loginInfo).then((res) => {
        // check if the user have been successfully logged
            if(res.data.user !== undefined) {
                //  store the token in the session
                $sessionStorage.put("token",res.data.token);
                // store the user info in the session
                $sessionStorage.put("loggedUser",res.data.user);
                // check if the user is an admin
                // if not redirect to user page
            if(res.data.user.admin === false ) {
           
                    // alert message
                swal("Good job!", "You clicked the button!", "success")
                .then((okClicked)=>{
                    if(okClicked)
                    // redirection to user page
                            $location.path("/car");

                    });
               
            }
            else  {  
                // alert message
                swal("Good job!", "You clicked the button!", "success")
                .then((okClicked)=>{
                    if(okClicked)
                    // redirection to user page
                            $location.path("/admin");

                    });
      
             
            }
        }
            else  if(res.data.message !== undefined) {
                // set the error message
                $scope.message =  res.data.message;
                // show the message
                $scope.flashMessage=true;
            }
    });

}


}]);