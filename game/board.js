var Tile = require('./tile');

var Board = function (gridSize, numBombs) {
  this.gridSize = gridSize;
  this.grid = [];
  this.numBombs = numBombs;
  this.generateBoard();
  this.plantBombs();
};

Board.prototype.generateBoard = function () {
  for (var i = 0; i < this.gridSize; i++) {
    this.grid.push([]);
    for (var j = 0; j < this.gridSize; j++) {
      var tile = new Tile(this, [i, j]);
      this.grid[i].push(tile);
    }
  }
};

Board.prototype.onBoard = function (pos) {
  return (
    pos[0] >= 0 && pos[0] < this.gridSize &&
      pos[1] >= 0 && pos[1] < this.gridSize
  );
};

Board.prototype.plantBombs = function () {
  var totalPlantedBombs = 0;
  while (totalPlantedBombs < this.numBombs) {
    var row = Math.floor(Math.random() * (this.gridSize - 1));
    var col = Math.floor(Math.random() * (this.gridSize - 1));

    tile = this.grid[row][col];
    if (!tile.bombed) {
      tile.plantBomb();
      totalPlantedBombs++;
    }
  }
};

Board.prototype.lost = function () {
  var lost = false;
  this.grid.forEach(function(row) {
    row.forEach(function(tile) {
      if (tile.bombed && tile.explored) {
        lost = true;
      }
    });
  });
  return lost;
};

Board.prototype.won = function () {
  var won = true;
  this.grid.forEach(function(row) {
    row.forEach(function(tile) {
      if (!tile.explored && !tile.bombed) {
        won = false;
      }
    });
  });
  return won;
};

module.exports = Board;
