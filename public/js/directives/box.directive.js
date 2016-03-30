function placeNode(node, top, left) {
    node.css({
      position: "absolute",
      top: top + "px",
      left: left + "px",
    });
  }



  // To create a empty resizable and draggable box
  app.directive("ceBoxCreator", function($document, $compile) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        $element.on("click", function($event) {

          var newNode = $compile('<div class="contentEditorBox" ce-drag ce-resize></div>')($scope);
          placeNode(newNode, $event.pageY - 25, $event.pageX - 25);
          angular.element($('#desktop')).append(newNode);
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
        angular.element(document.querySelectorAll("#desktop")).css("z-index", "0");
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











/*
===================================================================
===================================================================
===================================================================
===================================================================
===================================================================
===================================================================
===================================================================
===================================================================
===================================================================
===================================================================
===================================================================
===================================================================
===================================================================
===================================================================
*/
function DemoCtrl($scope) {
    'use strict';
    $scope.options = {
        headerHeight: '20',
        headerColor: 'green',
        borderStyle: '1px solid',
        containerSelector: 'body',
        cornerColor: 'blue',
        cornerSize: '20'
    };
}

angular.module('fcWindow.directive', []).directive('fcWindow', ['$document', function ($document) {
    'use strict';
    var HEADER_CLASS = '_header-a8fe';
    var CORNER_CLASS = '_corner-3cf7';
    return {
        scope: {
            'fcWindow': '='
        },
        compile: function (element, attr) {

            appendExtraElements();

            function appendExtraElements() {
                element.append('<div class="' + HEADER_CLASS + '"></div>');
                element.append('<div class="' + CORNER_CLASS + '"></div>');
            }

            return function (scope, element, attr) {
                var header = angular.element(element[0].querySelector('.' + HEADER_CLASS));
                var corner = angular.element(element[0].querySelector('.' + CORNER_CLASS));
                var options = scope.fcWindow;

                applyStyles(options);

                var rect = getOffsetRect(document.body, element[0]);
                var startX = 0,
                    startY = 0,
                    x = rect.left,
                    y = rect.top,
                    startHeight = 0,
                    startWidth = 0,
                    height = element.prop('offsetHeight'),
                    width = element.prop('offsetWidth');

                header[0].addEventListener('mousedown', function (event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startX = event.pageX - x;
                    startY = event.pageY - y;
                    $document.on('mousemove', pMousemove);
                    $document.on('mouseup', pMouseup);
                });

                corner[0].addEventListener('mousedown', function (event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startWidth = event.pageX - x - width;
                    startHeight = event.pageY - y - height;
                    $document.on('mousemove', sMousemove);
                    $document.on('mouseup', sMouseup);
                });

                function pMousemove(event) {
                    y = event.pageY - startY;
                    x = event.pageX - startX;
                    element.css({
                        top: y + 'px',
                        left: x + 'px'
                    });
                }

                function pMouseup() {
                    $document.off('mousemove', pMousemove);
                    $document.off('mouseup', pMouseup);
                }

                function sMousemove(event) {
                    height = event.pageY - y - startHeight;
                    width = event.pageX - x - startWidth;
                    element.css({
                        height: height + 'px',
                        width: width + 'px'
                    });
                }

                function sMouseup() {
                    $document.off('mousemove', sMousemove);
                    $document.off('mouseup', sMouseup);
                }

                function getOffsetRect(parent, child) {
                    var parentRect = parent.getBoundingClientRect();
                    var childRect = child.getBoundingClientRect();
                    var result = {};
                    for (var i in parentRect) {
                        result[i] = childRect[i] - parentRect[i];
                    }
                    return result;
                }


                function applyStyles(options) {
                    element.css({
                        padding: options.headerHeight + 'px 0 0',
                        position: 'absolute',
                        border: [options.borderStyle, options.headerColor].join(' ')
                    });

                    header.css({
                        position: 'absolute',
                        top: 0,
                        height: options.headerHeight + 'px',
                        width: '100%',
                        background: options.headerColor,
                        cursor: 'move'
                    });

                    corner.css({
                        position: 'absolute',
                        bottom: -options.cornerSize / 2 + 'px',
                        right: -options.cornerSize / 2 + 'px',
                        width: options.cornerSize + 'px',
                        height: options.cornerSize + 'px',
                        background: options.cornerColor || options.headerColor,
                        transform: 'rotate(45deg)',
                        cursor: 'nwse-resize'
                    });
                }
            };
        }
    };
}]);


var fcWindowDemo = angular.module('fcWindowDemo', ['fcWindow.directive']);