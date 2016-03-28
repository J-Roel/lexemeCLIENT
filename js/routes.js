var app = angular.module('LexemeApp');

app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html'
      })
      .when('/workspace/:id', {
      	templateUrl: 'views/workspace.html'
      })
      .when('/register', {
      	templateUrl: 'views/register.html'
      })
      .when('/edit-user', {
        templateUrl: 'views/edit-user.html',
        //controller: 'EditUserCtrl as EUC'
      })
});