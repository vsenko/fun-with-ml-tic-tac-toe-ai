const asynk = require('async');

const Game = require('../lib/game.js');
const aiMinimax = require('../ai/ai-minimax.js');

const options = {
  ais: [aiMinimax, aiMinimax],
};

var xWins = 0;
var oWins = 0;
var draws = 0;
var i = 0;
console.time('mm-mm');
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
  console.timeEnd('mm-mm');
});
