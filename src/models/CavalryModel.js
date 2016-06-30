site.models.CavalryModel = site.models.UnitModel.extend({
  initialize: function(){
    this.name = "Cavalry";
    this.health = 400;
    this.attack = 100; //x2
    this.speed = 2;
    this.range = false;
  }
});
