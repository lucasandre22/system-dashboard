const express = require('express');
const CpuController = require('./controllers/CpuController');
const TopController = require('./controllers/TopController');
const PidController = require('./controllers/PidController');
const DriverController = require('./controllers/DriverController');
const MemoryController = require('./controllers/MemoryController');
const NetController = require('./controllers/NetController');
const OsController = require('./controllers/OsController');
const TerminalController = require('./controllers/TerminalController');
const TemperatureController = require('./controllers/TemperatureController');
const { index } = require('./controllers/CpuController');
const path = require("path");

const routes = express.Router();

routes.get('/', (req, res) => { 
    res.contentType('.html');
    res.contentType('html');
    res.type('.html');
    //this is to save file
    res.sendFile(path.join(__dirname, '../dashboard.html'));
    //res.sendFile('/home/almeida/gitwork/system-dashboard/backend/dashboard.html');
    
    //res.sendFile('./../dashboard.html');
    //res.render()
    /*return res.render('/home/almeida/gitwork/system-dashboard/backend/dashboard.html', (err) => {

    });*/
});


//everytime I make a request with insomnia with put method and with address http://localhost:7777/SOMETHING, SOMETHING will be the id
routes.put('/users/:id', (req, res) => {
    //req.params: access route params (edit and delete)
    return res.json({ message: req.params.id });
})

routes.get('/cpu', CpuController.info);
routes.get('/cpu_mhz', CpuController.getMhz);
routes.get('/cpu_usage', CpuController.usage);

routes.get('/driver', DriverController.info);
routes.get('/filesystem', DriverController.getFileSystem);

routes.get('/ram', MemoryController.info);

routes.get('/net', NetController.info);

routes.get('/os', OsController.info);
routes.get('/temps', OsController.temps);

routes.get('/top', TopController.index);
routes.post('/top', TopController.index);

routes.post('/pid', PidController.index);
routes.get('/pid_info', PidController.info);
routes.post('/pid_kill', PidController.kill);

routes.post('/command', TerminalController.index);
routes.get('/kernel_status', TerminalController.status);

routes.get('/temperature', TemperatureController.info);

routes.get('/dashboard', teste);

function teste(req, res) {


    '../../frontend/pages/dashboard.html';
    return res;
}

module.exports = routes;