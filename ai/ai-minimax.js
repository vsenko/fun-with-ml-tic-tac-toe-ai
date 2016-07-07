const crypto = require('crypto');

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
        possibleResults: testMove(testedMove, name, (name === 'X') ? 'O' : 'X', 1),
      });
    }
  });
  
  var bestScore = 0;
  var bestMoves = [possibleMoves[0].move];
  possibleMoves.forEach((move) => {
    var score = Math.round(move.possibleResults.wins * 100 / (move.possibleResults.wins + move.possibleResults.loss * 2 + move.possibleResults.draws));
    
    debugFunction(name, move.move, score);
    
    if (score > bestScore) {
      bestScore = score;
      bestMoves = [move.move];
    } else if (score === bestScore) {
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

function testMove(state, me, enemy, depth) {
  var terminalState = state.isTerminal();
  if (terminalState) {
    return {
      wins: ((terminalState === me) ? 1 : 0) * (9 - depth),
      loss: ((terminalState === enemy) ? 1 : 0) * (9 - depth),
      draws: (terminalState === 'draw') ? 1 : 0,
    };
  }
  
  const possibleMoves = [];
  state.field.forEach((cell, index) => {
    if (!cell) {
      var testedMove = state.cloneState();
      testedMove.field[index] = me;
      possibleMoves.push({
        move: testedMove,
        possibleResults: testMove(testedMove, enemy, me, depth + 1), // Swap me and enemy because it's his turn
      });
    }
  });
  
  var score = {
    wins: 0,
    loss: 0,
    draws: 0,
  };
  possibleMoves.forEach((move) => {
    score.wins += move.possibleResults.loss; // Swap results because it was enemies turn
    score.loss += move.possibleResults.wins;
    score.draws += move.possibleResults.draws;
  });
  
  return score;
}