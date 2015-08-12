'use strict';

angular.module('base0App')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser();
    $scope.bars = [];
    $scope.places = [];

    $scope.search = function(location) {
      $http.get('/api/data/'+location).success(function(barslist) {
        $scope.bars = barslist["businesses"];

        // get user places data
        $http.get('/api/places/'+location).success(function(placelist) {
          $scope.places = placelist;

/*
var PlaceSchema = new Schema({
  location: String,
  place: String,       //  placeID
  users: Array
});

/*
users array have 
{
_id
name
provider
}*/
          // iterate on each bars
          // add a property GoinCount = users.length
          // check if the current user is on users array
          // set the button state accordingly (another property)

          $scope.bars.map(function(bar){
            // check places, probably some users have added/goin to
            var place = $scope.places.filter(function(p){
              return p.place === bar["id"];
            });
            bar.goinCount = 0;
            bar.userAdded = false;
            bar.users = [];
            if (place.length>0) {
              bar.goinCount = place.users.length;
              bar.users = place.users;

              // check if the current user is added, and set the button state
              var haveUser = $scope.places.users.filter(function(u){
                return u._id === $scope.getCurrentUser._id;
              });
              bar.userAdded = haveUser.length > 0;
            }
            return bar;
          });
        });

      });
    }

    $scope.addme = function(bar){
      alert("added "+bar.userAdded);
      // if already registered, delete user from array, else add
      var placeObj = {
        location: bar.location.city,
        place: bar._id,
        users:bar.users
      };

      if(bar.userAdded) {
        var filterUser = placeObj.users.filter(function(u){
          return u._id!==$scope.getCurrentUser._id;
        });
        placeObj.users = filterUser;
      } else {
        placeObj.users.push($scope.getCurrentUser);
      }
      //save data
      $http.post('/api/places/'+bar._id, placeObj).success(function(placelist) {

      });
    }
  });
