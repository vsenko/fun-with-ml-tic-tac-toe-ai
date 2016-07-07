const fs = require('fs');

const brain = require('brain.js');

var myPerceptron = new brain.NeuralNetwork({hiddenLayers: [100, 100, 100]});

function readDataSetFromFile(fileName) {
  var fileData = fs.readFileSync(fileName, {encoding: 'utf8'});
  var fileLines = fileData.split('\n');
  var dataSet = fileLines.map((item) => {
    var itemElements = item.split(',');
    var input = {};
    var output = {score: Number.parseFloat(itemElements[itemElements.length - 1])};
    for(var i = 0; i < itemElements.length - 1; i++) {
      input['cell' + i] = Number.parseFloat(itemElements[i]);
    }
    return {
      input: input,
      output: output,
    }
  });
  return dataSet.slice(0, dataSet.length - 1);
}

var trainingSet = readDataSetFromFile('./data/train.csv');
console.log(`training set length: ${trainingSet.length}`);

myPerceptron.train(trainingSet,{
  errorThresh: .0005,
  iterations: 20000,
  log: true,
  logPeriod: 10,
});

var testingSet = readDataSetFromFile('./data/test.csv');
console.log(`testing set length: ${testingSet.length}`);

fs.writeFileSync('./ai-models/brain-trained.json', JSON.stringify(myPerceptron.toJSON()));
