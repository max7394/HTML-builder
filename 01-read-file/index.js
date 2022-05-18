/* eslint-disable no-unused-vars */
const fs = require('fs');
const path = require('path');

let text = '';

const textStream = fs.createReadStream(
  path.join(__dirname, 'text.txt')
);

textStream.on('data', (chunk) => (text += chunk));
textStream.on('end', () => console.log('', text));