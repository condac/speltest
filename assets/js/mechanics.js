var Mech = {

    currentPlayer: 1,
    currentShip: 1,
    players:[],

    setCurrentPlayer: function(invar) {
      this.currentPlayer = invar;
    },
    setCurrentShip: function(invar) {
      this.currentShip = invar;
    },

    createWorld: function() {
      this.players[1] = new Player("Kalle");
      this.players[2] = new Player("Pecka");
      this.players[3] = new Player("Jürgen");
      this.players[4] = new Player("Player 4");
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


    },
    weightedRandom: function (max, bellFactor) {
      var num = 0;
      for (var i = 0; i < bellFactor; i++) {
          num += Math.random() * (max/bellFactor);
      }
      return num;
    }
};

var Player = function(name) {

    this.cash= 4000000;
    this.name= name;
    this.shipList = [];

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
    this.getName = function() {
      return this.name;
    }
};

var M_STATUS_NOMISSION = 0;
var M_STATUS_ONMISSION = 1;
var M_STATUS_LOADING = 2;
var M_STATUS_UNLOADING = 3;
var M_STATUS_NEWSHIP = 4;

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
    this.fuel = this.tankSize;
    //this.modelName = ShipFactory.getModelName(type);
    this.needOrder = false;
    this.coordinateX = 10.0;
    this.coordinateY = 10.0;


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
      this.mDestination = 0;
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

      //Daily cost
      this.player.removeCash(this.dailyCost);

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

      }
      return "getCurrentStatusInText default";
    };
    this.getDamage = function() {
      return this.getCondition();
    };
    this.getCondition = function() {

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
    this.getType = function() {
        return this.type;
    };
    this.getName = function() {
        return this.name;
    };
    this.waitingForAction = function() {
        return this.needOrder;
    };
};
