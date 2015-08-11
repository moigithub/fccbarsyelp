'use strict';

var express = require('express');
var controller = require('./data.controller');

var router = express.Router();

router.get('/:location', controller.show);
/*
router.get('/', controller.index);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
*/
module.exports = router;