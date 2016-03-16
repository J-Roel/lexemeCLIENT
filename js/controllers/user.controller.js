'use strict';
var app = angular.module("LexemeApp");


//---------------------------------------------------------------------------
//Setup our app's main controller (also takes care of our home view)
//---------------------------------------------------------------------------
app.controller( 'UserCtrl', ['$scope', '$window', '$routeParams', '$location', 'APIService', 'APILogin', UserCtrl]);

function UserCtrl($scope, $window, $routeParams, $location, APIService, APILogin){

	//vm for view model
	var vm = this;
	

	//define variables
	//============================================
		



	//function declarations
	//============================================
		//CRUD operations
		vm.getUser = getUser;
		vm.createUser = createUser;
		vm.updateUser = updateUser;
		vm.deleteUser = deleteUser;
		vm.registerUser = registerUser;

		//User Auth operations
		vm.loginUser = loginUser;
		vm.logoutUser = logoutUser;



	//CONTROLLER INITIALIZATION FUNCTIONS
	//============================================





	//CONTROLLER FUNCTIONS
	//============================================
		


		//LOGIN USER
		//Function to jump to our APILogin service
		//then redirect to the dashboard
		function loginUser(user){

			//call to our API service
			APILogin.submit(user);

			//redirect to dashboard
			$location.path('/dashboard');
		}



		//LOG OUT USER
		//Function to jump to our APILogin service
		//then redirect to the dashboard
		function logoutUser(){

			//call to our API service
			APILogin.logout();

			//redirect to home page
    		$location.path('/');
		}



		//GET A USER
		function getUser(action){
			
			if($routeParams.id){//Make sure we have an id from our route

				var id = $routeParams.id; //set our id from our route

				//Make call to our APIService which talks to our user
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
		function createUser(action, data){
			console.log('createUser: ', data);

			var id = 0; //placeholder for id
			APIService.callAPI(action, id, data).then(function(response){
				if(response){
					$window.location.href = '/login';
				} else {
					console.error('Did not successfully create user.')
				}
			})
		}




		//UPDATE A USER
		function updateUser(action, id, data){
			action = 'updateUser';

			//Call the service to connect to the API
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






		//REGISTER A USER
		function registerUser(user){

			console.log("USER: ", user);
			//Extra Validation can be added here
			

			//Setup new user by using data from form
			//and regular data that the user can
			//fill out from the profile page
				var newUserData = {
					//id
		            username: user.username,
		            password: user.password,
		            first_name: user.firstname,
		            last_name: user.lastname,
		            email: user.email,
		            image_url: 'http://www.jeremyroelfs.com/blog/wp-content/uploads/2015/11/bkgrnd-e1458087482501.png',
		            company_id: 0,
		            role: user.role,
		            auth_role: 'visitor'
	 	    	}
	 	    	console.log("NEW USER DATA: ", newUserData);


			//Create Our User
			vm.createUser('createUser', newUserData)
		
		}; //END REGISTER USER

	




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
};//End Controller





/*END OF FILE*/