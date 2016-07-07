const crypto = require('crypto');
const fs = require('fs');

const brain = require('brain.js');

var nn = new brain.NeuralNetwork().fromJSON(JSON.parse(fs.readFileSync(__dirname + '/../ai-models/brain-trained.json')));

var debugFunction = function(name, move, score) {

};

exports.injectDebugFunction = function injectDebugFunction(newDebugFunction) {
  debugFunction = newDebugFunction;
};

exports.act = function act(state, name, callback) {
  const possibleMoves = [];
  state.field.forEach((cell, index) => {
    if (!cell) {
      var testedMove = state.cloneState();
      testedMove.field[index] = name;
      possibleMoves.push({
        move: testedMove,
        score: testMove(testedMove, name, (name === 'X') ? 'O' : 'X'),
      });
    }
  });

  var bestScore = 0;
  var bestMoves = [possibleMoves[0].move];
  possibleMoves.forEach((move) => {
    debugFunction(name, move.move, move.score);

    if (move.score > bestScore) {
      bestScore = move.score;
      bestMoves = [move.move];
    } else if (move.score === bestScore) {
      bestMoves.push(move.move);
    }
  });

  var randomByte = crypto.randomBytes(1)[0];
  var randomValue = randomByte / 256;
  var randomMove = Math.round(randomValue * (bestMoves.length - 1));

  process.nextTick(() => {
    callback(null, bestMoves[randomMove]);
  });
};

function testMove(state, me) {
  var input = {};
  for (var i = 0; i < state.field.length; i++) {
    if (state.field[i] === me) {
      input['cell' + i] = 1;
    } else if (!state.field[i]) {
      input['cell' + i] = 0.5;
    } else {
      input['cell' + i] = 0;
    }
  }

  var preditcion = nn.run(input);

  return Math.round(preditcion.score * 100);
}
