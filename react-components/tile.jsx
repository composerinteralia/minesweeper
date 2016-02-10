var React = require('react');

module.exports = React.createClass({
  handleClick: function (e) {
    this.props.updateGame(this.props.tile, e.altKey);
  },

  render: function () {
    var tile = this.props.tile

    var face = "",
        htmlClasses = ["tile"];

    if (tile.explored) {
      htmlClasses.push("explored");

      if (tile.bombed) {
        htmlClasses.push("bombed");
        face = <span className="bomb" >💣</span>;

      } else {
        var count = tile.adjacentBombCount();
        htmlClasses.push("bomb-count-" + count)
        face = count || "";
      }

    } else if (tile.flagged) {
      htmlClasses.push("flagged")
      face = "⚑";
    }

    return(
      <div className={ htmlClasses.join(" ") } onClick={ this.handleClick }>{ face }</div>
    );
  }
});
