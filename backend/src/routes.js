const express = require('express');
const CpuController = require('./controllers/CpuController');
const TopController = require('./controllers/TopController');
const PidController = require('./controllers/PidController');
const DriverController = require('./controllers/DriverController');
const MemoryController = require('./controllers/MemoryController');
const NetController = require('./controllers/NetController');
const OsController = require('./controllers/OsController');
const TerminalController = require('./controllers/TerminalController');

const routes = express.Router();

routes.get('/', (req, res) => { 
    return res.json({ message: "Dashboard's backend is running! :)" });
});

//everytime I make a request with insomnia with put method and with address http://localhost:7777/SOMETHING, SOMETHING will be the id
routes.put('/users/:id', (req, res) => {
    //req.params: access route params (edit and delete)
    return res.json({ message: req.params.id });
})

routes.get('/cpu', CpuController.info);
routes.get('/cpu_usage', CpuController.usage);

routes.get('/driver', DriverController.info);

routes.get('/ram', MemoryController.info);

routes.get('/net', NetController.info);

routes.get('/os', OsController.info);
routes.get('/temps', OsController.temps);

routes.get('/get_top_info', TopController.index);
routes.post('/get_top_info', TopController.index);

routes.post('/pid', PidController.index);
routes.post('/pid_info', PidController.info);

routes.post('/command', TerminalController.index);
routes.get('/kernel_status', TerminalController.status);

module.exports = routes;