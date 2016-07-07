module.exports = function State() {
  this.field = [
    '', '', '',
    '', '', '',
    '', '', '',
  ];
  
  this.isTerminal = function isTerminal() {
    var iterator;
    
    // Horizontals
    for (iterator = 0; iterator < 9; iterator += 3) {
      if (this.field[iterator] && this.field[iterator] === this.field[iterator + 1] && this.field[iterator] === this.field[iterator + 2]) {
        return this.field[iterator];
      }
    }
    
    // Vertical
    for (iterator = 0; iterator < 3; iterator++) {
      if (this.field[iterator] && this.field[iterator] === this.field[iterator + 3] && this.field[iterator] === this.field[iterator + 6]) {
        return this.field[iterator];
      }
    }
    
    // Diagonal
    if (this.field[0] && this.field[0] === this.field[4] && this.field[0] === this.field[8]) {
      return this.field[0];
    }
    if (this.field[2] && this.field[2] === this.field[4] && this.field[2] === this.field[6]) {
      return this.field[2];
    }
    
    var allCellsAreUsed = this.field.every((cell) => {
      return cell;
    });
    
    if (allCellsAreUsed) {
      return 'draw';
    }
    
    return false;
  };
  
  this.cloneState = function cloneState() {
    var newState = new State();
    newState.field = this.field.slice();
    return newState;
  };
};
