site.views.PickerView = Backbone.View.extend({
  events: {
    'click #Infantry': 'infantryClick',
    'click #Ranged': 'rangedClick',
    'click #Cavalry': 'cavalryClick'
  },

  infantryClick: function () {
    // return if collection is full
    if(this.collection.length >= 5){
      site.events.trigger("prepare");
      console.log("picked too many!");
      return;
    }
    // add infantry to collection
    var tmpUnitModel = new site.models.InfantryModel();
    this.collection.push(tmpUnitModel);
    this.getCollection();
  },

  rangedClick: function () {
    // return if collection is full
    if(this.collection.length >= 5){
      site.events.trigger("prepare");
      console.log("picked too many!");
      return;
    }
    // add infantry to ranged
    var tmpUnitModel = new site.models.RangedModel();
    this.collection.push(tmpUnitModel);
    this.getCollection();
  },

  cavalryClick: function () {
    // return if collection is full
    if(this.collection.length >= 5){
      site.events.trigger("prepare");
      console.log("picked too many!");
      return;
    }
    // add infantry to cavalry
    var tmpUnitModel = new site.models.CavalryModel();
    this.collection.push(tmpUnitModel);
    this.getCollection();
  },

  getCollection: function () {
    // fill list with proper units
    this.collection.forEach(function (unit, index) {
      switch (index) {
        case 0:
          $("#unit1").html(unit.name);
          break;
        case 1:
          $("#unit2").html(unit.name);
          break;
        case 2:
          $("#unit3").html(unit.name);
          break;
        case 3:
          $("#unit4").html(unit.name);
          break;
        case 4:
          $("#unit5").html(unit.name);
          break;
      }
    });
  }
});
