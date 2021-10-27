var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Please respond with a resource!');
  logger.info('What rolls down stairs');
});

module.exports = router;
