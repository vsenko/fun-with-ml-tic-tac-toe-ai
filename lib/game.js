const State = require('./state.js');
const Player = require('./player.js');

/**
 * Game class
 * 
 * options: {
 *  [{State} state] - initial state
 *  [{Player[]} players] - you can set players
 *  [{Ai[]} ais] - or AIs for players (one of these two MUST be set)
 *  [{function} displayFunction] - function to call on each turn with state as parameter
 * }
 * 
 * function run(callback) - run the game
 * callback (error, result)
 * error - error
 * result - game result
 */
module.exports = function Game(options) {
  var state = this.state = options.state ? options.state : new State();
  const players = this.players = options.players ? options.players : [new Player('X', options.ais[0]), new Player('O', options.ais[1])];
  const displayFunction = this.displayFunction = options.displayFunction ? options.displayFunction : function displayFunction() {};
  
  var current = 0;
  function processTurn(callback) {
    players[current].act(state, (error, newState) => {
      state = newState;
      current = (current + 1) % 2;
      
      displayFunction(state);
      
      if (state.isTerminal()) {
        return process.nextTick(() => {
          callback(null, state.isTerminal());
        });
      }
      
      process.nextTick(() => {
        callback();
      });
    });
  }
  
  this.run = function run(callback) {
    processTurn((error, done) => {
      if (!done) {
        return process.nextTick(() => {
          run(callback);
        });
      }
      
      process.nextTick(() => {
        callback(error, done);
      });
    });
  };
};
