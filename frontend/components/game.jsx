var React = require('react'),
    Minesweeper = require('../game/board'),
    Board = require('board'),
    Display = require('display')
    ScoreUtil = require('../util/score_util'),
    ScoreStore = require('../stores/score_store');

module.exports = React.createClass({
  getInitialState: function () {
    var board = new Minesweeper({ height: 10, width: 10, numBombs: 10 })
    return {
      board: board,
      firstTurn: true,
      time: 0,
      initials: "",
      scores: ScoreStore.get()
    };
  },

  componentDidMount: function () {
    this.scoreToken = ScoreStore.addListener(this._onScoreChange);
    ScoreUtil.getScores()

    document.addEventListener('keypress', this._onEnter);
  },

  componentWillUnmount: function () {
    ScoreStore.removeListner(this.scoreToken);

    document.removeEventListener('keypress', this._onEnter);
    clearInterval(this.timer)
  },

  render: function () {
    var board = this.state.board;

    return(
      <main>
        <div className="game group">
          <Board board={ board } updateGame={ this._updateGame } >
            <Display time={ this.state.time } bombCount={ board.bombCount() }/>
          </Board>

          { this._highScores() }
        </div>

        <section className="messages">
          { this._gameOverStatus() }
          <p className="replay">{ this._replayText() }</p>
        </section>
      </main>
    );
  },

  _gameOverStatus: function () {
    var board = this.state.board

    if (board.won()) {
      return (
        <div>
          <p className="gameover won">
            Congratulations! You won in { this.state.time } seconds
          </p>

          <form className="initials group">
            <label htmlFor="initials">Enter your initials: </label>
            <input
              id="initials"
              type="text"
              tabIndex="1"
              onChange={ this._setInitials }
              value={ this.state.initials }>
            </input>
          </form>
        </div>
      );
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

  _onEnter: function (e) {
    if (!this.state.firstTurn && e.keyCode === 13) {
      e.preventDefault();
      clearInterval(this.timer)

      this._scoreSubmit()

      var board = new Minesweeper({ height: 10, width: 10, numBombs: 10 })
      this.setState({ board: board, firstTurn: true, time: 0 })
    }
  },

  _onScoreChange: function () {
    this.setState({ scores: ScoreStore.get() })
  },

  _highScores: function () {
    return (
      <div className="scores">
        <h3>High Scores</h3>
        <table><tbody>
          { this.state.scores.map(function (score, i) {
            return (
              <tr key={ score.id }>
                <td>{ i + 1 + "." }</td>
                <td>{ score.initials }:</td>
                <td>{ score.score }</td>
              </tr>
            )
          })}
        </tbody></table>
      </div>
    )
  },

  _scoreSubmit: function () {
    if (this.state.initials && this.state.board.won()) {
      ScoreUtil.createScore({
        score: {
          score: this.state.time,
          initials: this.state.initials
        }
      })
    }
  },

  _setInitials: function (e) {
    this.setState({ initials: e.target.value.slice(0,3) });
  },

  _updateGame: function (tile, altKey) {
    var board = this.state.board

    if (board.over()) return;

    if (this.state.firstTurn) {
      this.timer = setInterval(function () {
        this.setState({ time: this.state.time + 1 })
      }.bind(this), 1000)

      if (tile.bombed) {
        board.exchange(tile)
      }
    }

    if (altKey) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }

    if (board.over()) {
      clearInterval(this.timer);
    }

    this.setState({ firstTurn: false });
  }

});
