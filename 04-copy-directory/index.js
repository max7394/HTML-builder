const fs = require('fs');
const path = require('path');

const oldFolder = path.join(__dirname, 'files');
const newFolder = path.join(__dirname, 'files-copy'); 

fs.promises.mkdir(newFolder, {recursive: true}, () => {});
fs.readdir(newFolder,{withFileTypes: true}, (err, items) => {
  items.forEach((item) => {fs.unlink(path.join(newFolder, item.name), () => {});
  });
  fs.readdir(oldFolder,{withFileTypes: true}, (err, items) => {
    items.forEach((item) => {
      fs.copyFile(path.join(oldFolder, item.name), path.join(newFolder, item.name),() => {});});
  });
});