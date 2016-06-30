(function () {
  site.init = function(){
    // hide fight button for clarity
    $("#fight_button").hide();

    // router
    var app_router = new site.routers.AppRouter();

    // collections
    var unitCollection = new site.collections.UnitCollection();
    var randomizedUnitCollection = new site.collections.UnitCollection();
    for(var i = 0; i < 5; i++){
      var rnd = Math.floor(Math.random() * 3);
      switch (rnd) {
        case 0:
          randomizedUnitCollection.add(new site.models.InfantryModel());
          break;
        case 1:
          randomizedUnitCollection.add(new site.models.RangedModel());
          break;
        case 2:
          randomizedUnitCollection.add(new site.models.CavalryModel());
          break;
      }
    };

    // views
    new site.views.PickerView({el: "#picker_content", collection: unitCollection});
    new site.views.BattleView({el: "#battle_content", collection: {p1: unitCollection, p2: randomizedUnitCollection}});
    new site.views.ScoreView({el: "#score_content", collection: unitCollection});

    // start history
    Backbone.history.start();
  };

  site.$document.on('ready', site.init);
}) ();
