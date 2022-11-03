//---*Инициализация*---//

const fs = require('fs');
const path = require('path');
const pathAssets = path.join(__dirname, 'assets');
const pathComponents = path.join(__dirname, 'components');
const pathStyles = path.join(__dirname, 'styles');
const pathTemplate = path.join(__dirname,'template.html');
const pathProject = path.join(__dirname, 'project-dist');

//---*Создание папки проекта*---//

function duplicate(oldFolder, newFolder) {
  fs.promises.readdir(oldFolder, { withFileTypes: true }).then(files => {
    files.forEach(file => {
      if (file.isDirectory()) {
        fs.promises.mkdir(path.join(newFolder, file.name), { recursive: true });
        duplicate(path.join(oldFolder, file.name), path.join(newFolder, file.name));
      } else if (file.isFile()) {
        fs.promises.copyFile(path.join(oldFolder, file.name), path.join(newFolder, file.name));
      }
    });
  });
}

//---*Копирование Assets*---//

fs.promises.mkdir(pathProject, { recursive: true });

fs.stat(path.join(pathProject, 'assets'), (err) => {
  if (err) {
    fs.promises.mkdir(path.join(pathProject, 'assets'), { recursive: true });
    duplicate(pathAssets,path.join(pathProject, 'assets'));    
  } else {
    fs.promises.rm(path.join(pathProject, 'assets'), { recursive: true }).then(() => {
      fs.promises.mkdir(path.join(pathProject, 'assets'), { recursive: true });
      duplicate(pathAssets,path.join(pathProject, 'assets'));
    });
  }
}); 

//---*Редактирование HTML*---//

fs.promises.readFile(pathTemplate, 'utf-8').then(result => {
  let tags = result.match(/{{([a-z]*)}}/gi);
  tags.forEach(item => {
    let tag = item.replace(/([^a-z]*)/gi, '');
    fs.promises.readFile(path.join(pathComponents, `${tag}.html`),'utf-8').then(comp => {
      result = result.replace(item, comp);
      fs.promises.writeFile(path.join(pathProject, 'index.html'), result);
    });
  });
});

//---*Слияние CSS*---//

fs.promises.readdir(pathProject).then(data => {
  data.forEach(bundle => {
    if (bundle == 'style.css') {
      fs.promises.writeFile(path.join(pathProject, bundle), '');           
    }
  });
});

fs.promises.readdir(pathStyles).then(styles => {
  styles.forEach(style => {
    if (path.extname(style) === '.css') {
      fs.createReadStream(path.join(pathStyles, style), 'utf8').on('data', data => {
        fs.promises.appendFile(path.join(pathProject, 'style.css'), data);
      });           
    }       
  });
});