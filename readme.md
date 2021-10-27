# Node-Express Application

#Instructions
1. Install Node.js LTS
2. Set-ExecutionPolicy Unrestricted (PowerShell only)
3. Created a new express app:

    - `npm install -g express-generator`
    - `express myExpressApp --view pug`
    - `cd myExpressApp`
    - `npm install`
    - `npm install newrelic --save` (APM module)
    - `npm install winston` (logging module)
    - `npm install @newrelic/winston-enricher` ([Logs with Context](https://www.npmjs.com/package/@newrelic/winston-enricher))
    - `npm start`

4. Edit `index.js`:

```
var express = require('express');
var router = express.Router();

// Logger configuration to send to file instead of console
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
```

5. Infrastructure Agent in Windows: C:\Program Files\New Relic\newrelic-infra\logging.d\file.yml

```
logs:
    # Basic tailing of a single file
  - name: basic-file
    file: C:\Users\Peter\Documents\GitHub\node-express\myExpressApp\logs\example.log
```