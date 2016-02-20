// Selector is the gamestate where player select what to do with a ship when it is at a port waiting for orders
// Selector is started by a ship during nextDay() when a ship needs input.

var Selector_fuel = {

  //Posible outcome are a ship that is going on a mission or delay the ship at port for x days for repairs or just wait
  // Functions to do before is to refuel, repair, and select mission

  shiptext: 0,
  refueling: false,
  refuelAmount: 0,



    preload : function() {

        this.game.stage.backgroundColor = '#467';

    },

    create: function () {
      //var background = game.add.sprite(0, 0, "refuelBackground");
      //background.smoothed = false;
      //background.scale.x = 2;
      //background.scale.y = 2;

      var textSize = 20;
      var textSpace = textSize +1;

      var playerTextString = "Refuel ship: "+Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].getName()+".";
        var playerText;
        playerText = this.add.bitmapText(10, 10, 'nokia_font', playerTextString,30);
        playerText.anchor.x = 0;
        playerText.anchor.y = 0;
        playerText.smoothed = false;

        var shipTextString = "Ship:"+Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].getName()+".\n"+
                            "Condition: "+ Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].getCondition()+"%\n"+
                            "Fuel Capacity: "+ Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].tankSize+" Ton\n"+
                            "Fuel: "+ Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].getFuel()+" Ton\n"+
                            "Cash: "+Mech.players[Mech.currentPlayer].getCashNiceString()+" \n"+
                            " \n"+
                            "Oil Price: $"+Mech.ports[Mech.cPort].getOilPrice()+" per Ton \n"+
                            "";
          //var shipText;
          shipText = this.add.bitmapText(this.world.centerX, this.world.centerY/2-textSpace*2, 'nokia_font', shipTextString,30);
          shipText.anchor.x = 0;
          shipText.anchor.y = 0;
          shipText.smoothed = false;

          var refuel100Text;
          refuel100Text = this.add.bitmapText(this.world.centerX,this.world.centerY+textSpace*1, 'nokia_font', '1 Refuel 100%',textSize);
          refuel100Text.anchor.x = 0;
          refuel100Text.anchor.y = 0;
          refuel100Text.smoothed = false;
          refuel100Text.inputEnabled = true;
          // It will act as a button
          refuel100Text.events.onInputDown.add(this.refuelShip100, this);
          //Keyboard shortcut
          key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
          key1.onDown.add(this.refuelShip100, this);

          var refuel75Text;
          refuel75Text = this.add.bitmapText(this.world.centerX,this.world.centerY+textSpace*2, 'nokia_font', '2 Refuel 75%',textSize);
          refuel75Text.anchor.x = 0;
          refuel75Text.anchor.y = 0;
          refuel75Text.smoothed = false;
          refuel75Text.inputEnabled = true;
          // It will act as a button
          refuel75Text.events.onInputDown.add(this.refuelShip75, this);
          //Keyboard shortcut
          key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
          key2.onDown.add(this.refuelShip75, this);

          var refuel50Text;
          refuel50Text = this.add.bitmapText(this.world.centerX,this.world.centerY+textSpace*3, 'nokia_font', '3 Refuel 50',textSize);
          refuel50Text.anchor.x = 0;
          refuel50Text.anchor.y = 0;
          refuel50Text.smoothed = false;
          refuel50Text.inputEnabled = true;
          // It will act as a button
          refuel50Text.events.onInputDown.add(this.refuelShip50, this);
          //Keyboard shortcut
          key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
          key3.onDown.add(this.refuelShip50, this);

          var refuel50Text;
          refuel50Text = this.add.bitmapText(this.world.centerX,this.world.centerY+textSpace*4, 'nokia_font', '4 Refuel 25',textSize);
          refuel50Text.anchor.x = 0;
          refuel50Text.anchor.y = 0;
          refuel50Text.smoothed = false;
          refuel50Text.inputEnabled = true;
          // It will act as a button
          refuel50Text.events.onInputDown.add(this.refuelShip25, this);
          //Keyboard shortcut
          key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
          key4.onDown.add(this.refuelShip25, this);

          var backText;
          backText = this.add.bitmapText(this.world.centerX,this.world.centerY+textSpace*5, 'nokia_font', '5 Back',textSize);
          backText.anchor.x = 0;
          backText.anchor.y = 0;
          backText.smoothed = false;
          backText.inputEnabled = true;
          // It will act as a button
          backText.events.onInputDown.add(this.goBack, this);
          //Keyboard shortcut
          key5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
          key5.onDown.add(this.goBack, this);


    },
    refuelShip100: function(button) {
      this.refueling = true;
      this.refuelAmount = 1.0;
        //Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].refuel();

    },
    refuelShip75: function(button) {
      this.refueling = true;
      this.refuelAmount = 0.75;
        //Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].refuel();

    },
    refuelShip50: function(button) {
      this.refueling = true;
      this.refuelAmount = 0.5;
        //Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].refuel();

    },
    refuelShip25: function(button) {
      this.refueling = true;
      this.refuelAmount = 0.25;
        //Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].refuel();

    },

    goBack: function() {

        // Change the state back to game
        this.state.start('Selector');

    },
    render: function() {
        // The update function is called constantly at a high rate (somewhere around 60fps),
        // updating the game field every time.

    },
    update: function() {
        // The update function is called constantly at a high rate (somewhere around 60fps),
        // updating the game field every time.

        var shipTextString = "Ship:"+Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].getName()+".\n"+
                            "Condition: "+ Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].getConditionText()+"%\n"+
                            "Fuel Capacity: "+ Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].tankSize+" Ton\n"+
                            "Fuel: "+ Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].getFuelText()+" Ton\n"+
                            "Cash: "+Mech.players[Mech.currentPlayer].getCashNiceString()+" \n"+
                            " \n"+
                            "Oil Price: $"+Mech.ports[Mech.cPort].getOilPriceText()+" per Ton \n"+
                            "";

        shipText.setText(shipTextString);

        if (this.refueling) {
          if ( Mech.players[Mech.cPlayer].tryAndBuy( Mech.ports[Mech.cPort].getOilPrice()*10 ) ) {
            if (Mech.players[Mech.cPlayer].shipList[Mech.cShip].addFuel(10)) {
              // refuel was successful
            } else { // Tank is full
              this.refueling = false;
            }
          }
        }
        var howfull = Mech.players[Mech.cPlayer].shipList[Mech.cShip].getFuel() / Mech.players[Mech.cPlayer].shipList[Mech.cShip].tankSize;
        if( howfull > this.refuelAmount ) {
          this.refueling = false;
        }
    },


};
