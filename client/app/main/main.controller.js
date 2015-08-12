'use strict';

angular.module('base0App')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser();
    $scope.bars = [];
    //$scope.places = [];

    $scope.search = function(location) {
      $http.get('/api/data/'+location).success(function(barslist) {
        var barslist = barslist["businesses"];

        // get user places data
        $http.get('/api/places/'+location).success(function(placelist) {
          var places = placelist;

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

          $scope.bars = barslist.map(function(bar){
            // show only some data
            // probably should move this "filter" to server side
            // less data === less trafic
            var tbar={
              name : bar.name,
              id : bar.id,
            //  location : bar.location,
              url : bar.url,
              goinCount : 0,
              userAdded : false,
              users : []
            };
            // check places, probably some users have added/goin to
            var place = places.filter(function(p){
              return p["place"] === bar["id"];
            });
            
            if (place.length>0) {
              tbar.goinCount = place.users.length;
              tbar.users = place.users;

              // check if the current user is added, and set the button state
              var haveUser =  places.users.filter(function(u){
                return u._id === $scope.getCurrentUser._id;
              });
              tbar.userAdded = haveUser.length > 0;
            }
            return tbar;
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
