var osu = require('node-os-utils');
const { execCommand, splitTextBy } = require('../utils');
var os = osu.os

function myFunction(first, second) {
    console.log('first!');
}

function myFunction(array) {
    console.log('second!');
}

myFunction('CGNE', 'CGNR');


module.exports = {
    async index(req, res) {

    },
    async info(req, res) {
        let dataMap = await splitTextBy(':', await execCommand('hostnamectl'));
        let platform = os.platform();
        let uptime = os.uptime();
        let ip = os.ip();
        let hostname = os.hostname();
        let type = os.type();
        let arch = os.arch();
        let kernel = dataMap.get('Kernel');
        let vendor = dataMap.get('Hardware Vendor');
        let model = dataMap.get('Hardware Model');
        let distro = dataMap.get('Operating System');
        let chassis = dataMap.get('Chassis');
        return res.json({ platform, distro, uptime, ip, hostname, type, arch, kernel, vendor, model, chassis });
    }
}