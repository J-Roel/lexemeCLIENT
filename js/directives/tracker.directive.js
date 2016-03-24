'use strict';
var app = angular.module("LexemeApp");



app.directive('jrList', function(){
	return{
    //restrict: 'E',
		templateUrl: "views/partials/tracker.html",
		controller: ['$scope', function($scope) {
      		var vm = this;
      		
          $scope.list = [
          ];

          vm.removeTask =  function(listId,taskIndex){
              for(var i = 0; i < $scope.list.length; i++)
              {
                if($scope.list[i].id == listId){
                    $scope.list[i].task.splice(taskIndex, 1);
                }
              }
          }
          vm.addTask =  function(listId,task){
              for(var i = 0; i < $scope.list.length; i++)
              {
                if($scope.list[i].id == listId){
                    $scope.list[i].task.push(task);
                }
              }
          }
          vm.removeList = function(listId){
              for(var i = 0; i < $scope.list.length; i++)
              {
                if($scope.list[i].id == listId){
                    $scope.list.splice($scope.list[i],1);
                }
              }
          }
          $scope.addList = function(name){
            console.log('In parent directive: ', name)
            var newListNum = $scope.list.length + 1;
            var myDate = Date.now();
            var newList = {
                id: newListNum,
                name: name,
                date: myDate,
                task: []
            }

            $scope.list.push(newList);

          }


    	}],
	};
});



app.directive('ourList', function(){
	return{
    //restrict: 'A',
		templateUrl: "views/tracker/child.html",
		require: '^jrList',
    scope: { item: '=' },
		link: function(scope, element, attrs, ctrl) {
        
        scope.addTask = function(listId, task){
            ctrl.addTask(listId, task);
        }
        scope.removeTask = function(listId, taskIndex){
            ctrl.removeTask(listId, taskIndex);
        }
        scope.removeList = function(listId){
            ctrl.removeList(listId);
        }

    }

	};
});







/*END OF FILE*/