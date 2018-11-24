require('dotenv').config();
const config = require('../server/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use( bodyParser.urlencoded( { extended: false }));
app.use( bodyParser.json());

app.get('/', (req, res) => res.send('Hello world!') );

app.use('/users', require('./routes/users'));

module.exports = app;