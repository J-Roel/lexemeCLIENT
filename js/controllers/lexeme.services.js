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
				console.log("Switch: ", action, id);
				switch(action)
				{


					//USERS
					// case 'getAllUsers' :
					// 	this.callinfo.method = 'GET';
					// 	this.callinfo.url = this.rootUrl + "users/";
					// break;

					case 'getUser' :
						this.callinfo.method = 'GET';
						this.callinfo.url = this.rootUrl + "users/" + id;
					break;

					case 'createUser' :
						this.callinfo.method = 'POST';
						this.callinfo.url = this.rootUrl + "users/";
					break;

					case 'deleteUser' :
						this.callinfo.method = 'DELETE';
						this.callinfo.url = this.rootUrl + "users/" + id;
					break;

					case 'updateUser' :
						this.callinfo.method = 'PUT';
						this.callinfo.url = this.rootUrl + "users/" + id;
					break;

					default: //if there is no matching action return false
						return false;
				}
				//if we do match a type, we will return true;
				return true;
			},


			callAPI : function(action, id, data){
				//setup our api call and return true if successful
				var goAhead = this.setCall(action, id);

				if( goAhead )//if api successful then...
				{
					if(data == {} || data == null || data == undefined)
					{//if we have no data, then we make the api call like so		
						console.log("We have NO data: ", data);
						return $http(this.callinfo);
					} else { //if we have data, then we pass our data
						console.log("We have data: ", data);
						this.callinfo.data = data;
						return $http(this.callinfo);
					}
				}
			}

	}
}; //END BOOKS