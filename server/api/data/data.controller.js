'use strict';

var config = require('../../config/environment');

//var _ = require('lodash');
var yelp = require("yelp").createClient({
  consumer_key:    config.yelp.ConsumerKey, 
  consumer_secret: config.yelp.ConsumerSecret,
  token:           config.yelp.Token,
  token_secret:    config.yelp.TokenSecret,
  ssl: true
});
/*
// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({term: "food", location: "Montreal"}, function(error, data) {
  console.log(error);
  console.log(data);
});

// See http://www.yelp.com/developers/documentation/v2/business
yelp.business("yelp-san-francisco", function(error, data) {
  console.log(error);
  console.log(data);
});
*/
// Get a single data
exports.show = function(req, res) {
  /*
  Data.findById(req.params.id, function (err, data) {
    if(err) { return handleError(res, err); }
    if(!data) { return res.status(404).send('Not Found'); }
    return res.json(data);
  });
  */
//  console.log("yelp api location:(NO debe estar urlencoded) ",req.params.location);
  yelp.search({category_filter: "bars", location: req.params.location}, function(error, data) {
    if(error) { return handleError(res, error); }
    if(!data) { return res.status(404).send('Not Found'); }
    return res.json(data);
  });
};


function handleError(res, err) {
  return res.status(500).send(err);
}