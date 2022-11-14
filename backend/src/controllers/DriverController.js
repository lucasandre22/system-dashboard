var osu = require('node-os-utils')
var drive = osu.drive

module.exports = {
    async info(req, res) {
        await drive.info()
        .then(driveInfo => {
            return res.json(driveInfo);
        })
    }
};