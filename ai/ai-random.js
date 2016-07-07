const crypto = require('crypto');

exports.act = function act(state, name, callback) {
  const newState = state.cloneState();
  
  const possibleMoves = [];
  newState.field.forEach((cell, index) => {
    if (!cell) {
      possibleMoves.push(index);
    }
  });
  
  const randomByte = crypto.randomBytes(1)[0];
  const randomValue = randomByte / 256;
  const randomMove = Math.round(randomValue * (possibleMoves.length - 1));
  const move = possibleMoves[randomMove];
  newState.field[move] = name;
  
  process.nextTick(() => {
    callback(null, newState);
  });
};
