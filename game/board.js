var Tile = require('./tile');

Array.prototype.sample = function (size) {
  var els = this.slice(),
      result = [],
      index;

  while (result.length < size) {
    index = Math.floor(Math.random() * els.length);
    result.push(els[index]);
    els.splice(index, 1);
  }

  return result
};

var Board = function (options) {
  this.height = options.height;
  this.width = options.width;
  this.numBombs = options.numBombs;
  this.grid = [];
  this.generateGrid();
  this.plantBombs();
};

Board.prototype.generateGrid = function () {
  for (var i = 0; i < this.height; i++) {

    var row = []

    for (var j = 0; j < this.width; j++) {
      var tile = new Tile(this, [i, j]);
      row.push(tile);
    }

    this.grid.push(row);
  }
};

Board.prototype.onBoard = function (pos) {
  return (
    pos[0] >= 0 && pos[0] < this.height &&
      pos[1] >= 0 && pos[1] < this.width
  );
};

Board.prototype.tiles = function () {
  var tiles = [];

  this.grid.forEach(function (row) {
    row.forEach(function (tile) {
      tiles.push(tile);
    })
  })

  return tiles;
};

Board.prototype.plantBombs = function () {
  var vulnerableTiles = this.tiles().sample(this.numBombs)

  vulnerableTiles.forEach(function (tile) {
    tile.plantBomb();
  })
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

Board.prototype.over = function () {
  return this.won() || this.lost();
};

module.exports = Board;
