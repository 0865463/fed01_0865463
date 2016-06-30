site.views.ScoreView = Backbone.View.extend({
  initialize: function () {
    site.events.on("finish", this.getScores, this);
  },

  getScores: function () {
    // check total health left -> final score
    totalHealth = 0;
    this.collection.forEach(function (unit, index) {
      if(unit.health <= 0){
          return;
      }
      totalHealth += unit.health;
    });
    $("#finalScore").html('<h1>Your final score is: <b>'+totalHealth+'</b></h1>');
  }
});
