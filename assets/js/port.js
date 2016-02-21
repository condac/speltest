var Port = function(name) {

  this.long = PortFactory.getLong(name);
  this.lat = PortFactory.getLat(name);
  this.name = PortFactory.getName(name);
  this.oilPrice = Mech.weightedRandom(200,3);
  this.repairPrice = Mech.weightedRandom(20000,3);
  this.connections = [];
  this.id = PortFactory.getId(name);
  //this.cash= 4000000;

  //this.shipList = [];

  this.newOilPrice = function() {
    this.oilPrice = Mech.weightedRandom(800,10);
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
  this.updateConnections = function() {
    this.connections = [];
    for (var port in Mech.ports) {
      //console.log(Mech.ports);
      //console.log(Mech.ports[port].id);
      //console.log(port);
      if (this.getDistanceTo(Mech.ports[port].id ) > 1000) {
        //console.log("distance true"+this.name+" to"+ Mech.ports[port].name);
        this.connections.push(Mech.ports[port].id);
      } else {
        //console.log("distance false"+this.name+" to"+ Mech.ports[port].name);
      }
    }
    //console.log(this.connections);
  };
  this.getDistanceTo = function(portname) {
    //var targetX = Mech.calculateDistance(PortFactory.getLat(portname),PortFactory.getLong(portname),this.lat,this.long);

    return Mech.calculateDistance(PortFactory.getLat(portname), PortFactory.getLong(portname), this.lat, this.long);
  };


};
