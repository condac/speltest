BasicGame = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: false,

    player: class Player {
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


};
