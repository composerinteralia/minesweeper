var React = require('react'),
    Minesweeper = require('../game/board'),
    Board = require('board');

module.exports = React.createClass({
  getInitialState: function () {
    return { board: new Minesweeper(10, 10), firstTurn: true };
  },

  componentDidMount: function () {
    document.addEventListener('keypress', function (e) {
      if (!this.state.firstTurn && e.keyCode === 13) {
        this.setState({ board: new Minesweeper(10, 10), firstTurn: true })
      }
    }.bind(this));
  },

  componentWillUnmount: function () {
    document.removeEventListener('keypress');
  },

  render: function () {
    var board = this.state.board

    var gameOver;
    if (board.won()) {
      gameOver = <p className="gameover won">Congratulations! You won!</p>;
    } else if (board.lost()) {
      gameOver = <p className="gameover lost">You lost!</p>;
    }

    var replayText;
    if (!this.state.firstTurn) {
      if (board.won() || board.lost()) {
        replayText = "Press enter to play again"
      } else {
        replayText = "Press enter to start a new game"
      }
    }

    return(
      <div>
        <Board board={this.state.board} updateGame={this._updateGame} />
        <section className="messages">
          { gameOver }
          <p className="replay">{replayText}</p>
        </section>
      </div>
    );
  },

  _updateGame: function (tile, altKey) {
    if (altKey) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }

    this.setState({ firstTurn: false });
  }
});
