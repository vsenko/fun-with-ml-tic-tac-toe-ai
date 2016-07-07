const assert = require('assert');

const State = require('../lib/state.js');

describe('state', () => {
  it('constructor should work correctly', function () {
    var state = new State();
    assert.equal(state.field.length, 9);
    assert.equal(state.field[0], '');
    assert.equal(state.field[8], '');
  });

  it('cloneState should work correctly', function () {
    var state = new State();
    state.field[0] = 'X';
    state.field[4] = 'O';

    var newState = state.cloneState();
    assert.equal(newState.field.length, 9);
    assert.equal(newState.field[0], 'X');
    assert.equal(newState.field[4], 'O');
    assert.equal(newState.field[8], '');
  });

  it('horizontal terminal states should be detected correctly', function () {
    var state = new State();

    state.field = [
      'X', 'X', 'X',
      '', '', '',
      '', '', '',
    ];
    assert.equal(state.isTerminal(), 'X');

    state.field = [
      '', '', '',
      'X', 'X', 'X',
      '', '', '',
    ];
    assert.equal(state.isTerminal(), 'X');

    state.field = [
      '', '', '',
      '', '', '',
      'X', 'X', 'X',
    ];
    assert.equal(state.isTerminal(), 'X');
  });

  it('vertical terminal states should be detected correctly', function () {
    var state = new State();

    state.field = [
      'O', '', '',
      'O', '', '',
      'O', '', '',
    ];
    assert.equal(state.isTerminal(), 'O');

    state.field = [
      '', 'O', '',
      '', 'O', '',
      '', 'O', '',
    ];
    assert.equal(state.isTerminal(), 'O');

    state.field = [
      '', 'O', '',
      '', 'O', '',
      '', 'O', '',
    ];
    assert.equal(state.isTerminal(), 'O');
  });

  it('diagonal terminal states should be detected correctly', function () {
    var state = new State();

    state.field = [
      'O', '', '',
      '', 'O', '',
      '', '', 'O',
    ];
    assert.equal(state.isTerminal(), 'O');

    state.field = [
      '', '', 'X',
      '', 'X', '',
      'X', '', '',
    ];
    assert.equal(state.isTerminal(), 'X');
  });

  it('draw terminal states should be detected correctly', function () {
    var state = new State();

    state.field = [
      'O', 'X', 'O',
      'X', 'O', 'X',
      'X', 'X', 'O',
    ];
    assert.equal(state.isTerminal(), 'O');

    state.field = [
      'X', 'O', 'X',
      'O', 'O', 'X',
      'X', 'X', 'O',
    ];
    assert.equal(state.isTerminal(), 'draw');
  });

  it('non terminal states should be detected correctly', function () {
    var state = new State();

    state.field = [
      'O', '', 'O',
      'X', '', 'X',
      'X', 'X', 'O',
    ];
    assert.equal(state.isTerminal(), false);

    state.field = [
      'X', 'O', 'X',
      'O', 'O', 'X',
      'X', '', 'O',
    ];
    assert.equal(state.isTerminal(), false);
  });
});
