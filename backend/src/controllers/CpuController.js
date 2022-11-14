const { util } = require('config');
var osu = require('node-os-utils')
const { execCommand } = require('../utils');
var cpu = osu.cpu

async function execAndParseLsCpu(data) {
    let output = await execCommand('lscpu');
    output = output.split('\n');
    let dataMap = new Map();
    let aux;
    for(let i = 0; i < output.length; i++) {
        aux = output[i].split(':');
        if(aux[0] && aux[1])
            dataMap.set(aux[0].trim(), aux[1].trim());
    }
    
    //create map from command output, spliting each line by : delimiter
    /*await output.replace(/(\b[]), function($0, param, value) {
        console.log(param + "->" +  value);
        dataMap[param] = value;
    });*/
    return {
        'model': dataMap.get('Model name'),
        'mhz': dataMap.get('CPU max MHz'),
        'cores': dataMap.get('CPU(s)'),
        'architeture': dataMap.get('Architeture'),
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
        console.log('lala')
        //run bash command to get usage percentage
        
    
    },
    async info(req, res) {
        let cpuInfo = await execAndParseLsCpu();
        return res.json(cpuInfo);
    }
};