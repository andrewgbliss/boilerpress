const os = require('os');
const boilerpress = require('../../../lib');

const { app } = boilerpress;

app.use((req, res, next) => {
  res.locals = {
    host: os.hostname(),
    title: 'Express',
  };
  next();
});

module.exports = boilerpress;
