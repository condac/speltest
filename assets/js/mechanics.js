var Mech = {

    score: 0,
    cash: 1337,
    players:[],

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
    }
};

var Player = function(name) {

    this.cash= 1337;
    this.name= name;
    this.shipList = [];

    this.buyShip = function(type,name) {
      

    }
    this.getCash = function() {
        //console.log("Mech.getCash"+this.cash);
        return this.cash;
    };

    this.addCash = function(input) {
        console.log("Mech.addCash"+input);
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

var Ship = function(type,name) {


    this.name = name;
    this.type = type;
    this.tankSize = ShipFactory.getTankSize(type);
    this.cargoSize = ShipFactory.getCargoSize(type);
    this.maxSpeed = ShipFactory.getMaxSpeed(type);
    this.fuelUse = ShipFactory.getFuelUse(type);
    this.fuel = this.tankSize;
    //this.modelName = ShipFactory.getModelName(type);
    this.needOrder = true;
    this.coordinateX = 10.0;
    this.coordinateY = 10.0;
    this.damage = 100.0;

    //Mission variables
    this.mStatus = 0;
    this.mDistance = 0.0; // Distance traveled
    this.mTotalDistance = 0.0;
    this.mLoading  = 0; // Days left loading/unloading cargo
    this.mSpeed = 0; // the speed set by the player
    this.mDestination = 0;
    this.mAward = 0;


    this.startMission = function(totalDistance, award, destination, departure ) {
      this.mStatus = M_STATUS_LOADING;
      this.mDistance = 0.0; // Distance traveled
      this.mTotalDistance = totalDistance;
      this.mLoading  = 3; // Days left loading/unloading cargo
      this.mSpeed = 0; // the speed set by the player
      this.mDestination = 0;
      this.mAward = award;
      this.needOrder = false;
    }
    this.stopMission = function() {
      //Mission is done for some reason

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

        //if something is done then  needOrder = true;


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

      }
      return
    }
    this.getDamage = function() {

    }
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
};
