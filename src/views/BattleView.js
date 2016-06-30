site.views.BattleView = Backbone.View.extend({
  events: {
    'click #prepare_button': 'prepare',
    'click #fight_button': 'fight'
  },

  initialize: function () {
    site.events.on("prepare", this.prepare, this);
  },

  prepare: function () {
    // cancel if player units arent enough
    if (this.collection.p1.length < 5){
      console.log('Not enough units to compete!');
      return;
    }

    // show and hide proper buttons
    $('#fight_button').show();
    $('#prepare_button').hide();

    // fill p1 units
    this.collection.p1.forEach(function (unit, index){
      switch (index) {
        case 0:
          if(unit.health <= 0){
            $("#p1_unit1").css({"color": "red"});
          }
          $("#p1_unit1").html(unit.name);
          break;
        case 1:
          if(unit.health <= 0){
            $("#p1_unit2").css({"color": "red"});
          }
          $("#p1_unit2").html(unit.name);
          break;
        case 2:
          if(unit.health <= 0){
            $("#p1_unit3").css({"color": "red"});
          }
          $("#p1_unit3").html(unit.name);
          break;
        case 3:
          if(unit.health <= 0){
            $("#p1_unit4").css({"color": "red"});
          }
          $("#p1_unit4").html(unit.name);
          break;
        case 4:
          if(unit.health <= 0){
            $("#p1_unit5").css({"color": "red"});
          }
          $("#p1_unit5").html(unit.name);
          break;
      }
    });

    // fill p2 units
    this.collection.p2.forEach(function (unit, index){
      switch (index) {
        case 0:
          if(unit.health <= 0){
            $("#p2_unit1").css({"color": "red"});
          }
          $("#p2_unit1").html(unit.name);
          break;
        case 1:
          if(unit.health <= 0){
            $("#p2_unit2").css({"color": "red"});
          }
          $("#p2_unit2").html(unit.name);
          break;
        case 2:
          if(unit.health <= 0){
            $("#p2_unit3").css({"color": "red"});
          }
          $("#p2_unit3").html(unit.name);
          break;
        case 3:
          if(unit.health <= 0){
            $("#p2_unit4").css({"color": "red"});
          }
          $("#p2_unit4").html(unit.name);
          break;
        case 4:
          if(unit.health <= 0){
            $("#p2_unit5").css({"color": "red"});
          }
          $("#p2_unit5").html(unit.name);
          break;
      }
    });
  },

  fight: function () {
    // clear the timer if needed
    clearTimeout();

    // color dead units red
    this.prepare();

    // create exception to break out of the foreach
    var BreakException = {};

    // create units for battle
    var unitp1 = null;
    var unitp2 = null;

    // get living unit p1
    try {
      this.collection.p1.forEach(function (unit, index) {
        // check if unit has health
        if(unit.health <= 0){
          return;
        }
        unitp1 = unit;
        // stop foreach when a unit is found
        throw BreakException;
      });
    } catch (e){
      if (e !== BreakException) throw e;
    }

    // get living unit p2
    try {
      this.collection.p2.forEach(function (unit, index) {
        // check if unit has health
        if(unit.health <= 0){
          return;
        }
        unitp2 = unit;
        // stop when a unit is found
        throw BreakException;
      });
    } catch (e){
      if (e !== BreakException) throw e;
    }

    // check if player has won
    if(unitp1 == null && unitp2 == null){
      $("#battle_header_text").html('Draw!');
      site.events.trigger("finish");
      return;
    }
    else if(unitp1 == null){
      $("#battle_header_text").html('You lost the battle!');
      site.events.trigger("finish");
      return;
    }
    else if(unitp2 == null){
      $("#battle_header_text").html('You won the battle! Check out your score');
      site.events.trigger("finish");
      return;
    }

    // show current health
    $("#battle_header_text").html('Phase 0/3');
    $("#p1_fighting_unit").html('Unit: <b>'+unitp1.name+'</b> Health: <b>'+unitp1.health+'</b>');
    $("#p2_fighting_unit").html('Unit: <b>'+unitp2.name+'</b> Health: <b>'+unitp2.health+'</b>');

    // phase 1 (Ranged)
    setTimeout(function(){
      $("#battle_header_text").html('Phase 1/3');

      // check if living
      if(unitp1.health <= 0 || unitp2.health <= 0){
        return;
      }

      // p1 ranged
      if(unitp1.speed == 3){
        unitp2.health = unitp2.health - unitp1.attack;
      }
      // p2 ranged
      if(unitp2.speed == 3){
        unitp1.health = unitp1.health - unitp2.attack;
      }

      $("#p1_fighting_unit").html('Unit: <b>'+unitp1.name+'</b> Health: <b>'+unitp1.health+'</b>');
      $("#p2_fighting_unit").html('Unit: <b>'+unitp2.name+'</b> Health: <b>'+unitp2.health+'</b>');
    }, 1000);

    // phase 2 (Ranged + Cavalry)
    setTimeout(function () {
      $("#battle_header_text").html('Phase 2/3');

      // check if living
      if(unitp1.health <= 0 || unitp2.health <= 0){
        return;
      }

      // p1 ranged
      if(unitp1.speed == 3){
        unitp2.health = unitp2.health - unitp1.attack;
      }
      // p1 cavalry vs infantry
      else if(unitp1.speed == 2 && unitp2.range == false){
        unitp2.health = unitp2.health - unitp1.attack;
        unitp1.health = unitp1.health - unitp2.attack;
      }
      // p1 cavalry vs ranged
      else if (unitp1.speed == 2) {
        unitp2.health = unitp2.health - unitp1.attack;
      }

      // p2 ranged
      if(unitp2.speed == 3){
        unitp1.health = unitp1.health - unitp2.attack;
      }
      // p2 cavalry vs infantry
      else if(unitp2.speed == 2 && unitp1.range == false){
        unitp1.health = unitp1.health - unitp2.attack;
        unitp2.health = unitp2.health - unitp1.attack;
      }
      // p2 cavalry vs ranged
      else if (unitp2.speed == 2) {
        unitp1.health = unitp1.health - unitp2.attack;
      }

      $("#p1_fighting_unit").html('Unit: <b>'+unitp1.name+'</b> Health: <b>'+unitp1.health+'</b>');
      $("#p2_fighting_unit").html('Unit: <b>'+unitp2.name+'</b> Health: <b>'+unitp2.health+'</b>');
    }, 2000);

    // phase 3 (Ranged + Cavalry + infantry)
    setTimeout(function () {
      $("#battle_header_text").html('Phase 3/3');

      // check if living
      if(unitp1.health <= 0 || unitp2.health <= 0){
        return;
      }

      unitp2.health = unitp2.health - unitp1.attack;
      unitp1.health = unitp1.health - unitp2.attack;

      $("#p1_fighting_unit").html('Unit: <b>'+unitp1.name+'</b> Health: <b>'+unitp1.health+'</b>');
      $("#p2_fighting_unit").html('Unit: <b>'+unitp2.name+'</b> Health: <b>'+unitp2.health+'</b>');
    }, 3000);
  }
});
