const fs = require('fs');
const path = require('path');

function main() {
  const workingPath = path.join(__dirname, 'content/audio');
  fs.readdirSync(workingPath).forEach((fileName) => {
    const strippedName = fileName
      .replace('sound_letter_', '')
      .replace('_sound', '')
      .toLowerCase();
    fs.rename(path.join(workingPath,fileName), path.join(workingPath, strippedName), (err) => {
      if (err) throw err;
      console.log(`renamed ${fileName} to ${strippedName}`);
    });
  })
}

main();
