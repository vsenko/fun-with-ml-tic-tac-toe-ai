const asynk = require('async');
const fs = require('fs');

const Game = require('../lib/game.js');
const aiRandom = require('../ai/ai-random.js');
const aiMinimax = require('../ai/ai-minimax.js');

aiMinimax.injectDebugFunction((name, move, score) => {
  var field = move.field.map((cell) => {
    if (cell === name) {
      return 1;
    }

    if (!cell) {
      return 0.5;
    }

    return 0;
  });

  fs.appendFileSync(__dirname + '/../data/ai-minimax-debug.csv', `${field},${score / 100}\n`);
});

rMM();
mmR();
mmMM();

function rMM() {
  var xWins = 0;
  var oWins = 0;
  var draws = 0;
  var i = 0;
  console.time('rand-mm');
  asynk.whilst(() => {
    if (i === 100) {
      return false;
    }

    i++;
    return true;
  }, (callback) => {
    var game = new Game({ais: [aiRandom, aiMinimax]});

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
    console.timeEnd('rand-mm');
  });
}

function mmR() {
  var xWins = 0;
  var oWins = 0;
  var draws = 0;
  var i = 0;
  console.time('mm-rand');
  asynk.whilst(() => {
    if (i === 100) {
      return false;
    }

    i++;
    return true;
  }, (callback) => {
    var game = new Game({ais: [aiMinimax, aiRandom]});

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
    console.timeEnd('mm-rand');
  });
}

function mmMM() {
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
    var game = new Game({ais: [aiMinimax, aiMinimax]});

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
}
