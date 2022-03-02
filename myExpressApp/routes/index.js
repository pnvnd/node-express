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

var getData = function () {
  var data = {
      'item1': 'https://images.unsplash.com/photo-1563422156298-c778a278f9a5',
      'item2': 'https://images.unsplash.com/photo-1620173834206-c029bf322dba',
      'item3': 'https://images.unsplash.com/photo-1602491673980-73aa38de027a'
  }
  return data;
}

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express', "data": getData() });

  // Log a message
  logger.info('Information, working as intended.');
  logger.warn('Warning, incoming game.');
  logger.error('Error, exiting!');
});

module.exports = router;
