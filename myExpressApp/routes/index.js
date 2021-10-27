var express = require('express');
var router = express.Router();

// index.js
require('newrelic')
const newrelicFormatter = require('@newrelic/winston-enricher')

// Logger configuration
const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({label: 'nrtest'}),
    newrelicFormatter()
  ),
  transports: [
      new winston.transports.File({ filename: 'nrlogs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'nrlogs/info.log' })
  ],
});

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
