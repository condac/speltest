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
    this.shipIcon = ShipFactory.getShipIcon(type);



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
      console.log("Mission started: "+destination+" "+this.mTotalDistance+" "+this.mSpeed+" "+this.mAward);
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
    this.getCurrentPort = function() {

      return this.currentPort;
    };

};
