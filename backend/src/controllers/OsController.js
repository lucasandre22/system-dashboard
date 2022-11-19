var osu = require('node-os-utils');
const { execCommand, splitTextBy } = require('../utils');
var os = osu.os

module.exports = {
    async index(req, res) {

    },
    async info(req, res) {
        const dataMap = await splitTextBy(':', await execCommand('hostnamectl'));
        const platform = os.platform();
        const uptime = os.uptime();
        const ip = os.ip();
        const hostname = os.hostname();
        const type = os.type();
        const arch = os.arch();
        const kernel = dataMap.get('Kernel');
        const vendor = dataMap.get('Hardware Vendor');
        const model = dataMap.get('Hardware Model');
        const distro = dataMap.get('Operating System');
        const chassis = dataMap.get('Chassis');
        return res.json({ platform, distro, uptime, ip, hostname, type, arch, kernel, vendor, model, chassis });
    },
    async temps(req, res) {
        
    }
}