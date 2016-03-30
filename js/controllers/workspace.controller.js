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
    vm.tool = "select";
    
    //Color Selector Variables
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
	  vm.changeSelect = changeSelect;
    vm.saveProject = saveProject;
    vm.goToDashboard = goToDashboard;
    vm.clearDesktop = clearDesktop;
    vm.setupText = setupText;
    vm.addText = addText;
    vm.removeText = removeText;
    vm.setupLink = setupLink;
    vm.addLink = addLink;
    vm.setupImg = setupImg;
    vm.addImg = addImg;
    vm.removeImg = removeImg;
    vm.imgToCircle = imgToCircle;
    vm.removeDiv = removeDiv;
    
    //Effects
    vm.addGlow = addGlow;
    vm.removeGlow = removeGlow;
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
                            scroll: true
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
        //SELECT MAIN MENU
        function changeSelect(){
             switch(vm.tool)
           {
              case 'select' :
                  $('#select').addClass('menuItem-selected');
                  $('#paint').removeClass('menuItem-selected');
                  $('#paint-text').removeClass('menuItem-selected');
              break;
              case 'paint' :
                  $('#select').removeClass('menuItem-selected');
                  $('#paint').addClass('menuItem-selected');
                  $('#paint-text').removeClass('menuItem-selected');
              break;
              case 'paint-text':
                  $('#select').removeClass('menuItem-selected');
                  $('#paint').removeClass('menuItem-selected');
                  $('#paint-text').addClass('menuItem-selected');
              break;
              default:
                  $('#select').addClass('menuItem-selected');
                  $('#paint').removeClass('menuItem-selected');
                  $('#paint-text').removeClass('menuItem-selected');
            }//end select
        }


        function removeDiv(){
            if($('#desktop').children().hasClass('is-selected'))
            {
                $('.is-selected').remove();
            }
        }

        //--------------------
        //TEXT FUNCTIONS
        function setupText(){
          if($('#desktop').children().hasClass('is-selected'))
          {
              var elTop = $('.is-selected').css('top');
              var elLeft = $('.is-selected').css('left');
              $('.text-box-editor').css('visibility', 'visible');
              $('.text-box-editor').css('top', elTop);
              $('.text-box-editor').css('left', elLeft);
          }
        }
        function addText(){
            $('.is-selected').find('p').remove();
            var txt = $('#text-box-editor').val();
            console.log("Text:", txt);
            $('#text-box-editor').val('');
            $('.text-box-editor').css('visibility', 'hidden');
            $('.is-selected').append('<p>'+ txt + '</p>');
        }
        function removeText(){
            if($('#desktop').children().hasClass('is-selected'))
            {
                $('.is-selected').find('p').remove();
            }
        }
        function applyFont(){
           $('.is-selected').find('p').css('font-family', vm.fontFamily);
           $('.is-selected').find('p').css('font-size', vm.fontSize + "px");
        }
        function setupLink(){
          if($('#desktop').children().hasClass('is-selected'))
          {
             var elTop = $('.is-selected').css('top');
              var elLeft = $('.is-selected').css('left');
              $('.link-box-editor').css('visibility', 'visible');
              $('.link-box-editor').css('top', elTop);
              $('.link-box-editor').css('left', elLeft);
          }
        }
        function addLink(){
            var pTxt = $('.is-selected').find('p').text();
            $('.is-selected').find('p').remove();
            var txt = $('#link-box-editor').val();

            $('#link-box-editor').val('');
            $('.link-box-editor').css('visibility', 'hidden');
            $('.is-selected').append('<a href="'+ txt +'"><p>'+ pTxt+ '</p></a>');
        }



        //--------------------
        //IMAGE FUNCTIONS
         function setupImg(){
          if($('#desktop').children().hasClass('is-selected'))
          {
             var elTop = $('.is-selected').css('top');
              var elLeft = $('.is-selected').css('left');
              $('.img-box-editor').css('visibility', 'visible');
              $('.img-box-editor').css('top', elTop);
              $('.img-box-editor').css('left', elLeft);
          }
        }
        function addImg(){
            $('.is-selected').find('img').remove();
            var txt = $('#img-box-editor').val();
            console.log("Text:", txt);
            $('#img-box-editor').val('');
            $('.img-box-editor').css('visibility', 'hidden');
            $('.is-selected').append('<img src="'+ txt +'"/>');
        }
        function removeImg(){
            if($('#desktop').children().hasClass('is-selected'))
            {
                $('.is-selected').find('img').remove();
            }
        }
        function imgToCircle(){
            $('.is-selected').css('border-radius', '50%');
            $('.is-selected').css('overflow', 'hidden');
        }


        function applyZIndex(){
           $('.is-selected').css('z-index', vm.zIndex);
        }


        //--------------------
        //EFFECTS
        function addGlow(){
            $('.is-selected').addClass('lightbulb');
        }
        function removeGlow(){
            $('.is-selected').removeClass('lightbulb'); 
        }





        //----------------------------------------------------------------
        //HANDLES CLICKING
        $("#desktop").on("click", ".box", function(){
           
           switch(vm.tool)
           {
              case 'select' :
                  $('#desktop').children().removeClass('is-selected');
                  $(this).addClass("is-selected");
              break;
              case 'paint' :
                    var color = $('.color-selector').css("background-color");
                    $(this).css('background-color', color);
              break;
              case 'paint-text':
                    var color = $('.color-selector').css("background-color");
                    $(this).css('color', color);
              break;
            }//end select
        });

        //Deselect
        $("#desktop").on("click", "#desktop", function(){
            $('#desktop').children().removeClass('is-selected');
        });
              








	//CONTROLLER FUNCTIONS
	//============================================



          //SHOW TOOLS MENUS
          vm.showAddTools = showAddTools;
          function showAddTools(){
              //$('.add-tools').css('visibility', 'visible');
              $('.add-tools').css('opacity', 1);
          }





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
				
        var fullCode = "<html><head>" +
        "<title>" + vm.currentProject[0].project_name + "</title>" +
        "<style> " +
            "img{ width: 100%};" +
        "</style></head><body>" +
        htmlCode +
        "</body></html>"


        alert(fullCode);
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
          scroll: true
					//start: function(ev, ui) {},
					//drag: function(ev, ui) {}
				});

              var pos = $('#desktop').position();
              

                $('#desktop').append(el);
                el.css({top: 300, left: 300, position:'absolute'});
                
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