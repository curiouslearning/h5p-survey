const fs = require('fs');
const path = require('path');

function main() {
  const audioPath = path.join(__dirname, 'content/audio');
  const imagePath = path.join(__dirname, 'content/images');
  lowerCase(audioPath);
  lowerCase(imagePath);
}

function lowerCase(workingPath) {
  fs.readdirSync(workingPath).forEach((fileName) => {
    const lowerCased = fileName.toLowerCase();
    fs.rename(path.join(workingPath, fileName), path.join(workingPath, lowerCased), (err) => {
      if (err) throw err;
      console.log(`renamed ${fileName} to ${lowerCased}`);
    });
  })
}

main();
