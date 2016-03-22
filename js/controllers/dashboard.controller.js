'use strict';
var app = angular.module("LexemeApp");

//Setup our app's main controller (also takes care of our home view) -------------------------
app.controller( 'DashboardCtrl', ['$scope', DashboardCtrl]);

function DashboardCtrl($scope){



	//vm for "this" view model
		var vm = this;




	//DEFINE CONTROLLER VARIABLES
	//============================================
		vm.itemSelected; //our menu item we select in the dashboard


		


	//FUNCTION DECLARATIONS
	//============================================
		vm.selectIt = selectIt;
		vm.getPartialUrl = getPartialUrl;





	//CONTROLLER INITIALIZATION FUNCTIONS
	//============================================
		





	//CONTROLLER FUNCTIONS
	//============================================
			


		function selectIt($event) {
		
			event.stopPropagation();
			var children = $('#sidebar-menu').children();
			vm.itemSelected = $event.currentTarget.id;

			//Remove class from all children
			$("#sidebar-menu>div.menu-item-selected").removeClass("menu-item-selected");
        	

        	for(var i = 0; i <= children.length-1; i++){

        		if( $(children[i]).attr('id') === vm.itemSelected){        			
        			if( $(children[i]).has('.menu-item-selected') )
        			{
        				//remove existing class and div
        				console.log($(children[i]));
        				$(children[i]).removeClass('menu-item-selected');
        				$('.menu-selected').remove();
        			}
        		}
        	}//End for loop

        	//Add class and div to selected item
			$($event.currentTarget).addClass('menu-item-selected');
			$($event.currentTarget).append('<div class="menu-selected"></div>');




        }; //End selectIt function



        function getPartialUrl(){
        	//'../views/partials/topbar'
        	return "'../views/partials/" + vm.itemSelected + ".html'";
      }



		}



}; //END CONTROLLER






app.directive("hideMe", function($animate) {
    return function(scope, element, attrs) {
        scope.$watch(attrs.hideMe, function(newVal) {
            if (newVal) {
                $animate.addClass(element, "menu-item-selected")
            } else {
                $animate.removeClass(element, "menu-item-selected")
            }
        })
    }
})




















/* END OF FILE*/