'use strict';
var app = angular.module("LexemeApp");

//Setup our app's main controller (also takes care of our home view) -------------------------
app.controller( 'MainCtrl', ['$scope', '$routeParams', 'APIService', MainCtrl]);

function MainCtrl($scope, $routeParams, APICtrl){

	//vm for view model -------------
	

	//define variables
	$scope.loggedIn = false;
  	$scope.changeLoggedIn = function(newVal) {
    	$scope.loggedIn = newVal;
  	};
  	
  	$scope.currentUser = {};
  	$scope.setUser = function(newData) {
  		$scope.currentUser = newData;
  	}
  	$scope.getUser = function(){
  		return $scope.currentUser;
  	}


	//functions
	
};//End Controller







/*END OF FILE*/