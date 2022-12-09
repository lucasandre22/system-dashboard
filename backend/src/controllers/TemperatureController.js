const { util } = require('config');
var osu = require('node-os-utils')
const { execCommand, splitTextBy } = require('../utils');
var cpu = osu.cpu

async function execAndParseSensors(data) {
    let output = await execCommand('sensors');
    let dataMap = await splitTextBy(':', output);
    console.log(dataMap);
    return {
        'core': dataMap.get('Package id 0').split(' ')[0],
        'wifi': dataMap.get('temp1'),
        'disk': dataMap.get('Composite').split(' ')[0]
    };
}

module.exports = {
    async info(req, res) {
        const temperatureInfo = await execAndParseSensors();
        return res.json(temperatureInfo);
    }
};