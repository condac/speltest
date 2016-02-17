// Selector is the gamestate where player select what to do with a ship when it is at a port waiting for orders
// Selector is started by a ship during nextDay() when a ship needs input.

var Selector = {

  //Posible outcome are a ship that is going on a mission or delay the ship at port for x days for repairs or just wait
  // Functions to do before is to refuel, repair, and select mission

    preload : function() {

        this.game.stage.backgroundColor = '#f67';

    },

    create: function () {
      //var background = game.add.sprite(0, 0, "storeBackground");
      //background.smoothed = false;
      //background.scale.x = 2;
      //background.scale.y = 2;
      var playerTextString = "Select your actions "+Mech.players[Mech.currentPlayer].getName()+":"
        var playerText;
        playerText = this.add.bitmapText(10, 10, 'nokia_font', playerTextString,30);
        playerText.anchor.x = 0;
        playerText.anchor.y = 0;
        playerText.smoothed = false;

        var shipTextString = "Ship:"+Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].getName()+".\n"+
                            "Condition: "+ Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].getCondition()+"%\n"+
                            "Fuel: "+ Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].getFuel()+" Ton\n"+
                            "Cash: "+Mech.players[Mech.currentPlayer].getCashNiceString();
          var shipText;
          shipText = this.add.bitmapText(this.world.centerX, this.world.centerY/2, 'nokia_font', shipTextString,30);
          shipText.anchor.x = 0;
          shipText.anchor.y = 0;
          shipText.smoothed = false;

        var exitText;
        exitText = this.add.bitmapText(this.world.centerX,this.world.height, 'nokia_font', 'Exit Store',20);
        exitText.anchor.x = 0.5;
        exitText.anchor.y = 1;
        exitText.smoothed = false;
        exitText.inputEnabled = true;
        // It will act as a button to start the game.
        exitText.events.onInputDown.add(this.exitStore, this);

    },
    buyShip: function(button) {
        console.log("Store: buyShip function");

          if (button.shipType != 0) {
            //Check if player has the money
            //Promt for shipname
            var name = prompt("Please enter the name of your new ship.", "MS Titanic");
            Mech.players[Mech.currentPlayer].buyShip(button.shipType,name);

          }


    },


    exitStore: function() {

        // Change the state back to game
        this.state.start('Game');

    }


};
