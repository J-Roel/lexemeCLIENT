var app = angular.module("LexemeApp");

app.service( 'APIService', ['$http', APIService]);

function APIService($http){
	return {
			rootUrl : 'http://localhost:3000/',

			callinfo : {
				method: 'GET',
				url: '/',
				data: {}
			},

			//Setup switch to take care of all the routes to the serverside
			//this will update our call info 
			setCall : function(action, id){
				switch(action)
				{

					//USER CRUD TO API
					//======================================================
					case 'getUserById' :
						this.callinfo.method = 'GET';
						this.callinfo.url = this.rootUrl + "users/";
					break;


					case 'getUserByToken' :
						this.callinfo.method = 'GET';
						this.callinfo.url = this.rootUrl + "users/userByToken";
					break;

					case 'createUser' :
						this.callinfo.method = 'POST';
						this.callinfo.url = this.rootUrl + "users/";
					break;

					case 'deleteUser' :
						this.callinfo.method = 'DELETE';
						this.callinfo.url = this.rootUrl + "users";
					break;

					case 'updateUser' :
						this.callinfo.method = 'PUT';
						this.callinfo.url = this.rootUrl + "users/update";
					break;




					//PROJECT CRUD TO API
					//======================================================
					case 'createProject' :
						this.callinfo.method = 'POST';
						this.callinfo.url = this.rootUrl + "projects/";
					break;

					case 'getProjectByToken' :
						this.callinfo.method = 'GET';
						this.callinfo.url = this.rootUrl + "projects/userProjects";
					break;
					case 'getProject' :
						this.callinfo.method = 'GET';
						this.callinfo.url = this.rootUrl + "projects/" + id;
					break;
					case 'updateProject' :
						this.callinfo.method = 'PUT';
						this.callinfo.url = this.rootUrl + "projects/" + id;
					break;
					case 'deleteProject' :
						this.callinfo.method = 'DELETE';
						this.callinfo.url = this.rootUrl + "projects/" + id;
					break;


					//NOTES
					//========================================================
					// case 'saveNotes' :
					// 	this.callinfo.method = 'POST';
					// 	this.callinfo.url = this.rootUrl + "projects/notes";
					// break;

					// case 'getProjectNotes' :
					// 	this.callinfo.method = 'GET';
					// 	this.callinfo.url = this.rootUrl + "projects/notes";
					// break;




					//TRACKER
					//========================================================
					case 'createTracker' :
						this.callinfo.method = 'POST';
						this.callinfo.url = this.rootUrl + "tracker/";
					break;

					case 'getUserTrackers' :
						this.callinfo.method = 'GET';
						this.callinfo.url = this.rootUrl + "tracker";
					break;
					
					case 'updateTracker' :
						this.callinfo.method = 'PUT';
						this.callinfo.url = this.rootUrl + "tracker/update/" + id;
					break;

					case 'removeTracker' :
						this.callinfo.method = 'DELETE';
						this.callinfo.url = this.rootUrl + "tracker/" + id;
					break;						


					default: //if there is no matching action return false
						console.log("ERROR SETTING UP CALL");
						return false;
				}
				//if we do match a type, we will return true;
				return true;
			},


			callAPI : function(action, data, id){
				//console.log('IN API CALL: ', data);
				//setup our api call and return true if successful
				var goAhead = this.setCall(action, id);

				if( goAhead )//if api successfully setup then...
				{
					if(data == {} || data == null || data == undefined)
					{//if we have no data, then we make the api call like so		
						//console.log("We have NO data: ", data);
						return $http(this.callinfo);
					} else { //if we have data, then we pass our data
						//console.log("We have data: ", data);
						this.callinfo.data = data;
						//console.log("SENDING NOW: ", this.callinfo);
						return $http(this.callinfo);
					}
				}
			}

	}
}; //END BOOKS