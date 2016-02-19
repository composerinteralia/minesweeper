var ScoreStore = require('../stores/score_store')

module.exports = {
  getScores: function () {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        if(xmlhttp.status == 200){
          var response = JSON.parse(xmlhttp.responseText);
          ScoreStore.receiveScores(response);
        }
      }
    }

    xmlhttp.open('GET', '/scores');
    xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send();
  },

  createScore: function (data, success) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        if(xmlhttp.status == 200){
          var response = JSON.parse(xmlhttp.responseText);
          ScoreStore.receiveSingleScore(response);
        }
      }
    }

    xmlhttp.open('POST', '/scores');
    xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(data));
  }

}
