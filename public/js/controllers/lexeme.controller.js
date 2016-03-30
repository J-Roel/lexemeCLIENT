'use strict';
var app = angular.module("LexemeApp");


//--------------------------------------------------
//Setup our app's main controller
//--------------------------------------------------
app.controller( 'MainCtrl', ['$scope', '$rootScope', '$window', MainCtrl]);

function MainCtrl($scope, $rootScope, $window){
  var vm = this;
  

  //messages.showAMessage("WORK");

	//define variables
	//============================================
      vm.showLogin = false;
      vm.showRegistration = false;
      vm.message = 'WORK';
      vm.showMessage = true;




  //define functions
  //============================================
      //vm.showAMessage = showAMessage;




  //Initial functions
  //===========================================
  //This is to determine a user is logged in
	//Default is set to false
		if($window.sessionStorage.token){
    		$rootScope.loggedIn = true;
    		return true;
    }else{
    		$rootScope.loggedIn = false;
    		return false;
    }






};//End Controller


app.directive('notification', function($timeout){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      ngModel: '='
    },
    //template: '<div class="app-message"></div>',
    link: function(scope, element, attrs) {
      $timeout(function(){
        element.hide();
      }, 3000);
    }
  }
});
app.controller('AlertController', function($scope){
    var vm = this;
    vm.message = "Default";

    vm.alerts = [];
    //ADD ALERT FUNCTION
    vm.addAlert = function(msg) {
        vm.alerts.push(msg)
    }
});



/*END OF FILE*/