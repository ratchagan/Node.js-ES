var express = require('express');
var router = express.Router();

var elastic = require('./elasticsearch');

router.post('/', function (req, res, next) {
    elastic.addDocument(req.body).then(function (result) { res.json(result) });
});

module.exports = router;
