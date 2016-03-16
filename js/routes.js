var app = angular.module('LexemeApp');

app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
      })
      .when('/login', {
        templateUrl: 'views/login.html'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl as DCtrl'    
      })
      .when('/user-profile/:id', {
      	templateUrl: 'views/user-profile.html',
      	//controller: "UserCtrl as UC",
      })
      .when('/register', {
      	templateUrl: 'views/register.html'
      })
});