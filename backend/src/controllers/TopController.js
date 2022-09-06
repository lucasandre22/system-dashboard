const config = require('config');
const script_dir = config.get('script_dir');
const script_output_dir = config.get('script_output_dir');
const buildFileAsJson = require('../fileUtils');
const { execCommand } = require('../utils');


async function parseTopCommandOutput(outputFilePath) {
    //get the file from the execCommand output
    const outputFile = script_output_dir + "top_parsed.tmp";
    const scriptParser = script_dir + "cpu_parser_top.sh";
    await execCommand(scriptParser);
    return outputFile;
}

module.exports = {
    async index(req, res) {
        const scriptPath = script_dir + "get_top_info.sh";
        const outputFilePath = script_output_dir + "top.tmp";
        const getTopInfo = 'sh ' + scriptPath;
        await execCommand(getTopInfo);
        const file = await parseTopCommandOutput(outputFilePath);
        const content = await buildFileAsJson(file);
        return res.json(content);
    }
};