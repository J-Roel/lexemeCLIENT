'use strict';
var app = angular.module("LexemeApp");

//Setup our app's main controller (also takes care of our home view) -------------------------
app.controller( 'DashboardCtrl', ['$scope', '$window', 'APIService', 'APILogin', DashboardCtrl]);

function DashboardCtrl($scope, $window, APIService, APILogin){

	//vm for view model
		var vm = this;

	

	//define variables
	//============================================
		//Current User variables to use in HTML
		vm.user = $window.sessionStorage.profile;



	//function declarations
	//============================================





	//CONTROLLER INITIALIZATION FUNCTIONS
	//============================================
		//When controller loads, we check if there is a 
		//profile session in the local storage
		APILogin.isLoggedIn();





	//CONTROLLER FUNCTIONS
	//============================================









//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
};//End Controller







/*END OF FILE*/