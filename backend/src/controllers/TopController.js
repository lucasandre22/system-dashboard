const config = require('config');
const script_dir = config.get('script_dir');
const script_output_dir = config.get('script_output_dir');
const getFileContent = require('../fileUtils');
const buildFileAsJson = require('../fileUtils');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function execCommand(toExec) {
    //make this function return the file that the command directed its output to.
    const {stdout, stderr } = await exec(toExec);
    if(stderr) {
        throw stderr;
    }
}

async function parseTopCommandOutput(outputFilePath) {
    //get the file from the execCommand output
    const outputFile = script_output_dir + "top_parsed.tmp";
    const scriptParser = script_dir + "cpu_parser_top.sh";
    await execCommand(scriptParser);
    console.log('Executing cat:');
    await execCommand('cat ' + script_output_dir + 'top.tmp');
    return outputFile;
}

module.exports = {
    async index(req, res) {
        const scriptPath = script_dir + "get_top_info.sh";
        const outputFilePath = script_output_dir + "top.tmp";
        const getTopInfo = 'sh ' + scriptPath;
        await execCommand(getTopInfo);
        const file = await parseTopCommandOutput(outputFilePath);
        console.log("file:" + file);
        const content = await buildFileAsJson(file);
        return res.json(content);
    }
};