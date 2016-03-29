'use strict';
var app = angular.module("LexemeApp");

//Setup our app's main controller (also takes care of our home view) -------------------------
app.controller( 'TrackerCtrl', ['$scope', '$rootScope', '$routeParams', 'APIService', TrackerCtrl]);

function TrackerCtrl($scope, $rootScope, $routeParams, APIService){

	//vm for "this" view model
		var vm = this;



	//DEFINE CONTROLLER VARIABLES
	//============================================
		vm.list = [
        // {
        //     list_id: 0,
        //     name: 'Test',
        //     date: '2/12/2016',
        //     task: ["User has landing page","User can save"],
        //     status: ["Started","Not Started", "Complete"]
        // }
		]



	//FUNCTION DECLARATIONS
	//============================================
		vm.removeTask = removeTask;
		vm.addTask = addTask;
		vm.removeList = removeList;
		vm.addList = addList;
    vm.statusChange = statusChange;
    vm.saveList = saveList;
    vm.getTrackers = getTrackers;
    vm.removeTracker = removeTracker;


	//CONTROLLER INITIALIZATION FUNCTIONS
	//============================================
      vm.getTrackers();





	//CONTROLLER FUNCTIONS
	//============================================
		    

        function removeTask(listId,taskIndex){
            console.log('Remove Task: ', listId, taskIndex);

              for(var i = 0; i < vm.list.length; i++)
              {
                if(vm.list[i].list_id == listId){
                    vm.list[i].task.splice(taskIndex, 1);
                    vm.list[i].status.splice(taskIndex,1);
                }
              }
        }


        function addTask(listId,task){
              //console.log("addTask: ListId: ", listId, " vm.list: ", vm.list);
              for(var i = 0; i < vm.list.length; i++)
              {
                if(vm.list[i].list_id == listId){
                    vm.list[i].task.push(task);
                    vm.list[i].status.push('Not Started');
                }
              }
        }


        function removeList(listId){
              for(var i = 0; i < vm.list.length; i++)
              {
                if(vm.list[i].list_id == listId){
                    vm.list.splice(i,1);
                  vm.removeTracker(listId);

                }
              }
        }


        function addList(name, projectInfo){
          if(projectInfo === undefined){
            return;
          }
          var project_info = projectInfo.split(',');

          var project_id = project_info[0];
          var project_name = project_info[1];
          var user_id = project_info[2];

          //console.log("----> ", name, project_id, project_name, user_id);

            var newListNum = vm.list.length + 1;
            var myDate = Date.now();
            
            var newList = {
                list_id: newListNum,
                project_id: project_id,
                project_name: project_name,
                user_id: user_id,
                name: name,
                date: myDate,
                task: [],
                status: []
            }


            //Call the API to send our tracker data to the server
            APIService.callAPI('createTracker', newList)
            .then(function(response){
              if(response){
                  console.log("NEW ID FOR TRACKER: ", response.data);
                  
              }else{

              }

            }).catch(function(error){
                  $rootScope.appMessage="Error Creating Tracker List";
            });



            //add our list to the interface
            vm.list.push(newList);
        }



        //------------------------------
        //changes the status of our individual tasks
        function statusChange(index, status, listId){
            //console.log("Status Change: ", index, status, listId);
            for(var i = 0; i < vm.list.length; i++)
            {
              if(vm.list[i].list_id == listId){
                  vm.list[i].status[index] = status;
              }
            }            
        }


        //-----------------------------------------------------------
        //UPDATE OUR LIST ON THE SERVER
        function saveList(trackerId, listId){

            for(var i = 0; i < vm.list.length; i++)
            {
                if(vm.list[i].list_id == listId){
                  
                  if(vm.list[i].status){
                      var status = vm.list[i].status.join();
                  }
                  if(vm.list[i].task){
                      var task = vm.list[i].task.join();
                  }
                    
                }
            }

            //Set the two variables we want to update on our API
            var updateInfo = {
                task: task,
                status: status
            }

            //Make the API call to update teh information
            APIService.callAPI('updateTracker', updateInfo, trackerId)
            .then(function(response){
              if(response){
                console.log('Tracker Saved');
              
              }

            }).catch(function(error){
                  

            });


        }



        function removeTracker(listId){
              console.log("Removing: ", listId);
              var updateInfo="";

              APIService.callAPI('removeTracker', updateInfo, listId)
            .then(function(response){
              if(response){
                  
                  console.log('Successfully Deleted Tracker');
              }else{

              }

            }).catch(function(error){
                  console.log("Error Deleting Tracker List");
            });
        };



        function getTrackers(){
             APIService.callAPI('getUserTrackers')
            .then(function(response){
              if(response){
                  vm.list = response.data;
                  
                  //If our list is not empty or undefined then we split the
                  //strings up into arrays, else we just add an empty array
                  for(var i = 0; i <= vm.list.length-1; i++){
          
                    if(vm.list[i].status !== "" || vm.list[i].status !== undefined){
                      vm.list[i].status = vm.list[i].status.split(",");
                      vm.list[i].task = vm.list[i].task.split(",");
                    } else {
                      vm.list[i].status = [];
                      vm.list[i].task = [];
                    }

                  }




              }else{

              }

            }).catch(function(error){
                  $rootScope.appMessage="Error Creating Tracker List";
            });
        }




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
};//END CONTROLLER








