var osu = require('node-os-utils')
var drive = osu.drive
const { execCommand } = require('../utils');

module.exports = {
    async info(req, res) {
        await drive.info()
        .then(driveInfo => {
            return res.json(driveInfo);
        })
    },
    async getFileSystem(req, res) {
        let output = await execCommand("df -h");
        console.log(output);
        return res.json({output});
    }
};