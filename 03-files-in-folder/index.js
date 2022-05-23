const fs = require('fs');
const path = require('path');
const secret_folder = path.join(__dirname, 'secret-folder');

async function info(item) {
  const folder = path.join(secret_folder, item);
  const name = path.basename(item, path.extname(item));
  const ext = path.extname(item);
  fs.stat(folder, (error, data) => {
    const size = data.size;
    console.log(`${name} - ${ext.slice(1)} - ${size}bytes`);
  });
}
fs.promises.readdir(secret_folder, {withFileTypes: true}).then(
  items => {
    for (let item of items) {
      if (item.isFile()) {
        info(item.name);
      }
    }
  });