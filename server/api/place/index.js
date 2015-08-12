'use strict';

var express = require('express');
var controller = require('./place.controller');

var router = express.Router();

router.get('/:location/:place', controller.index);
router.get('/:location', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;