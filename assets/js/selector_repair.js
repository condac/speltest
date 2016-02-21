// Selector is the gamestate where player select what to do with a ship when it is at a port waiting for orders
// Selector is started by a ship during nextDay() when a ship needs input.

var Selector_repair = {

  //Posible outcome are a ship that is going on a mission or delay the ship at port for x days for repairs or just wait
  // Functions to do before is to repair, repair, and select mission

  shiptext: 0,
  repairing: false,
  repairAmount: 0,



    preload : function() {

        this.game.stage.backgroundColor = '#746';

    },

    create: function () {
      //var background = game.add.sprite(0, 0, "repairBackground");
      //background.smoothed = false;
      //background.scale.x = 2;
      //background.scale.y = 2;

      var textSize = 20;
      var textSpace = textSize +1;

      var playerTextString = "Repair ship: "+Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].getName()+".";
        var playerText;
        playerText = this.add.bitmapText(10, 10, 'nokia_font', playerTextString,30);
        playerText.anchor.x = 0;
        playerText.anchor.y = 0;
        playerText.smoothed = false;

        var shipTextString = "sätts i update loopen";
        /*var shipTextString = "Ship:"+Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].getName()+".\n"+
                            "Condition: "+ Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].getCondition()+"%\n"+
                            "Fuel Capacity: "+ Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].tankSize+" Ton\n"+
                            "Fuel: "+ Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].getFuel()+" Ton\n"+
                            "Cash: "+Mech.players[Mech.currentPlayer].getCashNiceString()+" \n"+
                            " \n"+
                            "Repair Price: $"+Mech.ports[Mech.cPort].getRepairPrice()+" per % \n"+
                            "";*/
          //var shipText;
          shipText = this.add.bitmapText(this.world.centerX, this.world.centerY/2-textSpace*2, 'nokia_font', shipTextString,30);
          shipText.anchor.x = 0;
          shipText.anchor.y = 0;
          shipText.smoothed = false;

          var repair100Text;
          repair100Text = this.add.bitmapText(this.world.centerX,this.world.centerY+textSpace*1, 'nokia_font', '1 Repair 100%',textSize);
          repair100Text.anchor.x = 0;
          repair100Text.anchor.y = 0;
          repair100Text.smoothed = false;
          repair100Text.inputEnabled = true;
          // It will act as a button
          repair100Text.events.onInputDown.add(this.repairShip100, this);
          //Keyboard shortcut
          key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
          key1.onDown.add(this.repairShip100, this);

          var repair75Text;
          repair75Text = this.add.bitmapText(this.world.centerX,this.world.centerY+textSpace*2, 'nokia_font', '2 Repair 75%',textSize);
          repair75Text.anchor.x = 0;
          repair75Text.anchor.y = 0;
          repair75Text.smoothed = false;
          repair75Text.inputEnabled = true;
          // It will act as a button
          repair75Text.events.onInputDown.add(this.repairShip75, this);
          //Keyboard shortcut
          key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
          key2.onDown.add(this.repairShip75, this);

          var repair50Text;
          repair50Text = this.add.bitmapText(this.world.centerX,this.world.centerY+textSpace*3, 'nokia_font', '3 Repair 50',textSize);
          repair50Text.anchor.x = 0;
          repair50Text.anchor.y = 0;
          repair50Text.smoothed = false;
          repair50Text.inputEnabled = true;
          // It will act as a button
          repair50Text.events.onInputDown.add(this.repairShip50, this);
          //Keyboard shortcut
          key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
          key3.onDown.add(this.repairShip50, this);

          var repair50Text;
          repair50Text = this.add.bitmapText(this.world.centerX,this.world.centerY+textSpace*4, 'nokia_font', '4 Repair 25',textSize);
          repair50Text.anchor.x = 0;
          repair50Text.anchor.y = 0;
          repair50Text.smoothed = false;
          repair50Text.inputEnabled = true;
          // It will act as a button
          repair50Text.events.onInputDown.add(this.repairShip25, this);
          //Keyboard shortcut
          key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
          key4.onDown.add(this.repairShip25, this);

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
    repairShip100: function(button) {
      Mech.players[Mech.cPlayer].shipList[Mech.cShip].repairShip(this.repairAmount);
      Mech.players[Mech.cPlayer].shipList[Mech.cShip].startWait(M_STATUS_REPAIR,5);
        //Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].repair();

    },
    repairShip75: function(button) {
      this.repairing = true;
      this.repairAmount = 0.75;
        //Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].repair();

    },
    repairShip50: function(button) {
      this.repairing = true;
      this.repairAmount = 0.5;
        //Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].repair();

    },
    repairShip25: function(button) {
      this.repairing = true;
      this.repairAmount = 0.25;
        //Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].repair();

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
                            "Repair Price: $"+Mech.ports[Mech.cPort].getRepairPrice()+" per % \n"+
                            "";

        shipText.setText(shipTextString);


    },


};
