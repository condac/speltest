class Player {
  var cash;

  constructor() {
    cash = 100;
  }

  getCash() {

    return this.cash;
  }

  addCash(in) {
    this.cash += in;
  }

  removeCash(in) {
    this.cash -= in;
  }
}
