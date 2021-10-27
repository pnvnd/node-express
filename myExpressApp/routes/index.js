var express = require('express');
var router = express.Router();

require('newrelic')
const newrelicFormatter = require('@newrelic/winston-enricher')

// Logger configuration
const winston = require('winston');
const logConfiguration = {
  'transports': [
      new winston.transports.File({
          filename: 'logs/example.log'
      })
  ]
};

const logger = winston.createLogger(logConfiguration);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

  // Log a message
  logger.info('What rolls down stairs');
  logger.info('alone or in pairs');
  logger.info('and over your neighbors dog?');
  logger.warn('Whats great for a snack');
  logger.info('And fits on your back?');
  logger.error('Its error and error');
});

module.exports = router;
