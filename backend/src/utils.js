const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = {
    async execCommand(command) {
        try {
            const { stdout, stderr } = await exec(command);
            return stdout;
        } catch(err) {
            return err.stderr;
        }
    },
    /*
    * Intended to use when there is a text with multiple lines and needs to be parsed by a character/regex.
    * returns a map, which the key is the left side from the splitted string and the value the right side.
    */
    async splitTextBy(toSplit, text) {
        text = text.split('\n');
        let dataMap = new Map();
        for(let i = 0; i < text.length; i++) {
            let aux = text[i].split(toSplit);
            if(aux[0] && aux[1])
                dataMap.set(aux[0].trim(), aux[1].trim());
        }
        return dataMap;
    }
};