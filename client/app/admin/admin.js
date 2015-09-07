'use strict';

angular.module('base0App')
  .config(['$routeProvider',function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      });
  }]);