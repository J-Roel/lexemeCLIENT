'use strict';
var app = angular.module("LexemeApp");



//TEST FUNCTIONS




/* DESKTOP
-------------------------------------------------------------------------
Main directive
- handles states and adding removing attributes to handle other directives




-------------------------------------------------------------------------
*/
app.directive('desktop', function() {
  return {


      //-------------------------------------------
      //Setup our directive
      restrict: 'E',
      scope: true,



      //-------------------------------------------
      //Controller for Desktop directive
      controller: ['$scope', function($scope) {
          $scope.state;

      }],



      
      
       //-------------------------------------------
      //TEMPLATE
      templateUrl: '../views/workspace/desktop.html',





      //-------------------------------------------
      //FUNCTIONS
      link: function(scope, element, attrs){
          


        // element.on('click', function() {
            
        //     console.log(scope.state, element);


        // });





          //THIS BINDS OUR MOUSE MOVEMENT FROM THE DESKTOP AREA
          //TO THE COORDS LOCATED ON THE DESKTOP AREA
          element.bind('mousemove', function(e){
            scope.$apply(function(){
                scope.myX = e.pageX;
                scope.myY = e.pageY;
            });
            
          });









      //------------------------------------------------------------
      }//end of link function

  











  };//END OF RETURN
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
});//END OF DIRECTIVE





//===============================================
//        HELPER FUNCTIONS
//===============================================

//Sets the css of making a new node in angular
function placeNode(node, top, left) {
    node.css({
      position: "absolute",
      top: top + "px",
      left: left + "px",
    });
  }






//===============================================
//        DIRECTIVES
//===============================================

  // To create a empty resizable and draggable box
  app.directive("ceBoxCreator", function($document, $compile) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
          $element.on("click", function($event) {
          

          var newNode = $compile('<div class="contentEditorBox" ce-drag ce-resize></div>')($scope);
          
          console.log($compile);
          var desktop = $('#desktop');
         
          placeNode(newNode, desktop[0].offsetHeight/2, desktop[0].offsetWidth/2);

          //angular.element($document[0].body).append(newNode);
          angular.element(desktop).append(newNode);

        });
      }
    }
  });


  // To manage the drag
  app.directive("ceDrag", function($document) {
    return function($scope, $element, $attr) {
      var startX = 0,
          startY = 0;
      
      var newElement = angular.element('<div class="draggable"></div>');
      
      $element.append(newElement);
      newElement.on("mousedown", function($event) {
        event.preventDefault();
        
        // To keep the last selected box in front
        angular.element(document.querySelectorAll(".contentEditorBox")).css("z-index", "0");
        $element.css("z-index", "1");

        startX = $event.pageX - $element[0].offsetLeft;
        startY = $event.pageY - $element[0].offsetTop;
        $document.on("mousemove", mousemove);
        $document.on("mouseup", mouseup);
      });



      function mousemove($event) {
        placeNode( $element , $event.pageY - startY , $event.pageX - startX );
      }

      function mouseup() {
        $document.off("mousemove", mousemove);
        $document.off("mouseup", mouseup);
      }
    };




  });





  // To manage the resizers
  app.directive("ceResize", function($document) {
    return function($scope, $element, $attr) {
      //Reference to the original 
      var $mouseDown; 



      // Function to manage resize up event
      var resizeUp = function($event) {
        var margin = 50,
            lowest = $mouseDown.top + $mouseDown.height - margin,
            top = $event.pageY > lowest ? lowest : $event.pageY,
            height = $mouseDown.top - top + $mouseDown.height;

        $element.css({
          top: top + "px",
          height: height + "px"
        });
      };



      // Function to manage resize right event
      var resizeRight = function($event) {
        var margin = 50,
            leftest = $element[0].offsetLeft + margin,
            width = $event.pageX > leftest ? $event.pageX - $element[0].offsetLeft : margin;
        
        $element.css({
          width: width + "px"
        });
      };


      // Function to manage resize down event
      var resizeDown = function($event) {
        var margin = 50,
            uppest = $element[0].offsetTop + margin,
            height = $event.pageY > uppest ? $event.pageY - $element[0].offsetTop : margin;

        $element.css({
          height: height + "px"
        });
      };


      // Function to manage resize left event
      function resizeLeft ($event) {
        var margin = 50,
            rightest = $mouseDown.left + $mouseDown.width - margin,
            left = $event.pageX > rightest ? rightest : $event.pageX,
            width = $mouseDown.left - left + $mouseDown.width;        

        $element.css({
          left: left + "px",
          width: width + "px"
        });
      };



     var createResizer = function createResizer( className , handlers ){
        
        var newElement = angular.element( '<div class="' + className + '"></div>' );
        $element.append(newElement);
        newElement.on("mousedown", function($event) {
        

          $document.on("mousemove", mousemove);
          $document.on("mouseup", mouseup);
        


          //Keep the original event around for up / left resizing
          $mouseDown = $event;
          $mouseDown.top = $element[0].offsetTop;
          $mouseDown.left = $element[0].offsetLeft
          $mouseDown.width = $element[0].offsetWidth;
          $mouseDown.height = $element[0].offsetHeight;                

        


          function mousemove($event) {
            event.preventDefault();
            for( var i = 0 ; i < handlers.length ; i++){
              handlers[i]( $event );
            }
          }

        

          function mouseup() {
            $document.off("mousemove", mousemove);
            $document.off("mouseup", mouseup);
          }         
        


        });
      

      }
      
      createResizer( 'sw-resize' , [ resizeDown , resizeLeft ] );
      createResizer( 'ne-resize' , [ resizeUp   , resizeRight ] );
      createResizer( 'nw-resize' , [ resizeUp   , resizeLeft ] );
      createResizer( 'se-resize' , [ resizeDown ,  resizeRight ] );
      createResizer( 'w-resize' , [ resizeLeft ] );
      createResizer( 'e-resize' , [ resizeRight ] );
      createResizer( 'n-resize' , [ resizeUp ] );
      createResizer( 's-resize' , [ resizeDown ] );
    };

  });







//END OF FILE