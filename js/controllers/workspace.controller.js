'use strict';
var app = angular.module("LexemeApp");

//Setup our app's main controller (also takes care of our home view) -------------------------
app.controller( 'WorkspaceCtrl', ['$scope', '$routeParams', '$location', 'APIService', WorkspaceCtrl]);

function WorkspaceCtrl($scope, $routeParams, $location, APIService){


	//vm for "this" view model
		var vm = this;
 
	//DEFINE CONTROLLER VARIABLES
	//============================================
    vm.currentProject;
		vm.selected;
    vm.tool = "pointer";
    

    vm.red = "20";
    vm.green = "20";
    vm.blue = "20";
    vm.alpha = "0.7";
    vm.curColor = "rgba(" + vm.red + "," + vm.green + "," + vm.blue + "," + vm.alpha + ")";

    vm.fontSize;
    vm.fontFamily;
    vm.zIndex;


	//FUNCTION DECLARATIONS
	//============================================
		vm.check = check; //Testing funciton to see html code from #desktop
	  vm.saveProject = saveProject;
    vm.goToDashboard = goToDashboard;
    vm.clearDesktop = clearDesktop;
    vm.addText = addText;
    vm.applyFont = applyFont;
    vm.applyZIndex = applyZIndex;


	//CONTROLLER INITIALIZATION FUNCTIONS
	//============================================
      //GET A PROJECT--------------------------------
        if($routeParams.id){//Make sure we have an id from our route
            var id = $routeParams.id; //set our id from our route
            //Make call to our APIService which talks to our user
            var stuff = '';
            APIService.callAPI('getProject', stuff, id).then(function(response){
                if(response){
                    vm.currentProject = response.data;

                    $('#desktop').append(vm.currentProject[0].project_html);
                    
                    $('#desktop').children().draggable({
                            snap: true,
                            containment: "parent",
                            //start: function(ev, ui) {},
                            //drag: function(ev, ui) {}
                    })
                    $('#desktop').children().resizable();
                    $('#desktop').children().resizable("destroy");
                    $('#desktop').children().resizable({ 
                      handles: "n, e, s, w"
                    });

                } else {
                    console.error('Did not get a project!');
                    $location.path('/');
                }
            });//End promise
     
        } else {
     
          console.log("No Project Found, returning to dashboard");
          $location.path("/dashboard");
     
        }
        

        //--------------------
        //Add Text
        function addText(){
            $('.is-selected').find('p').remove();
            var txt = $('.little-text-box').find('input').val();
            console.log("TEXT: ", txt)
            $('little-text-box').find('input').val('');
            $('.little-text-box').css('visibility', 'hidden');
            $('.is-selected').append('<p>'+ txt + '</p>');
            vm.tool = 'pointer';
        }
        function applyFont(){
           $('.is-selected').find('p').css('font-family', vm.fontFamily);
           $('.is-selected').find('p').css('font-size', vm.fontSize + "px");
        }
        function applyZIndex(){
           $('.is-selected').css('z-index', vm.zIndex);
        }

        //----------------------------------------------------------------
        //HANDLES CLICKING OF OUR BOXES
        $("#desktop").on("click", ".box", function(){

            switch(vm.tool)
            {
              
              case 'pointer' :
                  $('#desktop').children().removeClass('is-selected');
                  $(this).addClass("is-selected");
              break;
              
              case 'paint' :
                    var color = $('.color-selector').css("background-color");
                    $(this).css('background-color', color);
                    vm.tool='pointer';
                  
              break;
              case 'paint-text':
                    var color = $('.color-selector').css("background-color");
                    $(this).css('color', color);
                    vm.tool='pointer';
              break;
              case 'text' :
                  $('#desktop').children().removeClass('is-selected');
                  $(this).addClass("is-selected");
                      var elTop = $(this).css('top');
                      var elLeft = $(this).css('left');
                      $('.little-text-box').css('visibility', 'visible');
                      $('.little-text-box').css('top', elTop);
                      $('.little-text-box').css('left', elLeft);
                      vm.tool='pointer';
              break;

              case 'delete' :
                $(this).remove();
                vm.tool='pointer';
              break;

            }

        

        });

        
        
              








	//CONTROLLER FUNCTIONS
	//============================================

      function setColor(color){
        if(color || color !== ""){
            vm.selected.css('background-color', color);
        }
      }


      //Save project to API
      function saveProject(projectId){
            console.log("Project to update: ", projectId);

            var children = $('#desktop').children();
            if(children > 0){
                for(var i = 0; i <= children.length(); i++){
                    children[i].draggable("destroy");
                    children[i].resizable("destroy");
                }
            }

            var htmlCode = $('#desktop').html();
            var updateHTML = "'"+ htmlCode + "'";

            var projectInfo = {
                id: projectId,
                project_html: htmlCode
            }


            APIService.callAPI('updateProject', projectInfo, projectId).then(function(response){
                if(response){
                    vm.currentProject = response.data;
                } else {
                    console.error('Did not get a project!');
                }
            });//End promise
      };

			//Test function to see HTML code inside #desktop
			function check(){
				var htmlCode = $('#desktop').html();
				alert(htmlCode);
			};

      function goToDashboard(){
        $location.path("/dashboard");
      }

      function clearDesktop(){
        $('#desktop').html("");
      }

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}; //END CONTROLLER





