const express = require('express'); //import express
const routes = require('./routes');
const config = require('config');
const server = config.get('server');
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(routes);
app.use(bodyParser.json());

app.listen(server.port);

app.use(express.static("../../frontend"));
app.use(express.static(path.join(__dirname,'../../frontend')));
//app.use('/static', express.static('public'));