site.routers.AppRouter = Backbone.Router.extend({
    routes: {
        "": "picker",
        "picker": "picker",
        "battle": "battle",
        "score": "score"
    },

    picker: function(){
      $('#picker_content').show();
      $('#battle_content').hide();
      $('#score_content').hide();
    },
    battle: function(){
      $('#picker_content').hide();
      $('#battle_content').show();
      $('#score_content').hide();
    },
    score: function() {
      $('#picker_content').hide();
      $('#battle_content').hide();
      $('#score_content').show();
    }
});
