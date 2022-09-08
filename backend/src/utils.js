const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = {
    async execCommand(command) {
        const { stdout, stderr } = await exec(command);
    }
};