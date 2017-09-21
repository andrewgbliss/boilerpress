const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.set('port', process.env.PORT || '3000');
app.set('env', process.env.NODE_ENV || 'development');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

if (process.env.VIEWS_PATH) {
  app.set('views', process.env.VIEWS_PATH);
  app.set('view engine', process.env.VIEWS_ENGINE || 'pug');
}

if (process.env.STATIC_FILES_PATH) {
  app.use(express.static(process.env.STATIC_FILES_PATH));
}

let server;
module.exports = {
  app,
  start() {
    if (process.env.ROUTES_PATH) {
      app.use(require(process.env.ROUTES_PATH));
    }

    app.use((req, res, next) => {
      const err = new Error(`${req.method} ${req.url} Not Found`);
      err.status = 404;
      next(err);
    });

    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.format({
        html() {
          res.render('error', {
            message: err.message,
            error: err,
          });
        },
        json() {
          res.json({
            error: {
              message: err.message,
            },
          });
        },
      });
    });

    return new Promise((resolve) => {
      console.log('Starting express app ...');
      server = app.listen(process.env.PORT || '3000');
      server.on('listening', () => {
        const addr = server.address();
        const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
        console.log(`Express Server Port: ${bind} | Environment : ${app.get('env')}`);
        return resolve(server);
      });
    });
  },
  stop() {
    return server.close();
  },
};