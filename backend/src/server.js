const express = require('express'); //import express
const routes = require('./routes');
const config = require('config');
const server = config.get('server');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(server.port);