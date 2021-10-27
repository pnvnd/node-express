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
    - Copy `myExpressApp/node_modules/newrelic/newrelic.js` to root of application folder `myExpressApp` and add New Relic License Key
    - `npm start` and check go to `http://localhost:3000/`

4. Edit `index.js`:

Add the following from the `@newrelic/winston-enricher` package under "Usage"
```
require('newrelic')
const newrelicFormatter = require('@newrelic/winston-enricher')
```

Add the following from the `winston` github "Readme":
```
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
```

Remove `level` and `defaultMeta`:
```
const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
```

Replace `format` with the example from `@newrelic/winston-enricher` and change path to log files as needed:
```
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

```

Create some loggers with `info`, `warn`, and `error`:
```
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

6. Restart `New Relic Infrastructure Agent` and `node-express` application, and launch `http://localhost:3000/` and check New Relic for Logs in Context, Distributed Traces, etc.