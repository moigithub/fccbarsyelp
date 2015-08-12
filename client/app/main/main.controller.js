'use strict';

angular.module('base0App')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser();
    $scope.isLoggedIn = Auth.isLoggedIn();

    $scope.bars = [];
    //$scope.places = [];

    $scope.search = function(location) {
      $http.get('/api/data/'+location).success(function(barslist) {
        var barslist = barslist["businesses"];

        // get user places data
        $http.get('/api/places/'+location).success(function(placelist) {
          var places = placelist;

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
              location:location,
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
              console.log("ESTE despues place",place);

              tbar.goinCount = place[0].users.length;
              tbar.users = place[0].users;

              // check if the current user is added, and set the button state
              var haveUser =  place[0].users.filter(function(u){
                return u["_id"] === $scope.getCurrentUser._id;
              });

              tbar.userAdded = haveUser.length > 0;
  
            }
            return tbar;
          });
          
        });

      });
    } // end search function

    $scope.addme = function(bar, index){
      console.log("added ",bar);
      // make sure user have logged in
      if (!$scope.isLoggedIn) {
        
        alert("Login first, kthxbye!");
        //angular.element($('#boton_'+index))
        //angular.element(document.querySelector('#myElement'))
        return;
      }

      var elbar= bar;
      var placeObj={};

      //should return 1 object only
      $http.get('/api/places/'+bar.location+'/'+bar.id).success(function(place) {
        console.log("place",place);
        placeObj=place; // devuelve [] revisar api

        // if object returned is empty.. means no1 goin there
        // if not empty check if we are on user list (we registered)
        // if not registered, add to users array
        // if already registered, delete user from array

        if(placeObj.length<1) {
          // no1 goin there.. im the first
          // create new
          console.log("XXX",bar);
          placeObj = {
            "location": bar.location,
            "place": bar.id,
            "users": [$scope.getCurrentUser]
          };
          console.log("POST placeObj", placeObj);
          //save data
          $http.post('/api/places/', placeObj).success(function(place) {
            console.log("saved", place);
            bar.userAdded = true;
          });
        } else {
          // some1 already goin
          // check if we are on the user list (are we goin? )
          // add or remove depending on checkbox state

          var filterUser = placeObj.users.filter(function(u){
            return u._id!==$scope.getCurrentUser._id;
          });


          if(bar.userAdded) {
            // remove
            //placeObj.users = filterUser; //refactored below
          } else {
            // add
            filterUser.push($scope.getCurrentUser);
            //placeObj.users = filterUser; //refactored below
          }
          placeObj.users=filterUser;

          console.log("PUT placeObj", placeObj);
          //update data
          $http.put('/api/places/'+placeObj._id, placeObj).success(function(place) {
            console.log("Updated",place);
            bar.userAdded = !bar.userAdded;
          });
        }
      });


    } // end addme function
  }); // end controller
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
