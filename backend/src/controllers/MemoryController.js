var osu = require('node-os-utils')
var mem = osu.mem

module.exports = {
    async index(req, res) {

    },
    async info(req, res) {
        await mem.info()
        .then(info => {
            return res.json(info);
        });
    }
}