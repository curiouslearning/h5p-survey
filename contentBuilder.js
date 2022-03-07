const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const readline = require('readline-sync');
const semantics = require('./src/semantics.json');

const missingFiles = [];

const initializeContent = (id, type, semantics, content) => {
  for (let field in semantics) { let obj = semantics[field];
    let name = obj.name;
    switch (semantics[field].type) {
      case "group":
        if(obj['fields']) {
          content[name] = initializeContent(obj.fields, {});
        } else {
          content[name] = [];
        }
        break;
      case "list":
        content[name] = [];
        break;
      case "select":
        if(!obj.default) {
          content[name] = null;
        } else {
          content[name] = obj.default;
        }
        break;
      case 'video':
        content[name] = '';
      default:
        content[name] = obj.default;
    }
    if(name === 'surveyId') {
      content[name] = id
    } else if (name === 'surveyType') {
      content[name] = type;
    }
  }
  return content;
}
const generateBuckets = (paths, content) => {

  fs.createReadStream(`./${paths.bucketsPath}`)
    .pipe(csv())
    .on('data', (row) => {
      const targets = row.Items.split(',');
      if(!content['buckets']){
          content['buckets']= [];
      }
      checkForFile(paths.feedbackAudio);
      content.buckets.push({
        bucketName: `${row.Bucket}`,
        level: Number(row.Bucket),
        targets: [],
        successfulTextFeedback: 'Great Job!',
        successfulAudio: [{
          path: paths.feedbackAudio,
          mime: `audio\/x-wav`,
          copyright: {
            license: 'U'
          }
        }],
        wrongTextFeedback: 'Great Job!',
        successAnimation: "pirate-random",
      });
      const index = content.buckets.length - 1;
      targets.forEach((target) => {
        const audioPath = `audio/${target.trim().toLowerCase()}.wav`;
        const imagePath = `images/${target.trim().toLowerCase()}.png`;
        const hasAudio = checkForFile(audioPath);
        const hasImage = checkForFile(imagePath);
        let targetObject = {
          text: target.replace(' ', '')
        };
        if (hasImage) {
          targetObject['image'] = {
            path: imagePath,
            mime: 'image\/jpeg',
            width: 512,
            height: 512,
            copyright: {
              license: 'U'
            }
          }
        }
        if (hasAudio) {
          targetObject['audioFile'] = [{
              path: audioPath,
              mime: 'audio\/x-wav',
              copyright: {
                license: 'U'
              }
            }]
        }
        content.buckets[index].targets.push(targetObject);
      });
    })
    .on('end', () => {
      console.log(`successfully generated ${content.buckets.length} buckets`);
      generateUiText(paths, content);
    });
};

const generateUiText = (paths, content) => {
  console.log('generating ui text fields...');
  const stream = fs.createReadStream(`./${paths.uiPath}`)
    .pipe(csv())
    .on('data', (row) => {
      if(!content.uiText) {
        content['uiText'] = [];
        console.log('adding uiText object');
      }

      content.uiText[row['Field Name']] = row.Value;
    })
    .on('end', () => {
      console.log(`successfully built ${content.uiText.length} uiText fields`);
      writeToFile(content);
    });
};
const writeToFile = (content) => {
  console.log('writing content to file: ');
  fs.writeFile('content/content.json', JSON.stringify(content, null, '\t'), (err) => {
    if(err) {
      console.error(e);
    }
    else {
      console.log('Sucessfully generated content JSON file');
    }
  });
};

const checkForFile = (filePath) => {
  const fullPath = path.join(__dirname, `content/${filePath}`);
  if(!fs.existsSync(fullPath)){
      console.warn(`No file exists at ${fullPath}!`);
      missingFiles.push(fullPath);
      return false;
  }
  return true;
}
const main = () => {
  let surveyId = readline.question('Enter survey ID: ');
  let typeInput = readline.question('Enter survey type (1=Other, 2=OralVocab, 3=LetterSound, 4=ReadingVocab, 5=SightWords, 6=PseudoWords):\n');
  const surveyType = parseInt(typeInput);
  console.log('Building content.json');
  console.log('initializing content object according to semantics file...');
  let content = initializeContent(surveyId, surveyType, semantics, {});
  console.log('success');
  let bucketsPath = readline.question('Enter Buckets file name/path: ');
  let uiPath = readline.question('Enter uiText file name/path: ');
  let feedbackAudio = readline.question('Enter feedback audio file name/path: ');
  console.log('generating buckets...');
  generateBuckets({bucketsPath, uiPath, feedbackAudio}, content);
  fs.writeFile('log.txt', JSON.stringify(missingFiles), function (err) {
    if (err) {
      console.error(err);
    }
  });
}

main();
