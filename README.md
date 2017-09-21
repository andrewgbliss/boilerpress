# boilerpress
NodeJS Express Boilerplate

## Usage

```
const { app, start } = require('boilerpress');
const os = require('os');

// Add any middleware you need
app.use((req, res, next) => {
  res.locals = {
    host: os.hostname(),
    title: 'Express',
  };
  next();
});

// Start the Express server
start();
```

### Using a .env file

Create a .env file to use within the module.

These are the keys that you can configure.

```
NODE_ENV=development
PORT=3000
VIEWS_PATH=/usr/src/app/examples/default/express/views
VIEWS_ENGINE=pug
STATIC_FILES_PATH=/usr/src/app/examples/default/express/public
ROUTES_PATH=/usr/src/app/examples/default/express/routes
```