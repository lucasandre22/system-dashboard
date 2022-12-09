const { util } = require('config');
var osu = require('node-os-utils');
const { execCommand, splitTextBy } = require('../utils');
var cpu = osu.cpu

async function execAndParseLsCpu(data) {
    let output = await execCommand('lscpu');
    let dataMap = await splitTextBy(':', output);
    console.log(dataMap);
    return {
        'model': dataMap.get('Model name'),
        'family': dataMap.get('CPU family'),
        'byte_order': dataMap.get('Byte Order'),
        'mhz': dataMap.get('CPU max MHz'),
        'cores': dataMap.get('CPU(s)'),
        'thread_cores': dataMap.get('Thread(s) per core'),
        'socket': dataMap.get('Socket(s)'),
        'socket_cores': dataMap.get('Core(s) per socket'),
        'architeture': dataMap.get('Architecture'),
        'l1d': dataMap.get('L1d cache'),
        'l1i': dataMap.get('L1i cache'),
        'l2': dataMap.get('L2 cache'),
        'l3': dataMap.get('L3 cache'),
        'bogomips': dataMap.get('BogoMIPS')
    };
}

// run lscpu?
module.exports = {
    async index(req, res) {
        const { usage } = req.query;
        
        //run bash command to get usage percentage (top?)

        /*cpu.usage()
        .then(cpuPercentage => {
            console.log(cpuPercentage)
            return res.json({ cpuPercentage, model });
        })*/
        //return res.json(usage);
    },
    async usage(req, res) {
        const { usage } = req.query;
        await cpu.usage()
        .then(cpuPercentage => {
            return res.json({ cpuPercentage });
        })
    },
    async info(req, res) {
        const cpuInfo = await execAndParseLsCpu();
        return res.json(cpuInfo);
    },
    async getMhz(req, res) {
        let mhz = await execCommand('cat /proc/cpuinfo | grep "cpu MHz"');
        mhz = mhz.split(':')[1].split('.')[0];
        return res.json({mhz});
    }
};