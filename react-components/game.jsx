var React = require('react'),
    Minesweeper = require('../game/board'),
    Board = require('board');

module.exports = React.createClass({
  getInitialState: function () {
    return { board: new Minesweeper(10, 10), firstTurn: true };
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
      if (board.won() || board.lost()) {
        return "Press enter to play again"
      } else {
        return "Press enter to start a new game"
      }
    }
  },

  _onBoardReset: function (e) {
    if (!this.state.firstTurn && e.keyCode === 13) {
      this.setState({ board: new Minesweeper(10, 10), firstTurn: true })
    }
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
