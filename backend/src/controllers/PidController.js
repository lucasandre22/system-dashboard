const { execCommand } = require('../utils');

module.exports = {
    async index(req, res) {
        const getCommandLine = "cat /proc/" + req.body.pid + "/cmdline";
        console.log(await execCommand(getCommandLine));
        return res.json({ "cmdline": await execCommand(getCommandLine) });
    }
}