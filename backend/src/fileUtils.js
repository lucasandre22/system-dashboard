const fs = require('fs');

async function getFileContent(filePath) {
    var data;
    try {
        data = fs.readFileSync(filePath, 'utf8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
    return data;
}

module.exports = getFileContent;

async function buildFileAsJson(filePath) {
    var data = "";
    try {
        data = fs.readFileSync(filePath, 'utf8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }

    //Build json object based on data, splitting it by '\n' and then making [key] -> [content] based in it.
    var jsonObject = {};
    var wordsFromFile = data.split('\n');
    for (let i = 0; i < wordsFromFile.length; i+=2) {

        //If I found the Pid word in top_parsed file, it means I need a object called pids with all pids from top, separated.
        if(wordsFromFile[i] == "Pid") {
            var pidObject = {};
            for(let j = i+1; j < wordsFromFile.length; j+=24) {
                let localPid = {};
                let pid = wordsFromFile[j];
                for(let k = j+1; k < j+22; k+=2) {
                    localPid[wordsFromFile[k]] = wordsFromFile[k+1];
                }
                pidObject[pid] = localPid;
            }
            jsonObject['pids'] = pidObject;
            break;
        } else
            jsonObject[wordsFromFile[i]] = wordsFromFile[i+1];
    }
    return jsonObject;
}

module.exports = buildFileAsJson;