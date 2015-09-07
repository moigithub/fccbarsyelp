'use strict';

angular.module('base0App')
  .config(['$routeProvider',function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  }]);