'use strict';

var _ = require('lodash');
var Place = require('./place.model');

// Get 1 specific place
exports.index = function(req, res) {
  //location/:place
  Place.find({location:req.params.location, place:req.params.place}, function (err, place) {
    if(err) { return handleError(res, err); }
    console.log("index",place);
    if(!place) { return res.status(404).send([]); }
    return res.status(200).json(place);
  });
};

// Get a places by location
exports.show = function(req, res) {
  Place.find({location:req.params.location}, function (err, places) {
    if(err) { return handleError(res, err); }
    console.log("show", places);
    if(!places) { return res.status(404).send([]); }
    return res.json(places);
  });
};

// Creates a new place in the DB.
exports.create = function(req, res) {
  Place.create(req.body, function(err, place) {
    console.log("saving:", req.body);
    if(err) { return handleError(res, err); }
    return res.status(201).json(place);
  });
};

/*
Contact.update(
  {phone:request.phone}, 
  {$set: { phone: request.phone }}, 
  {upsert: true}, 
  function(err){...})
*/
// Updates an existing place in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Place.findById(req.params.id, function (err, place) {
    if (err) { return handleError(res, err); }
    if(!place) { return res.status(404).send('Not Found'); }
    //var updated = _.merge(place, req.body);
    var updated = _.extend(place, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(place);
    });
  });
};

// Deletes a place from the DB.
exports.destroy = function(req, res) {
  Place.findById(req.params.id, function (err, place) {
    if(err) { return handleError(res, err); }
    if(!place) { return res.status(404).send('Not Found'); }
    place.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}