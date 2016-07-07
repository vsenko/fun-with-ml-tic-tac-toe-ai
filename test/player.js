const assert = require('assert');

const Player = require('../lib/player.js');


describe('player', () => {
  it('constructor should work correctly', function () {
    const player = new Player('name', 'ai');
    assert.equal('name', player.name);
    assert.equal('ai', player.ai);
  });

  it('act function should work correctly', function (done) {
    const ai = {
      act: function(state, name, callback) {
        assert.equal('state', state);
        assert.equal('name', name);
        callback('error', 'result');
      },
    };

    const player = new Player('name', ai);
    player.act('state', (error, result) => {
      assert.equal('error', error);
      assert.equal('result', result);
      done();
    });
  });
});