//MOUSE POSITION TRACKER
//THIS BINDS OUR MOUSE MOVEMENT FROM THE DESKTOP AREA
//TO THE COORDS LOCATED ON THE DESKTOP AREA
app.directive('jrTrackMouse', function() {
  return {
      //-------------------------------------------
      //Setup our directive
      restrict: 'A',
      controller: ['$scope', function($scope) {
      		var vm = this;
      		vm.myX;
      		vm.myY;
      }],
      link: function(scope, element, attrs){    	
    	element.bind('mousemove', function(e){
    		scope.$apply(function(){
    			scope.myX = e.pageX;
    			scope.myY = e.pageY;
    		});
        });
      }//end of link function
	}//end of return
})//end of directive





//=============================================================
//BOX

app.directive('jrMakeBoxButton', function($compile) {
    return {
        template: "<i ng-click='addBox();' class='fa fa-square inset fa-2x icon'></i>",
        link: function(scope, element, attr) {
            scope.addBox = function() {
                var el = $compile('<div class="box"></div>')(scope);
				
				//Setup resizable
				el.resizable({handles: "n, e, s, w"});

				//Setup draggable
				el.draggable({
					snap: true,
					containment: "parent",
					//start: function(ev, ui) {},
					//drag: function(ev, ui) {}
				});

                $('#desktop').append(el);
                el.css({top: 200, left: 200, position:'absolute'});
                
            }
        }
    };
});


app.directive('jrDesktop', function(){
  return {
    restrict: 'A',
    controller: ['$scope', function($scope) {
          var vm = this;

        }],

    link: function(scope, elem, attrs){
        
        elem.bind('click', function(){
            console.log(attrs);
        });    

    }
  }
});


app.directive('jrMenu', function(){
	return {
		restrict: 'A',
		controller: ['$scope', function($scope) {
      		var vm = this;

      	}],
      	// scope: {},

		templateUrl: "", 


		link: function(scope, elem, attrs){
			elem.on('mouseenter', function(){
  				scope.showMenu = true;

  			});
  			elem.on('mouseleave', function(){
  				scope.showMenu = false;
  			});


  			//All of our menu options
  			scope.addText = function(){
  				$(elem).find('p').remove(); //Remove all p's
  				var elText = prompt("What Text do you want to add?");
  				var el = angular.element("<p>"+ elText + "</p>");
  				elem.append(el);

  			};

  			scope.changeColor = function(){
  				console.log("Change Color");
  				var elColor = prompt("What Color do you want?");
  				elem.css("color", elColor);

  			};

  			scope.changeBackColor = function(){
  				console.log("Change Background Color");
  				var elColor = prompt("What Color do you want?");
  				elem.css("background-color", elColor);

  			};


  			scope.changeBorder = function(){
  				var elBorder = prompt("Set a border: ie: 1px solid #000;");
  				elem.css("border", elBorder);
  				
  			};

  			scope.removeElement = function(){
  				console.log("Remove Element");
  				elem.remove();
  			}


		}
	}


});


app.directive('jrText', function(){
	return {
		restrict: "A",
     	template: "<div ng-show='showText'><input ng-model='myText' type='text'><i ng-click='setText(myText);' class='fa fa-plus'></i></div>",
		
		link: function(scope, elem, attrs){
			elem.bind('click', function(){
				scope.showText = true;
			});

			scope.setText = function(){
				elem.text(scope.myText);
				scope.showText = false;
			}

		},
	}
})


app.directive('jrBackColor', function(){
	return {
		controller: ['$scope', function($scope) {
      		$scope.color = 'green';
     	}],

		link: function(scope, elem, attrs){
			scope.color = ""
		},
		template: "<input type='text' ng-model='color' placeholder='Enter Color'/>",
	}
});





app.directive('customInput', function() {
    return {
        // can be used as attribute or element
        restrict: 'AE',
        // which markup this directive generates
        template: '<input>' +
                  '<button>+</button>'
    };
});




app.directive('jrAction', function() {
  return {
  		restrict: 'A',
  		link: function(scope, elem, attrs) {
  			
  			elem.on('click', function(){
  				
  			})
  
  		},//end of link

  	}
});