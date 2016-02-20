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


  setCurrentPlayer: function(invar) {
    this.currentPlayer = invar;
    this.cPlayer = invar;
  },
  setCurrentShip: function(invar) {
    this.currentShip = invar;
    this.cShip = invar;
  },
  setCurrentPort: function(invar) {
    this.currentPort = invar;
    this.cPort = invar;
  },

  createWorld: function() {
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

    la1 = Mech.ports[0].lat;
    lo1 = Mech.ports[0].long;
    la2 = Mech.ports[1].lat;
    lo2 = Mech.ports[1].long;
    console.log(this.calculateDistance(la1,lo1,la2,lo2));

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

var Player = function(name) {

    this.cash= 4000000;
    this.name= name;
    this.shipList = [];
    this.homePort = "origo";

    this.buyShip = function(type,name) {
      //Chek if we have the money
      // if
      this.cash -= ShipFactory.getCost(type);
      this.shipList.push(new Ship(type,name,this));
      //console.log(this.shipList);
    }
    this.getCash = function() {
        //console.log("Mech.getCash"+this.cash);
        return this.cash;
    };
    this.getCashNiceString = function() {
        if (this.cash > 1000000) {
          return "$"+(Math.round(this.cash/1000000 * 100) / 100)+"M";
        }
        if (this.cash > 1000) {
          return "$"+(Math.round(this.cash/1000 * 100) / 100)+"K";
        }

        return "$"+this.cash;
    };
    this.addCash = function(input) {
        //console.log("Mech.addCash"+input);
        this.cash += input;
    };

    this.removeCash = function(input) {
        this.cash -= input;
    };
    this.tryAndBuy = function(input) {
      if (this.cash < input) {
        // Player dont have the money
        return false;
      } else {
        this.cash -= input;
        return true;
      }
        this.cash -= input;
    };
    this.getName = function() {
      return this.name;
    }
};

var M_STATUS_NOMISSION = 0;
var M_STATUS_ONMISSION = 1;
var M_STATUS_LOADING = 2;
var M_STATUS_UNLOADING = 3;
var M_STATUS_NEWSHIP = 4;
var M_STATUS_REPAIR = 5;
var M_STATUS_WAIT = 6;

var Ship = function(type,name,player) {

    this.player = player
    this.name = name;
    this.type = type;
    this.tankSize = ShipFactory.getTankSize(type);
    this.cargoSize = ShipFactory.getCargoSize(type);
    this.maxSpeed = ShipFactory.getMaxSpeed(type);
    this.fuelUse = ShipFactory.getFuelUse(type);
    this.damage = ShipFactory.getInitialCondition(type);

    this.dailyCost = ShipFactory.getDailyCost(type);
    this.fuel = Mech.weightedRandom(this.tankSize,1);
    //this.modelName = ShipFactory.getModelName(type);
    this.needOrder = false;
    this.currentPort = player.homePort;
    this.coordinateX = Mech.lonToX(PortFactory.getLong(this.currentPort));
    this.coordinateY = Mech.latToY(PortFactory.getLat(this.currentPort));



    //Mission variables
    this.mStatus = 4;
    this.mDistance = 0.0; // Distance traveled
    this.mTotalDistance = 0.0;
    this.mLoading  = 2; // Days left loading/unloading cargo
    this.mSpeed = 0; // the speed set by the player
    this.mDestination = 0;
    this.mAward = 0;


    this.startMission = function(totalDistance, award, destination, departure,speed) {
      this.mStatus = M_STATUS_LOADING;
      this.mDistance = 0.0; // Distance traveled
      this.mTotalDistance = totalDistance;
      this.mLoading  = 3; // Days left loading/unloading cargo
      this.mSpeed = speed; // the speed set by the player
      this.mDestination = destination;
      this.mAward = award;
      this.needOrder = false;
      console.log("Mission started");
    }
    this.stopMission = function() {
      //Mission is done for some reason
      this.player.addCash(this.mAward);
      this.mStatus = M_STATUS_NOMISSION;

      this.mAward = 0;
      this.needOrder = true;
    }
    this.startWait = function(why, howlong) {
      this.mStatus = why;
      this.mLoading  = howlong; // Days left loading/unloading cargo
      this.needOrder = false;
    }
    this.doTurn = function() {
      //mission.nextDay

      if (this.mStatus == M_STATUS_ONMISSION) {

        //Fuel
        this.fuel -= this.mSpeed;
        if (this.fuel<0) {
          //Do out of fuel event
        }

        //Damage
        this.damage -= (this.mSpeed*0.004);
        if (this.damage<0) {
          //Do ship broken event
        }

        //Travel
        this.mDistance += this.mSpeed*24;

        if (this.mDistance > this.mTotalDistance ) {
          // We have reaced the destination
          this.mStatus = M_STATUS_UNLOADING;
          this.mLoading  = 3;
          this.currentPort = this.mDestination;
        }

      }
      else if (this.mStatus == M_STATUS_LOADING) {
        this.mLoading  -= 1;
        if (this.mLoading <= 0 ) {
          this.mStatus = M_STATUS_ONMISSION;
        }

      }
      else if (this.mStatus == M_STATUS_UNLOADING) {
        this.mLoading  -= 1;
        if (this.mLoading <= 0 ) {
          this.stopMission();
        }
      }
      if (this.mStatus == M_STATUS_NEWSHIP) {
        this.mLoading  -= 1;
        if (this.mLoading <= 0 ) {
          this.stopMission();
        }
      }
      if (this.mStatus == M_STATUS_REPAIR) {
        this.mLoading  -= 1;
        if (this.mLoading <= 0 ) {
          this.stopMission();
        }
      }
      if (this.mStatus == M_STATUS_WAIT) {
        this.mLoading  -= 1;
        if (this.mLoading <= 0 ) {
          this.stopMission();
        }
      }

      //Daily cost
      this.player.removeCash(this.dailyCost);

      // Calculate map x y
      this.calculateXY();

        //console.log("did a turn with ship");

    };

    this.getCurrentStatusInText = function() {
      switch  (this.mStatus) {
        case M_STATUS_ONMISSION:
          //Calculate percentage
          var temp = this.mDistance / this.mTotalDistance;
          temp = Math.floor(temp*100);
          return "On Mission, "+temp+"%";
          break;
        case M_STATUS_LOADING:
          return "Loading Cargo, "+this.mLoading+" days left.";
          break;
        case M_STATUS_UNLOADING:
          return "Unloading Cargo, "+this.mLoading+" days left.";
          break;
        case M_STATUS_NOMISSION:
          return "No mission";
          break;
        case M_STATUS_NEWSHIP:
          return "Waiting for ship to be delivered, press NextDay...";
          break;
        case M_STATUS_REPAIR:
          return "Repairing ship";
          break;
        case M_STATUS_WAIT:
          return "Waiting for better times...";
          break;

      }
      return "getCurrentStatusInText default";
    };
    this.getDamage = function() {
      return this.getCondition();
    };
    this.getCondition = function() {

      return this.damage;
    };
    this.getConditionText = function() {

      return Math.floor(this.damage);
    };
    this.getTankSize = function() {
        return this.tankSize;
    };
    this.getCargoSize = function() {
        return this.cargoSize;
    };
    this.getMaxSpeed = function() {
        return this.maxSpeed;
    };
    this.getFuel = function() {
        return this.fuel;
    };
    this.getFuelText = function() {
        return Math.round(this.fuel);
    };
    this.getType = function() {
        return this.type;
    };
    this.getName = function() {
        return this.name;
    };
    this.waitingForAction = function() {
        return this.needOrder;
    };
    this.addFuel = function(inint) {
      this.fuel += inint;
      if (this.fuel> this.tankSize) {
        this.fuel = this.tankSize;
        return false;
      }
      return true;
    };
    this.getX = function() {

      return this.coordinateX;
    };
    this.getY = function() {

      return this.coordinateY;
    };
    this.calculateXY = function() {
      if (this.mStatus == M_STATUS_ONMISSION) {

        var missionProgress = this.mDistance / this.mTotalDistance;
        var targetX = Mech.lonToX(PortFactory.getLong(this.mDestination));
        var targetY = Mech.latToY(PortFactory.getLat(this.mDestination));
        var sourceX = Mech.lonToX(PortFactory.getLong(this.currentPort));
        var sourceY = Mech.latToY(PortFactory.getLat(this.currentPort));
        var deltaX = targetX-sourceX;
        var deltaY = targetY-sourceY;
        this.coordinateX = sourceX + deltaX*missionProgress;
        this.coordinateY = sourceY + deltaY*missionProgress;
        console.log("calculateXY on mission "+missionProgress+" "+targetX+" "+targetY+" "+sourceX+" "+sourceY+" "+this.coordinateX+" "+this.coordinateY);
      } else {
        this.coordinateX = Mech.lonToX(PortFactory.getLong(this.currentPort));
        this.coordinateY = Mech.latToY(PortFactory.getLat(this.currentPort));
      }

    };

};

var Port = function(name) {

  this.long = PortFactory.getLong(name);
  this.lat = PortFactory.getLat(name);
  this.name = PortFactory.getName(name);
  this.oilPrice = Mech.weightedRandom(200,3);
  this.repairPrice = Mech.weightedRandom(20000,3);
  //this.cash= 4000000;

  //this.shipList = [];

  this.newOilPrice = function() {
    this.oilPrice = Mech.weightedRandom(200,3);
  };
  this.getOilPrice = function() {
    return this.oilPrice;
  };
  this.getOilPriceText = function() {
    return Math.round(this.oilPrice);
  };
  this.getRepairPrice = function() {
      //console.log("Mech.getCash"+this.cash);
      return this.repairPrice;
  };
  this.getName = function() {
    return this.name;
  };
  this.getLat = function() {
    return this.lat;
  };
  this.getLong = function() {
    return this.long;
  };

};
