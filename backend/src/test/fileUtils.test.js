const getFileContent = require('../fileUtils');
const buildFileAsJson = require('../fileUtils');

test('get file content as " "', () => {
    expect(getFileContent("./src/test/fileUtils.test.js").toBe(""));
});