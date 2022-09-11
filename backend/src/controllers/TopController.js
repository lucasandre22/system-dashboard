const config = require('config');
const script_dir = config.get('script_dir');
const script_output_dir = config.get('script_output_dir');
const buildFileAsJson = require('../fileUtils');
const { execCommand } = require('../utils');


async function parseTopCommandOutput() {
    //get the file from the execCommand output
    const scriptParser = script_dir + "cpu_parser_top.sh";
    await execCommand(scriptParser);
}

module.exports = {
    async index(req, res) {
        const scriptPath = script_dir + "get_top_info.sh";
        const getTopInfo = 'sh ' + scriptPath;
        await execCommand(getTopInfo);
        await parseTopCommandOutput();
        //I can execute only this script as command once and get the same result
        //await execCommand('sh ' + script_dir + "test_script.sh");
        const content = await buildFileAsJson(script_output_dir + "top_parsed.tmp");
        return res.json(content);
    }
};