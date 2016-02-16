var React = require('react');

var nums = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine"
};

module.exports = React.createClass({
  render: function () {
    var ones = nums[this.props.time % 10]
    var tens = nums[Math.floor(this.props.time / 10) % 10]
    var hundreds = nums[Math.floor(this.props.time / 100) % 10]

    return (
      <ul className="timer group">
          <li className={"num " + hundreds}></li>
          <li className={"num " + tens}></li>
          <li className={"num " + ones}></li>
      </ul>
    )
  }
});
