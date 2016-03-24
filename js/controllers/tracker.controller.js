'use strict';
var app = angular.module("LexemeApp");

//Setup our app's main controller (also takes care of our home view) -------------------------
app.controller( 'TrackerCtrl', ['$scope', '$routeParams', TrackerCtrl]);

function TrackerCtrl($scope, $routeParams){

	//vm for "this" view model
		var vm = this;




	//DEFINE CONTROLLER VARIABLES
	//============================================
		vm.list = [
			{
				id: 0,
	            name: 'Test',
	            date: '2/12/2016',
	            task: ["User has landing page","User can save"]
	        }
		]



	//FUNCTION DECLARATIONS
	//============================================
		vm.removeTask = removeTask;
		vm.addTask = addTask;
		vm.removeList = removeList;
		vm.addList = addList;




	//CONTROLLER INITIALIZATION FUNCTIONS
	//============================================






	//CONTROLLER FUNCTIONS
	//============================================
		function removeTask(listId,taskIndex){
              for(var i = 0; i < vm.list.length; i++)
              {
                if(vm.list[i].id == listId){
                    vm.list[i].task.splice(taskIndex, 1);
                }
              }
        }
        function addTask(listId,task){
              for(var i = 0; i < vm.list.length; i++)
              {
                if(vm.list[i].id == listId){
                    vm.list[i].task.push(task);
                }
              }
          }
        function removeList(listId){
              for(var i = 0; i < vm.list.length; i++)
              {
                if(vm.list[i].id == listId){
                    vm.list.splice(vm.list[i],1);
                }
              }
        }
        function addList(name){
            console.log('In parent directive: ', name)
            var newListNum = vm.list.length + 1;
            var myDate = Date.now();
            var newList = {
                id: newListNum,
                name: name,
                date: myDate,
                task: []
            }

            vm.list.push(newList);

        }



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
};//END CONTROLLER















