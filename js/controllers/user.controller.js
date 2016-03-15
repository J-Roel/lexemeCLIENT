'use strict';
var app = angular.module("LexemeApp");

//Setup our app's main controller (also takes care of our home view) -------------------------
app.controller( 'UserCtrl', ['$scope', '$window', '$routeParams', 'APIService', UserCtrl]);

function UserCtrl($scope, $location, $routeParams, APIService, APICtrl){

	//vm for view model -------------
	var vm = this;

	//define variables
	vm.currentUser;

	//function declarations
		//CRUD operations
		vm.getUser = getUser;
		vm.createUser = createUser;
		vm.updateUser = updateUser;
		vm.deleteUser = deleteUser;
		vm.getAllUsers = getAllUsers;

	//OVERALL FUNCTION FOR APIService.callAPI
	//call API with an action, id, and data
	// APIService.callAPI(action, id, data).then(function(response){
	// 	if(response){
	// 		vm.booklist = response.data;
	// 	} else {
	// 		console.error("Did not recieve any data.");
	// 	}
	// });

	function getAllUsers(){
		var action = 'getAllUsers';
		APIService.callAPI(action).then(function(response){
				if(response){
					vm.currentUser = response.data;
				}else{
					console.error("did not recieve users");
				}
		});
	}

	//GET A USER
	function getUser(action){
		if($routeParams.id){
			var id = $routeParams.id
			APIService.callAPI(action, id).then(function(response){
				if(response){
					vm.currentUser = response.data;
				} else {
					console.error('Did not recieve a user!');
				}
			});//End promise
		}//End if
	}//end getUser


	//CREATE A USER
	function createUser(action, id, data){


		APIService.callAPI(action, id, data).then(function(response){
			if(response){
				//Response should return the user we just created, then
				//take them to the dashboard
				vm.currentUser = repsonse.data;
				$window.location.href = '/dashboard';
			} else {
				console.error('Did not successfully create user.')
			}
		})

	}

	//UPDATE A USER
	function updateUser(action, id, data){
		action = 'updateUser';


		APIService.callAPI(action, id, data).then(function(response){
			if(response){
				//Response should return the user we just created, then
				//take them to the dashboard
				vm.currentUser = repsonse.data;
			} else {
				console.error('Did not successfully create user.')
			}
		})

	}


	//DELETE A USER
	function deleteUser(action){
		if($routeParams.id){
			var id = $routeParams.id
			APIService.callAPI(action, id).then(function(response){
				if(response){
					response = "Delected Successfully";
				} else {
					console.error("Did not recieve any data.");
				}
			});//end promise
		}//end if
	}//end delete user








	
};//End Controller





/*END OF FILE*/