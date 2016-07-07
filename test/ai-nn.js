const assert = require('assert');

const aiNn = require('../ai/ai-nn.js');
const State = require('../lib/state.js');

describe('ai-nn', () => {
  it('act function should work correctly with one empty cell', function (done) {
    var state = new State();
    state.field = [
      'X', 'X', 'X',
      'X', 'X', 'X',
      'X', 'X', '',
    ];

    aiNn.act(state, 'O', (error, newState) => {
      assert.equal(newState.field[8], 'O');
      done();
    });
  });

  it('act function should work correctly with several empty cells', function (done) {
    var state = new State();
    state.field = [
      'X', '', 'X',
      '', 'O', 'X',
      'X', 'O', '',
    ];

    aiNn.act(state, 'O', (error, newState) => {
      const oCells = [];
      newState.field.forEach((cell, index) => {
        if (cell === 'O') {
          oCells.push(index);
        }
      });

      assert.equal(oCells.length, 3);
      assert.ok([1, 3, 8].indexOf(oCells[0]) !== -1);
      done();
    });
  });

  it('act function should work correctly with a lot of empty cells', function (done) {
    var state = new State();
    state.field = [
      'X', '', '',
      '', '', '',
      '', '', '',
    ];

    aiNn.act(state, 'O', (error, newState) => {
      const oCells = [];
      newState.field.forEach((cell, index) => {
        if (cell === 'O') {
          oCells.push(index);
        }
      });

      assert.equal(oCells.length, 1);
      assert.ok([1, 2, 3, 4, 5, 6, 7, 8].indexOf(oCells[0]) !== -1);
      done();
    });
  });
});
