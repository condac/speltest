var SHIP_TYPE_RUST_1 = "rust1";
var SHIP_TYPE_RUST_2 = "rust2";
var SHIP_TYPE_BUDGET_1 = "budget1";
var SHIP_TYPE_BUDGET_2 = 202;
var SHIP_TYPE_NEW_1 = 301;
var SHIP_TYPE_NEW_2 = 302;

// Rusty ship 1
var SHIP_RUST_1_COST = 1300;
var SHIP_RUST_1_TANKSIZE = 2000;
var SHIP_RUST_1_CARGOSIZE = 10000;
var SHIP_RUST_1_MAXSPEED = 15;
var SHIP_RUST_1_FUEL = 15;
var SHIP_RUST_1_MODELNAME = "Rusty old crap";



var ShipFactory =  {

  getModelName : function(type) {

    var phaserJSON = game.cache.getJSON('shipDatabase');
    phaserJSON = phaserJSON["shipDatabase"];
    console.log(phaserJSON);
    var shipjson = phaserJSON[type];
    return shipjson.modelName;

  },
  getTankSize : function(type) {

    var phaserJSON = game.cache.getJSON('shipDatabase');
    var shipjson = phaserJSON[type];
    return shipjson.tankSize;

  },
  getCargoSize : function(type) {

    var phaserJSON = game.cache.getJSON('shipDatabase');
    var shipjson = phaserJSON[type];
    return shipjson.cargoSize;

  },
  getMaxSpeed : function(type) {

    var phaserJSON = game.cache.getJSON('shipDatabase');
    var shipjson = phaserJSON[type];
    return shipjson.maxSpeed;

  },
  getFuelUse : function(type) {

    var phaserJSON = game.cache.getJSON('shipDatabase');
    var shipjson = phaserJSON[type];
    return shipjson.fuelUse;

  }
};
