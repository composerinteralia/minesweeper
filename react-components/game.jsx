var React = require('react'),
    Minesweeper = require('../game/board'),
    Board = require('board');

module.exports = React.createClass({
  getInitialState: function () {
    var board = new Minesweeper({ height: 10, width: 10, numBombs: 10 })
    return { board: board, firstTurn: true };
  },

  componentDidMount: function () {
    document.addEventListener('keypress', this._onBoardReset);
  },

  componentWillUnmount: function () {
    document.removeEventListener('keypress', this._onBoardReset);
  },

  render: function () {
    return(
      <div>

        <Board board={ this.state.board } updateGame={ this._updateGame } />

        <section className="messages">
          { this._gameOverStatus() }
          <p className="replay">{ this._replayText() }</p>
        </section>

      </div>
    );
  },

  _gameOverStatus: function () {
    var board = this.state.board

    if (board.won()) {
      return <p className="gameover won">Congratulations! You won!</p>;
    } else if (board.lost()) {
      return <p className="gameover lost">You lost!</p>;
    }
  },

  _replayText: function () {
    var board = this.state.board;

    if (!this.state.firstTurn) {
      if (board.over()) {
        return "Press enter to play again"
      } else {
        return "Press enter to start a new game"
      }
    }
  },

  _onBoardReset: function (e) {
    if (!this.state.firstTurn && e.keyCode === 13) {
      var board = new Minesweeper({ height: 10, width: 10, numBombs: 10 })
      this.setState({ board: board, firstTurn: true })
    }
  },

  _updateGame: function (tile, altKey) {
    if (this.state.board.over()) return;

    if (altKey) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }

    this.setState({ firstTurn: false });
  }

});
