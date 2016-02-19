var _callbacks = {},
    _token = 0,
    _scores = []

module.exports = {
  addListener: function (fn) {
    _token++

    _callbacks[_token] = fn

    return _token
  },

  get: function () {
    return _scores.slice()
  },

  removeListener: function (token) {
    delete _callbacks(token)
  },

  receiveScores: function (scores) {
    _scores = scores
    this._emitChange();
  },

  receiveSingleScore: function (newScore) {
    var index = _scores.findIndex(function (score) {
      return score.score > newScore.score
    })

    if (index === -1) {
      _scores.push(newScore);
    } else {
      _scores.splice(index, 0, newScore)
    }

    _scores = _scores.slice(0, 10)

    this._emitChange();
  },

  _emitChange: function () {
    for (var token in _callbacks) {
      _callbacks[token]();
    }
  }
}
