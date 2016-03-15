'use strict';
var app = angular.module("LexemeApp");

//Setup our app's main controller (also takes care of our home view) -------------------------
app.controller( 'MainCtrl', ['$scope', '$routeParams', 'APIService', MainCtrl]);

function MainCtrl($scope, $routeParams, APICtrl){

	//vm for view model -------------
	var vm = this;

	//define variables
	$scope.loggedIn = false;
	

	//functions
	
};//End Controller







/*END OF FILE*/