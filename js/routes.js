var app = angular.module('LexemeApp');

app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: "LoginController as LC"
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: "UserCtrl as UC"        
      })
      .when('/user-profile/:id', {
      	templateUrl: 'views/user-profile.html',
      	controller: "UserCtrl as UC",
      })
      .when('/create-user', {
      	templateUrl: 'views/create-user.html',
      	controller: "UserCtrl as UC",
      })
});