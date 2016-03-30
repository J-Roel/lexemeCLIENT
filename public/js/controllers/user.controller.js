'use strict';
var app = angular.module("LexemeApp");




//---------------------------------------------------------------------------
//Setup our app's main controller (also takes care of our home view)
//---------------------------------------------------------------------------
app.controller( 'UserCtrl', ['$scope', '$rootScope', '$window', '$routeParams', '$location', 'APIService', 'APILogin', UserCtrl]);




function UserCtrl($scope, $rootScope, $window, $routeParams, $location, APIService, APILogin){


	//vm for view model
	var vm = this;
	vm.user;
	vm.greeting = getGreeting();

	//define variables
	//============================================
		



	//function declarations
	//============================================
		//Make sure user is set
		//$rootScope.curUser = vm.user;

		//CRUD operations
		vm.getUserT = getUserT; //Get our user by token
		vm.deleteUser = deleteUser; //Delete our current user
		vm.registerUser = registerUser; //Calls route to register user
		vm.createUser = createUser; //Calls api to create new user
		vm.editUser = editUser; //Call to edit user route
		vm.updateUser = updateUser; //Funcion to call API and handle data
		vm.home = home; //Helper to link back to landing page
		vm.getGreeting = getGreeting; //gets a random greeting for user

		//User Auth operations
		vm.loginUser = loginUser;
		vm.logoutUser = logoutUser;





	//CONTROLLER INITIALIZATION FUNCTIONS
	//============================================
		//Get our user info if we have one
		//if not re-route to login page
		if($window.sessionStorage.token){
			vm.getUserT();
		}else{
			$location.path('/login');
		}




	//CONTROLLER FUNCTIONS
	//============================================
		

		function getGreeting(){
			var choice = Math.floor(Math.random() * (5 - 1) + 1);
			switch(choice){
				case 1:
					return 'Hey ';
				break;
				case 2:
					return 'Hello ';
				break;
				case 3:
					return "What's up ";
				break;
				case 4:
					return "Welcome ";
				break;

				default:
					return "Hi ";
			}
		}

		//HOME
		function home(){
			$location.path("/");
		}



		//LOGIN USER
		//Function to jump to our APILogin service
		//then redirect to the dashboard
		function loginUser(user){

			//call to our API service
			APILogin.submit(user);

			//Redirect is in the login service
			//to prevent async issue with parsing
			//the returned json.


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



		//GET A USER BY THEIR LOCAL TOKEN
		function getUserT(){

			var id = 0; //placeholder
			//Make call to our APIService which talks to our user
			APIService.callAPI('getUserByToken', id).then(function(response){
				if(response){
					vm.user = response.data[0];
					
				} else {
					console.error('Did not recieve a user!');
				
				}
			});//End promise
	
		}//end getUser




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



		

		//CREATE A USER
		function createUser(action, data){
			//console.log("CREATE USER: ", data);

			var id = 0; //placeholder for id
			APIService.callAPI(action, data).then(function(response){
				if(response){
					$location.path('/login');
				} else {
					console.error('Did not successfully create user.')
				}
			})
		}




		//REGISTER A USER
		function registerUser(user){

			//console.log("USER: ", user);
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
		            image_url: 'http://fillmurray.com/100/100',
		            company_id: 0,
		            role: user.role,
		            auth_role: 'visitor'
	 	    	}
	 	    	//console.log("NEW USER DATA: ", newUserData);


			//Create Our User
			vm.createUser('createUser', newUserData)
		
		}; //END REGISTER USER





		//EDIT USER - call from button to lead page instead of using
		//an anchor
		function editUser(){

			$location.path('/edit-user');
		}


		//UPDATE A USER
		function updateUser(user){

			//console.log('UPDATE USER INFO TO PASS: ', user);

			//Call the service to connect to the API
			APIService.callAPI('updateUser', user).then(function(response){
				if(response){
					//console.log('RESPONSE FROM UPDATE: ', response);
					//$rootScope.appMessage = "User updated Successfully!"
				} else {
					console.error('Did not successfully create user.')
				}
			})

		}



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
};//End Controller





//EDIT USER CONTROLLER
//-----------------------------------------------
//This takes care of the updateUser form (edit-user.html)
app.controller( 'EditUserCtrl', ['$scope', '$rootScope', 'APIService', EditUserCtrl]);

function EditUserCtrl($scope, $rootScope, APIService){

	//vm for view model
	var vm = this;
	vm.updateCurUser = {}; //Object for our form
	//define variables
	//============================================

			var id = 0; //placeholder
			//Make call to our APIService which talks to our user
			APIService.callAPI('getUserByToken', id).then(function(response){
				if(response){
					vm.user = response.data[0];

					vm.updateCurUser.username = vm.user.username;
					vm.updateCurUser.firstname = vm.user.first_name;
					vm.updateCurUser.lastname = vm.user.last_name;
					vm.updateCurUser.imageurl = vm.user.image_url;
					vm.updateCurUser.email = vm.user.email;
					vm.updateCurUser.role = vm.user.role;


				} else {
					console.error('Did not recieve a user!');
				}
			});//End promise
		

}















/*END OF FILE*/