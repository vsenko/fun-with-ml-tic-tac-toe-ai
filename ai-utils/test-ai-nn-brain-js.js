const fs = require('fs');

const brain = require('brain.js');

var myPerceptron = new brain.NeuralNetwork().fromJSON(JSON.parse(fs.readFileSync(__dirname + '/../ai-models/brain-trained.json')));

var trainingSet = readDataSetFromFile(__dirname + '/../data/train.csv');
console.log('Using data from training set:');
console.log(`calculated: ${trainingSet[0].output.score} predicted: ${myPerceptron.run(trainingSet[0].input).score}`);
console.log(`calculated: ${trainingSet[1].output.score} predicted: ${myPerceptron.run(trainingSet[1].input).score}`);
console.log(`calculated: ${trainingSet[2].output.score} predicted: ${myPerceptron.run(trainingSet[2].input).score}`);

var testingSet = readDataSetFromFile(__dirname + '/../data/test.csv');
console.log('Using data from testing set:');
console.log(`calculated: ${testingSet[0].output.score} predicted: ${myPerceptron.run(testingSet[0].input).score}`);
console.log(`calculated: ${testingSet[1].output.score} predicted: ${myPerceptron.run(testingSet[1].input).score}`);
console.log(`calculated: ${testingSet[2].output.score} predicted: ${myPerceptron.run(testingSet[2].input).score}`);

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
