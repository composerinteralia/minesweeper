var React = require('react'),
    Tile = require('tile');

module.exports = React.createClass({
  render: function () {
    return(
      <ul className="board">
        { this._tiles() }
      </ul>
    );
  },

  _tiles: function () {
    var that = this;

    return this.props.board.grid.map(function (row, rowIdx) {
      return (

        <li className="row group" key={ rowIdx }>
          { row.map(function (tile, colIdx) {
            return (
              <Tile
                tile={ tile }
                key={ colIdx }
                updateGame={ that.props.updateGame }/>
            );
          })}
        </li>

      );
    })

  }

});
