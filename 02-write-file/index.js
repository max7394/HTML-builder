/* eslint-disable no-unused-vars */
const fs = require('fs');
const path = require('path');
const { stdin: input, stdout: output } = require('process');
const readline = require('readline');
const writeFile = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const readFile = readline.createInterface({ input, output });
output.write('Type text HERE');
readFile.on('line', (input) => {
  writeFile.write(`${input}`);
  if (input === 'exit'){
    readFile.close(console.log('Good Bye!'));
  }
});
