const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;