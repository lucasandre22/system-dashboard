const { util } = require('config');
var osu = require('node-os-utils')
const { execCommand, splitTextBy } = require('../utils');
var cpu = osu.cpu

async function execAndParseLsCpu(data) {
    let output = await execCommand('lscpu');
    let dataMap = await splitTextBy(':', output);
    return {
        'model': dataMap.get('Model name'),
        'mhz': dataMap.get('CPU max MHz'),
        'cores': dataMap.get('CPU(s)'),
        'architeture': dataMap.get('Architecture'),
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
            console.log(cpuPercentage)
            return res.json({ cpuPercentage });
        })
    },
    async info(req, res) {
        const cpuInfo = await execAndParseLsCpu();
        return res.json(cpuInfo);
    }
};