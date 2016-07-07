const asynk = require('async');

const Game = require('../lib/game.js');
const aiRandom = require('../ai/ai-random.js');
const aiNn = require('../ai/ai-nn.js');

const options = {
  ais: [aiRandom, aiNn],
};

var xWins = 0;
var oWins = 0;
var draws = 0;
var i = 0;
console.time('rand-nn');
asynk.whilst(() => {
  if (i === 100) {
    return false;
  }

  i++;
  return true;
}, (callback) => {
  var game = new Game(options);

  game.run((error, result) => {
    if (result === 'X') {
      xWins++;
    } else if (result === 'O') {
      oWins++;
    } else if (result === 'draw') {
      draws++;
    }
    callback();
  });
}, () => {
  console.log(`X won ${xWins} times`);
  console.log(`O won ${oWins} times`);
  console.log(`There were ${draws} draws`);
  console.timeEnd('rand-nn');
});
