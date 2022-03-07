const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/sync');
function main() {
  const localizations = csv.parse(fs.readFileSync('csv/Zulu/localizations.csv'), {delimiter: ','});
  localizations.forEach((pair) => pair[0] = pair[0].replace(',', '').trim());
  // console.log(localizations);
  const audioPath = path.join(__dirname, 'content/images');
  localize(audioPath, localizations);
}

function localize(workingPath, localizations) {
  fs.readdirSync(workingPath).forEach((fileName) => {
    const word = fileName.replace('.png', '');
    const locPair = localizations.find(pair => pair[1] === word)
    if(locPair) {
      fs.rename(path.join(workingPath, fileName), path.join(workingPath, `${locPair[0]}.png`), (err) => {
        if (err) throw err;
        console.log(`renamed ${fileName} to ${locPair[0]}`);
      });
    }
      })
}

main();
