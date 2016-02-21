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
