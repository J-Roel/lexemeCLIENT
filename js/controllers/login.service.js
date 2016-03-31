'use strict';
var app = angular.module('LexemeApp');


//--------------------------------------------------
//LOGIN SERVICE
//--------------------------------------------------
//Has functions that call the API and authenticate a
//user. Also takes care of the logout on the client
// - There is a test function that can be assigned to a button
//to test the API to ensure the user is infact being
//handled correctly.
app.service('APILogin', ['$rootScope', '$http', '$location', '$window', APILogin]);

function APILogin($rootScope, $http, $location, $window) {
	return{



	  	//Checks to see if we have a token in our session storage
	  	//and changes the loggedIn variable to use in the
	  	//html to show/hide elements
	  	// - this is a helper function; not necessary, but it is the same
	  	//used in the main controller.
	  	//kept it incase we ever need to check if user is still logged in
	    isLoggedIn : function (){
	    	if($window.sessionStorage.token){
	      		$rootScope.loggedIn = true;
	      		return true;
	    	}else{
	    		$rootScope.loggedIn = false;
	    		return false;
	    	}
	    },//END isLoggedIn



		//SUBMIT TO OUR API
		submit : function (user) {

			//validate user input if needed
			

			//Call our server to authenticate and get token
			$http.post('//mysterious-bastion-48043.herokuapp.com/auth', user)
	  		.success(function (data, status, headers, config) {
	  			
	  			if(data !== 'err'){

	  				//console.log('Data from server: ', data);

	  				//We return from our server:
	  				//	-	token for authentication
	    			$window.sessionStorage.token = data.token;
	    			

	    			//Set our rootScope variable so we an show/hide
	    			//the correct elements based on whether the user
	    			//is logged in or out
	    			$rootScope.loggedIn = true;


	    			//redirect to dashboard
					$location.path('/dashboard');


	    		} else {

	    			console.log('ERROR LOGGING IN', data);

	    		}

	  		})
	  		.error(function (data, status, headers, config) {
	    
		        // Erase the token if the user fails to log in
		        delete $window.sessionStorage.token;

		        // Handle login errors here
		        

	  		});

		},//END SUBMIT




		//LOGOUT
		//clear user's browser cookies
		logout : function () {

    		delete $window.sessionStorage.token;
    		delete $window.sessionStorage.user;

    		//Set our rootScope variable so we an show/hide
	    	//the correct elements
	    	$rootScope.loggedIn = false;

	    	$location.path('/');

  		}, //END LOGOUT




		//CALL RESTRICTED - Test function to ensure user is being handled
		//correctly.
		//When this is called it access a the API on a protected route
		//and returns some data... in this case it should return foo
		// callRestricted : function(){

		// 	$http({url: '//mysterious-bastion-48043.herokuapp.com/auth/restricted', method: 'GET'})
		// 	.success(function (data, status, headers, config) {
		// 		console.log(data.name); // Should log 'foo'
		// 	})

  // 		},//END CALL RESTRICTED




  		//GET TOKEN FOR USER FROM LOCAL STORAGE
  		//Helper function
  		getToken : function() {
  			return $window.localStorage['jwtToken'];
		},//END getToken




		//CHECK TO SEE IF USER IS AUTHENTICATED
		isAuthed : function() {
  			var token = self.getToken();
		  if(token) {
		    var params = self.parseJwt(token);
		    return Math.round(new Date().getTime() / 1000) <= params.exp;
		  } else {
		    return false;
		  }
		}//END isAuthed



	}//End RETURN

};//END SERVICE





//--------------------------------------------------
//AUTHENTICATION INTERCEPTOR SERVICE
//--------------------------------------------------
//This factory catches and sends the authentication token
//to and from the api.
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