const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const projectFolder = path.join(__dirname, 'project-dist');

const bundle = async () => {
  const writeStream = fs.createWriteStream(path.join(projectFolder, 'bundle.css'));
  const items = await fs.promises.readdir(stylesFolder);
  for (let item of items){
    const readStream = fs.createReadStream(path.join(stylesFolder, path.basename(item)), 'utf8');
    fs.stat(path.join(stylesFolder, path.basename(item)), (err, st) => {
      if (st.isFile() && path.extname(item) === '.css'){
        readStream.pipe(writeStream);
      }
    });
  }
};
bundle();