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
    var json = data.split('\n');
    for (var i = 0; i < json.length; i+=2) {
        jsonObject[json[i]] = json[i+1];
    }
    return jsonObject;
}

module.exports = buildFileAsJson;