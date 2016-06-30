site.models.InfantryModel = site.models.UnitModel.extend({
  initialize: function(){
    this.name = "Infantry";
    this.health = 300;
    this.attack = 400; //x1
    this.speed = 1;
    this.range = false;
  }
});
