const util = require('util');
const { execCommand } = require('../utils');

function parseLineBreak(output) {
    let parsed = output.split('\n').filter((a) => a);
    if(parsed[parsed.length - 1] === "")
        return parsed.slice(0, parsed.length - 1);
    return parsed;
}

module.exports = {
    /*
    *
    * The idea is to support only "status" commands, and not iterative ones.
    *
    */
    async index(req, res) {
        const { command } = req.body;
        const output = await execCommand(command);
        //get default message warning to use just status commands
        return res.json(parseLineBreak(output));
    },
    async status(req, res) {
        return res.json(await execCommand("screenfetch"));
    }
}