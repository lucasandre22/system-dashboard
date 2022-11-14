const { execCommand } = require('../utils');


async function splitStatOutput(pid) {
    let statOutput = await execCommand("cat /proc/" + pid + "/stat");
    let statObject = {};
    statOutput = statOutput.split(' ');
    
    statObject['execFilename'] = statOutput[1].substring(1, statOutput[1].length - 1);
    statObject['state'] = statOutput[2];
    statObject['parentPid'] = statOutput[3];
    statObject['priority'] = statOutput[17];
    statObject['nice'] = statOutput[18];
    statObject['threads'] = statOutput[19];
    console.log(statObject);
    return statObject;
}

module.exports = {
    /*
    * https://man7.org/linux/man-pages/man5/proc.5.html
    */
    async index(req, res) {
        const getCommandLine = "cat /proc/" + req.body.pid + "/cmdline";
        let cmdLine = await execCommand(getCommandLine);
        let statObject = await splitStatOutput(req.body.pid);
        let threads_pids = await execCommand("ls /proc/" + req.body.pid + "/task");
        threads_pids = threads_pids.split(/[\n]/); ///[\n1-9]\g/
        statObject['threads_pids'] = threads_pids;
        statObject['cmdLine'] = cmdLine;
        return res.json(statObject);
    },
    /*
    *
    * return all pids and their execFilename
    */
    async info(req, res) {
        let output = await execCommand("find /proc -maxdepth 1 -mindepth 1 -type d -printf '\%f\n' | egrep -i '[\\0-9]' | while read -r pid ; do echo \"$pid $(cat /proc/\$pid/comm)\"; done");
        output = output.split('\n');
        let object = {};
        for(let i = 0; i < output.length; i++) {
            let aux = output[i].split(' ');
            object[aux[0]] = aux[1]; 
        }
        return res.json(object);
    }
}