var React = require('react'),
    Minesweeper = require('../game/board'),
    Board = require('board');

module.exports = React.createClass({
  getInitialState: function () {
    return { board: new Minesweeper(10, 10) };
  },

  render: function () {
    var gameOver;
    if (this.state.board.won()) {
      gameOver = <div className="gameover won">Congratulations! You won!</div>;
    } else if (this.state.board.lost()) {
      gameOver = <div className="gameover lost">You lost! Try again!</div>;
    }

    return(
      <div>
        <Board board={this.state.board} updateGame={this._updateGame} />
        { gameOver }
      </div>
    );
  },

  _updateGame: function (tile, altKey) {
    if (altKey) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }

    this.forceUpdate();
  }
});
