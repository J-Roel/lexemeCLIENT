'use strict';
var app = angular.module("LexemeApp");

//Setup our app's main controller (also takes care of our home view) -------------------------
app.controller( 'DashboardCtrl', ['$scope', DashboardCtrl]);

function DashboardCtrl($scope){


	//vm for "this" view model
		var vm = this;




	//DEFINE CONTROLLER VARIABLES
	//============================================

		



	//FUNCTION DECLARATIONS
	//============================================
		vm.selectIt = selectIt;
		vm.partialId = "projects";//default partial to load in dashboard
		vm.getPartialUrl = getPartialUrl;





	//CONTROLLER INITIALIZATION FUNCTIONS
	//============================================
		//Check to see if we are logged in... if not go back to login page






	//CONTROLLER FUNCTIONS
	//============================================
			

		//
		function selectIt($event) {
			event.stopPropagation();
			var children = $('#sidebar-menu').children();
			vm.partialId = $event.currentTarget.id;

			//Remove class from all children
			$("#sidebar-menu>div.menu-item-selected").removeClass("menu-item-selected");
        	

        	for(var i = 0; i <= children.length-1; i++){

        		if( $(children[i]).attr('id') === vm.partialId){        			
        			if( $(children[i]).has('.menu-item-selected') )
        			{
        				//remove existing class and div
        				$(children[i]).removeClass('menu-item-selected');
        				$('.menu-selected').remove();
        			}
        		}
        	}//End for loop

        	//Add class and div to selected item
			$($event.currentTarget).addClass('menu-item-selected');
			$($event.currentTarget).append('<div class="menu-selected"></div>');

			//Update to reflect our partial
			getPartialUrl();

        }; //End selectIt function



        //Your menu IDs in sidebar.html should be the exact same as
        //what your file names are in your partials folder for this
        //to work
        //Default is notifications
        function getPartialUrl(){
        		return '../views/partials/' + vm.partialId + '.html';
      	}




}; //END CONTROLLER















/* END OF FILE*/