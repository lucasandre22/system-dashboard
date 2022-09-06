const { exec } = require('child_process');
const config = require('config');
const script_dir = config.get('script_dir');
const script_output_dir = config.get('script_output_dir');
const getFileContent = require('../fileUtils');
const buildFileAsJson = require('../fileUtils');

async function execCommand(toExec) {
    //make this function return the file that the command directed its output to.
    exec(toExec, (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
}

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
        const toExec = 'sh ' + scriptPath;
        //wait for exec command to execute, problems regarding timing founded
        await execCommand(toExec);
        const file = await parseTopCommandOutput(outputFilePath);
        const content = await buildFileAsJson(file);
        return res.json(content);
    }
};