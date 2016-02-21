var MAP_WIDTH = 1280;
var MAP_HEIGHT = 755;
var MAP_OFFSET_X = -40;
var MAP_OFFSET_Y = 78;

var Mech = {

  currentPlayer: 1,
  cPlayer: 1,
  currentShip: 1,
  cShip: 1,
  players:[],
  ports: [] ,
  currentPort: 1,
  cPort: 1,
  oilWorldPrice: 1,
  oilWorldDir: 0,
  destination: "0",
  jsonShipDatabase: "",
  jsonShipCategory: "",
  jsonPortDatabase: "",
  storeCurrentCategory: "0",


  setCurrentPlayer: function(invar) {
    this.currentPlayer = invar;
    this.cPlayer = invar;
  },
  setCurrentShip: function(invar) {
    this.currentShip = invar;
    this.cShip = invar;
  },
  setCurrentPort: function(invar) {
    for (var port in this.ports) {
      if (this.ports[port].id == invar) {
        this.currentPort = port;
        this.cPort = port;
      }
    }

  },
  setDestination: function(invar) {
    this.destination = invar;

  },

  createWorld: function() {
    var phaserJSON = game.cache.getJSON('shipDatabase');
    console.log(phaserJSON);
    //phaserJSON = phaserJSON["shipDatabase"];
    this.jsonShipDatabase = phaserJSON["shipDatabase"];
    this.jsonShipCategory = phaserJSON["shipCategory"];

    var phaserJSON = game.cache.getJSON('portDatabase');
    this.jsonPortDatabase = phaserJSON["portDatabase"];

    this.players[1] = new Player("Kalle");
    this.players[2] = new Player("Pecka");
    this.players[3] = new Player("Jürgen");
    this.players[4] = new Player("Player 4");

    this.createPorts();

    // creat ports
    this.updateOilPrice();
  },
  createPorts: function() {
    //
    var phaserJSON = game.cache.getJSON('portDatabase');
    phaserJSON = phaserJSON["portDatabase"];

    for (var port in phaserJSON) {
      this.ports.push(new Port(port));
      //console.log(port);
    }

  },
  nextMove: function() {


  },

  nextDay: function() {
    // move ships and calculate everything....
    Mech.players[1].addCash(1);
    Mech.players[2].addCash(2);
    Mech.players[3].addCash(3);
    Mech.players[4].addCash(4);

    for (var ship in Mech.players[1].shipList) {
      Mech.players[1].shipList[ship].doTurn();
    }
    for (var ship in Mech.players[2].shipList) {
      Mech.players[2].shipList[ship].doTurn();
    }
    for (var ship in Mech.players[3].shipList) {
      Mech.players[3].shipList[ship].doTurn();
    }
    for (var ship in Mech.players[4].shipList) {
      Mech.players[4].shipList[ship].doTurn();
    }

    this.updateOilPrice();
    this.updateMissions();



  },
  weightedRandom: function (max, bellFactor) {
    var num = 0;
    for (var i = 0; i < bellFactor; i++) {
        num += Math.random() * (max/bellFactor);
    }
    return num;
  },

  calculateDistance: function (lat1,lon1,lat2,lon2) {

    var R = 6371000; // metres
    var φ1 = lat1* Math.PI / 180;
    var φ2 = lat2* Math.PI / 180;
    var Δφ = (lat2-lat1)* Math.PI / 180;
    var Δλ = (lon2-lon1)* Math.PI / 180;

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    return d* 0.000539957;
    //console.log(d);
  },
  updateOilPrice: function () {
    var total = 0;
    var totalnr = 0;
    for (var port in Mech.ports ) {
      Mech.ports[port].newOilPrice();
      total += Mech.ports[port].getOilPrice();
      totalnr += 1;
    }
    if (this.oilWorldPrice< (total/totalnr) ) {
      this.oilWorldDir = 1;
    } else {
      this.oilWorldDir = -1;
    }

    this.oilWorldPrice = total / totalnr;
  },
  updateMissions: function () {
    for (var port in Mech.ports ) {
      //console.log("update mission for:"+port);
      Mech.ports[port].updateConnections();

    }
  },

  calculateDistanceMeter: function (lat1,lon1,lat2,lon2) {

    var R = 6371000; // metres
    var φ1 = lat1* Math.PI / 180;
    var φ2 = lat2* Math.PI / 180;
    var Δφ = (lat2-lat1)* Math.PI / 180;
    var Δλ = (lon2-lon1)* Math.PI / 180;

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    //console.log(d);
  },
  lonToX: function (lon) {
    var x =   ((MAP_WIDTH/360.0) * (180 + lon));
    //var y =   ((MAP_HEIGHT/180.0) * (90 - lat));
    return x + MAP_OFFSET_X;
  },
  latToY: function (lat) {
    //var x =   ((MAP_WIDTH/360.0) * (180 + lon));
    var y =   ((MAP_HEIGHT/180.0) * (90 - lat));
    return y + MAP_OFFSET_Y;
  },
  updateOilPrice: function () {
    var total = 0;
    var totalnr = 0;
    for (var port in Mech.ports ) {
      Mech.ports[port].newOilPrice();
      total += Mech.ports[port].getOilPrice();
      totalnr += 1;
    }
    if (this.oilWorldPrice< (total/totalnr) ) {
      this.oilWorldDir = 1;
    } else {
      this.oilWorldDir = -1;
    }

    this.oilWorldPrice = total / totalnr;
  }
};
