var React = require('react');

module.exports = React.createClass({
  handleClick: function (e) {
    this.props.updateGame(this.props.tile, e.altKey);
  },

  render: function () {
    var tile = this.props.tile

    var face = "",
        htmlClasses = ["tile"],
        htmlStyle = {};

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

    if (tile.board.lost()) {
      var x = Math.round((Math.random() - 0.55) * (window.innerWidth - 300));
      var y = Math.round((Math.random() - 0.55) * (window.innerHeight - 300));
      var degrees = Math.round((Math.random() - 0.5) * 1860);
      var seconds = Math.random();

      htmlStyle = {
        transform: "translate(" + x + "px, " + y + "px) rotate(" + degrees + "deg)",
        transition: "transform " + seconds + "s"
      }
    }

    return(
      <div style={htmlStyle}
        className={ htmlClasses.join(" ") }
        onClick={ this.handleClick }>
        { face }
      </div>
    );
  }
});
