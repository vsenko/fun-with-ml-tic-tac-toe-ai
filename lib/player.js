module.exports = function Player(name, ai) {
  this.name = name;
  this.ai = ai;
  
  this.act = function act(state, callback) {
    ai.act(state, name, callback);
  };
};
