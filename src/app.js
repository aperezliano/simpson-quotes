// https://softwareontheroad.com/ideal-nodejs-project-structure/
const requireAll = require('require-dir-all');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(morgan('dev'));

Object.entries(requireAll('./routes')).forEach(([path, endpoints]) => {
  app.use(`/${path}`, endpoints);
});

module.exports = app;
