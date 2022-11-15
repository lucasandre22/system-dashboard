var osu = require('node-os-utils')
var netstat = osu.netstat



module.exports = {
    async index(req, res) {

    },
    /*
    * get network interfaces and their io bytes
    */
    async info(req, res) {
        await netstat.stats()
        .then(info => {
            return res.json(info);
        });
    }
}