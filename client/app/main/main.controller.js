'use strict';

angular.module('base0App')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.bars = [];

    $scope.search = function(bars) {
      $http.get('/api/data/'+bars).success(function(barslist) {
        $scope.bars = barslist["businesses"];
      });
    }

    $scope.addme = function(bar){
      alert("added "+bar.url);
    }
  });
