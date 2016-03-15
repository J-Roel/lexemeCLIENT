'use strict';
  
var app = angular.module('LexemeApp');
  
app.controller('LoginController', ['$scope', '$http', '$location', '$window', LoginController]);

function LoginController($scope, $http, $location, $window) {

		var vm = this;

		//vm.user = {username: 'john', password: 'password'};
		

		//SUBMIT TO OUR API
		vm.submit = function (user) {

			//validate user input if needed


			//Call our server to get token
			$http.post('http://localhost:3000/users/authenticate', user)
	  		.success(function (data, status, headers, config) {
	  			
	  			if(data !== 'err'){

	  			

	  				console.log('Data from server: ', data);
	    			$window.sessionStorage.token = data.token;
	    			vm.message = 'Welcome';
	    		
	    			$scope.changeLoggedIn(true);
	    		
	    			$location.path('/dashboard');
	    		} else {

	    			console.log('ERROR LOGGING IN', data);


	    		}

	  		})
	  		.error(function (data, status, headers, config) {
	    
		        // Erase the token if the user fails to log in
		        delete $window.sessionStorage.token;

		        // Handle login errors here
		        vm.message = 'Error: Invalid user or password';
	  		});

		};//END SUBMIT


		//LOGOUT
		vm.logout = function () {
			console.log("User has logged out");
			$scope.changeLoggedIn(false);
    		delete $window.sessionStorage.token;

    		//redirect to home page
    		$location.path('/');

  		}; //END LOGOUT



		//CALL RESTRICTED 
		vm.callRestricted = function(){

			$http({url: 'http://localhost:3000/users/restricted', method: 'GET'})
			.success(function (data, status, headers, config) {
				console.log(data.name); // Should log 'foo'
			})

  		};//END CALL RESTRICTED



};//END CONTROLLER





app.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
        console.log('User is not authenticated');
      }
      return response || $q.when(response);
    }
  };
});

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});




















//END OF FILE