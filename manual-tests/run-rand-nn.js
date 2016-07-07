const Game = require('./game.js');
const aiRandom = require('./ai-random.js');
const aiNn = require('./ai-nn.js');

const options = {
  ais: [aiRandom, aiNn],
  displayFunction: function(state) {
    function beautifyCell(cell) {
      return cell || ' ';
    }

    console.log('=====');
    console.log(beautifyCell(state.field[0]), beautifyCell(state.field[1]), beautifyCell(state.field[2]));
    console.log(beautifyCell(state.field[3]), beautifyCell(state.field[4]), beautifyCell(state.field[5]));
    console.log(beautifyCell(state.field[6]), beautifyCell(state.field[7]), beautifyCell(state.field[8]));
  },
};

var game = new Game(options);

game.run((error, result) => {
  console.log(`The winner is: ${result}`);
});
