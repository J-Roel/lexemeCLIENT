'use strict';
var app = angular.module("LexemeApp");

//Setup our app's main controller (also takes care of our home view) -------------------------
app.controller( 'WorkspaceCtrl', ['$scope', '$routeParams', WorkspaceCtrl]);

function WorkspaceCtrl($scope, $routeParams){


	//vm for "this" view model
		var vm = this;




	//DEFINE CONTROLLER VARIABLES
	//============================================

		



	//FUNCTION DECLARATIONS
	//============================================
		vm.check = check;
		
		





	//CONTROLLER INITIALIZATION FUNCTIONS
	//============================================
		//Check to see if we are logged in... if not go back to login page
		





	//CONTROLLER FUNCTIONS
	//============================================
			function check(){
				var htmlCode = $('#draw').html();
				alert(htmlCode);
			}

		






//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}; //END CONTROLLER















/* END OF FILE*/