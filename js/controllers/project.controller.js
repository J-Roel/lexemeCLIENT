'use strict';
var app = angular.module("LexemeApp");

//Setup our app's main controller (also takes care of our home view) -------------------------
app.controller( 'ProjectCtrl', ['$scope', '$rootScope', '$window', '$route', '$location', 'APIService', ProjectCtrl]);

function ProjectCtrl($scope, $rootScope, $window, $route, $location, APIService){


	//vm for "this" view model
		var vm = this;
	



	//DEFINE CONTROLLER VARIABLES
	//============================================
		vm.projects; //projects object to hold current projects
		vm.messages; //Messages for all user projects
		vm.curProject; //an object to store the project we are looking at



	//FUNCTION DECLARATIONS
	//============================================
		//CRUD operations
		vm.getUserProjects = getUserProjects
		vm.getProject = getProject;
		vm.createProject = createProject;
		vm.updateProject = updateProject;
		vm.deleteProject = deleteProject;
		vm.viewProject = viewProject;




	//CONTROLLER INITIALIZATION FUNCTIONS
	//============================================
		//When we use this controller, we want all of the current
		//user's projects so we can display them on the dashboard
		vm.getUserProjects();







	//CONTROLLER FUNCTIONS
	//============================================


		function viewProject(id){
			for(var project in vm.projects){
				if(vm.projects[project].id = id){
					vm.curProject = vm.projects[project];		
				}
			}
			
			console.log(vm.curProject);
		}



		//GET A PROJECT BY USER--------------------------
		function getUserProjects(){

			var id = 0; //placeholder
			//Make call to our APIService which talks to our user
			APIService.callAPI('getProjectByToken').then(function(response){
				if(response){
					//console.log('RESPONSE FROM USER PROJECTS: ', response)
					vm.projects = response.data;

					console.log("response: ", response.data);
					//Gather all our project ids to get comments
					var projectIds = [];

					for(var project in vm.projects){
						projectIds.push(vm.projects[project].id);
					}

					//Store in an object so we can pass it to req.body
					var newData = {
						projectIds: projectIds
					}

					// //Check to see if we found any projects, if so then proceed
					// //to grab them from our server
					if (projectIds.length > 0){

						//call api to get project notes
						APIService.callAPI('getProjectNotes', newData)
						.then(function(response){
							if(response){
								console.log("Response from messages: ", response);
							} else {
								console.error('Did not recieve project messages');
							}
						})
					}


				} else {
					console.error('Did not recieve a user!');
				}
			});//End promise
	
		}//end getUser





		//GET A PROJECT--------------------------------
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
			
			if(project.projectimg == "" || project.projectimg == undefined){
				project.projectimg = "http://www.jeremyroelfs.com/blog/wp-content/uploads/2016/03/lexeme-placeholder.jpg";
			}

			var newProject = {
				//id
				project_name: project.projectname,
   				image_url: project.projectimg,
   				project_created_date: Date.now(),
   				project_owner_id: 0,
				scrum_master_id: 0,
				company_id: 0,
				project_html: "<h1 class='hi'>Hello World</h1>",
				project_css: ".hi{ color: red; }",
				project_js: "",
			}


			var id = 0; //placeholder for id
			APIService.callAPI('createProject', newProject)
			.then(function(response){
				if(response){
					//vm.projects = repsonse.data;
					$route.reload();
					$location.path('/dashboard');
				} else {
					console.error('Did not successfully create user.')
					$rootScope.message = "Error: Cannot create project."
				}
			})
		};//END CREATEPROJECT




		//UPDATE A PROJECT
		function updateProject(id, data){
			console.log('ID: ', id, ' data: ', data);



			//Call the service to connect to the API
			APIService.callAPI('updateUser', data).then(function(response){
				if(response){
					//Response should return the user we just created, then
					//take them to the dashboard
					vm.currentUser = repsonse.data;
				} else {
					console.error('Did not successfully create user.')
				}
			})

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