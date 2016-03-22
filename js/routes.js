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
        controller: 'ProjectCtrl as PC'    
      })
      .when('/user-profile/:id', {
      	templateUrl: 'views/user-profile.html',
      })
      .when('/register', {
      	templateUrl: 'views/register.html'
      })
      .when('/edit-user', {
        templateUrl: 'views/edit-user.html',
        //controller: 'EditUserCtrl as EUC'
      })
});