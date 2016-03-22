'use strict';
var app = angular.module("LexemeApp");

//Setup our app's main controller (also takes care of our home view) -------------------------
app.controller( 'ProjectCtrl', ['$scope', '$rootScope', '$window', 'APIService', ProjectCtrl]);

function ProjectCtrl($scope, $rootScope, $window, APIService){


	//vm for "this" view model
		var vm = this;
	



	//DEFINE CONTROLLER VARIABLES
	//============================================
		vm.projects; //projects variable for our dashboard
		




	//FUNCTION DECLARATIONS
	//============================================
		//CRUD operations
		vm.getUserProjects = getUserProjects
		vm.getProject = getProject;
		vm.createProject = createProject;
		vm.updateProject = updateProject;
		vm.deleteProject = deleteProject;





	//CONTROLLER INITIALIZATION FUNCTIONS
	//============================================
		//When we use this controller, we want all of the current
		//user's projects so we can display them on the dashboard
		vm.getUserProjects();







	//CONTROLLER FUNCTIONS
	//============================================




		//GET A USER BY THEIR LOCAL TOKEN
		function getUserProjects(){

			var id = 0; //placeholder
			//Make call to our APIService which talks to our user
			APIService.callAPI('getProjectByToken', id).then(function(response){
				if(response){
					console.log('RESPONSE FROM USER PROJECTS: ', response)
					vm.projects = response.data;
				} else {
					console.error('Did not recieve a user!');
				}
			});//End promise
	
		}//end getUser






		//GET A PROJECT
		function getProject(action){
			
			if($routeParams.id){//Make sure we have an id from our route

				var id = $routeParams.id; //set our id from our route

				//Make call to our APIService which talks to our user
				APIService.callAPI('getProject', id).then(function(response){
					if(response){
						vm.currentUser = response.data;
					} else {
						console.error('Did not recieve a user!');
					}
				});//End promise
			}//End if
		}//end GET PROJECT





		//CREATE A PROJECT
		function createProject(project){
			console.log("PROJECT FROM FORM: ", project);

			var newProject = {
				//id
				project_name: project.projectname,
   				image_url: '',
   				project_created_date: Date.now(),
   				project_owner_id: 0,
				scrum_master_id: 0,
				company_id: 0,
				project_html: '',
				project_css: '',
				project_js: '',
			}


			var id = 0; //placeholder for id
			APIService.callAPI('createProject', id, newProject)
			.then(function(response){
				if(response){
					//vm.projects = repsonse.data;
					console.log("Created Project");

				} else {
					console.error('Did not successfully create user.')
					$rootScope.message = "Error: Cannot create project."
				}
			})
		};//END CREATEPROJECT




		//UPDATE A PROJECT
		function updateProject(id, data){
			console.log('ID: ', id, ' data: ', data);



			// //Call the service to connect to the API
			// APIService.callAPI('updateUser', id, data).then(function(response){
			// 	if(response){
			// 		//Response should return the user we just created, then
			// 		//take them to the dashboard
			// 		vm.currentUser = repsonse.data;
			// 	} else {
			// 		console.error('Did not successfully create user.')
			// 	}
			// })

		}; //END UPDATE USER




		//DELETE A PROJECT
		function deleteProject(action){
			if($routeParams.id){
				var id = $routeParams.id
				APIService.callAPI('deleteProject', id).then(function(response){
					if(response){
						response = "Delected Successfully";
					} else {
						console.error("Did not recieve any data.");
					}
				});//end promise
			}//end if
		}//end delete user









//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
};//End Controller







/*END OF FILE*/