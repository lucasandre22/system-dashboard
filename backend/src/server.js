const express = require('express'); //import express
const routes = require('./routes');
const config = require('config');
const server = config.get('server');
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(routes);
app.use(bodyParser.json());

app.listen(server.port);