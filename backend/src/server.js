const express = require('express'); //import express
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(7777);