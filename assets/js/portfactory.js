
var PortFactory =  {


  getName : function(type) {

    var phaserJSON = game.cache.getJSON('portDatabase');
    phaserJSON = phaserJSON["portDatabase"];
    //console.log(phaserJSON);
    var portjson = phaserJSON[type];
    return portjson.name;

  },
  getId : function(type) {

    var phaserJSON = game.cache.getJSON('portDatabase');
    phaserJSON = phaserJSON["portDatabase"];
    //console.log(phaserJSON);
    var portjson = phaserJSON[type];
    return portjson.id;

  },
  getLat : function(type) {
    //console.log(type);
    var phaserJSON = game.cache.getJSON('portDatabase');
    phaserJSON = phaserJSON["portDatabase"];
    var portjson = phaserJSON[type];
    return portjson.lat;

  },
  getLong : function(type) {
    //console.log(type);
    var phaserJSON = game.cache.getJSON('portDatabase');
    phaserJSON = phaserJSON["portDatabase"];
    var portjson = phaserJSON[type];
    return portjson.long;

  },
};
