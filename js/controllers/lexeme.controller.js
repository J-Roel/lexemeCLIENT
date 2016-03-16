'use strict';
var app = angular.module("LexemeApp");


//--------------------------------------------------
//Setup our app's main controller
//--------------------------------------------------
app.controller( 'MainCtrl', ['$scope', '$rootScope', '$window', MainCtrl]);

function MainCtrl($scope, $rootScope, $window){

	var vm = this;


	//define variables
	//============================================


		//This is to determine a user is logged in
		//Default is set to false
		if($window.sessionStorage.token){
      		$rootScope.loggedIn = true;
      		return true;
    	}else{
    		$rootScope.loggedIn = false;
    		return false;
    	}

	
};//End Controller







/*END OF FILE*/