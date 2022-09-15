const express = require('express');
const CpuController = require('./controllers/CpuController');
const TopController = require('./controllers/TopController');
const PidController = require('./controllers/PidController');

const routes = express.Router();

routes.get('/', (req, res) => { 
    return res.json({ message: "Dashboard's backend is running! :)" });
});

//everytime I make a request with insomnia with put method and with address http://localhost:7777/SOMETHING, SOMETHING will be the id
routes.put('/users/:id', (req, res) => {
    //req.params: access route params (edit and delete)
    return res.json({ message: req.params.id });
})

//routes.post('/users', SessionController.store);
routes.get('/cpu', CpuController.index);
routes.get('/get_top_info', TopController.index);
routes.post('/get_top_info', TopController.index);
routes.post('/pid_info', PidController.index);

module.exports = routes;