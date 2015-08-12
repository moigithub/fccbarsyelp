'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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
}
*/

module.exports = mongoose.model('Place', PlaceSchema);