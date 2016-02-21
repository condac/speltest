// Selector is the gamestate where player select what to do with a ship when it is at a port waiting for orders
// Selector is started by a ship during nextDay() when a ship needs input.

var Selector = {

   key1: 0,
   key2: 0,
   key3: 0,
   key4: 0,
   key5: 0,
  //Posible outcome are a ship that is going on a mission or delay the ship at port for x days for repairs or just wait
  // Functions to do before is to refuel, repair, and select mission

    preload : function() {

        this.game.stage.backgroundColor = '#f67';

    },

    create: function () {
      var background = game.add.sprite(0, 0, "portBackground");
      background.smoothed = false;
      background.scale.x = 2;
      background.scale.y = 2;

      var boatoffset = 450;
      var waterlevel = 148;

      boatSprite = this.add.sprite(100, boatoffset, Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].shipIcon );
      boatSprite.inputEnabled = true;
      boatSprite.input.enableDrag();
      boatSprite.smoothed = false;
      boatSprite.scale.x = 2;
      boatSprite.scale.y = 2;


      var waterline = game.add.sprite(0, game.world.height-waterlevel, "portBackground_water");
      waterline.smoothed = false;
      waterline.scale.x = 2;
      waterline.scale.y = 2;
      waterline.alpha = 0.9;

      var drawnObject;
      var width = 10 // example;
      var height = 10 // example;
      var bmd = game.add.bitmapData(width, height);

      bmd.ctx.beginPath();
      bmd.ctx.rect(0, 0, width, height);
      bmd.ctx.fillStyle = '#ffffff';
      bmd.ctx.fill();
      drawnObject = game.add.sprite(0, 0, bmd);
      drawnObject.anchor.setTo(0.5, 0.5);

      var textSize = 20;
      var textSpace = textSize +1;

      var playerTextString = "Select your actions "+Mech.players[Mech.currentPlayer].getName()+":"
      var playerText;
      playerText = this.add.bitmapText(10, 10, 'nokia_font', playerTextString,30);
      playerText.anchor.x = 0;
      playerText.anchor.y = 0;
      playerText.smoothed = false;

      //console.log(Mech.ports[Mech.cPort]);
      //console.log(Mech.ports);
      //console.log(Mech.cPort);
      var shipTextString =
                          "Location: "+ Mech.ports[Mech.cPort].getName()+"\n"+
                          "Ship:"+Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].getName()+".\n"+
                          "Condition: "+ Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].getConditionText()+"%\n"+
                          "Fuel: "+ Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].getFuelText()+" Ton\n"+
                          "Cash: "+Mech.players[Mech.currentPlayer].getCashNiceString();
      var shipText;
      shipText = this.add.bitmapText(this.world.centerX, this.world.centerY/2, 'nokia_font', shipTextString,30);
      shipText.anchor.x = 0;
      shipText.anchor.y = 0;
      shipText.smoothed = false;


      var refuelText;
      refuelText = this.add.bitmapText(this.world.centerX,this.world.centerY, 'nokia_font', '1 Refuel',textSize);
      refuelText.anchor.x = 0;
      refuelText.anchor.y = 0;
      refuelText.smoothed = false;
      refuelText.inputEnabled = true;
      // It will act as a button
      refuelText.events.onInputDown.add(this.doRefuel, this);
      //Keyboard shortcut
      key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
      key1.onDown.add(this.doRefuel, this);

      var repairText;
      repairText = this.add.bitmapText(this.world.centerX,this.world.centerY+textSpace*1, 'nokia_font', '2 Repair',textSize);
      repairText.anchor.x = 0;
      repairText.anchor.y = 0;
      repairText.smoothed = false;
      repairText.inputEnabled = true;
      // It will act as a button
      repairText.events.onInputDown.add(this.doRepair, this);
      //Keyboard shortcut
      key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
      key2.onDown.add(this.doRepair, this);

      var selectText;
      selectText = this.add.bitmapText(this.world.centerX,this.world.centerY+textSpace*2, 'nokia_font', '3 Select Cargo',textSize);
      selectText.anchor.x = 0;
      selectText.anchor.y = 0;
      selectText.smoothed = false;
      selectText.inputEnabled = true;
      // It will act as a button
      selectText.events.onInputDown.add(this.doSelectMission, this);
      //Keyboard shortcut
      key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
      key3.onDown.add(this.doSelectMission, this);

      var goText;
      goText = this.add.bitmapText(this.world.centerX,this.world.centerY+textSpace*3, 'nokia_font', '4 Set sail!',textSize);
      goText.anchor.x = 0;
      goText.anchor.y = 0;
      goText.smoothed = false;
      goText.inputEnabled = true;
      // It will act as a button
      goText.events.onInputDown.add(this.goOnMission, this);
      //Keyboard shortcut
      key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
      key4.onDown.add(this.goOnMission, this);

      var waitText;
      waitText = this.add.bitmapText(this.world.centerX,this.world.centerY+textSpace*4, 'nokia_font', '5 Wait for better times...',textSize);
      waitText.anchor.x = 0;
      waitText.anchor.y = 0;
      waitText.smoothed = false;
      waitText.inputEnabled = true;
      // It will act as a button
      waitText.events.onInputDown.add(this.doWait, this);
      //Keyboard shortcut
      key2 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
      key2.onDown.add(this.doWait, this);

      /*var exitText;
      exitText = this.add.bitmapText(this.world.centerX,this.world.height, 'nokia_font', 'Go on Mission!!',20);
      exitText.anchor.x = 0.5;
      exitText.anchor.y = 1;
      exitText.smoothed = false;
      exitText.inputEnabled = true;
      // It will act as a button to start the game.
      exitText.events.onInputDown.add(this.goOnMission, this);*/

    },
    doSelectMission: function() {
      this.state.start('Selector_mission');
    },

    doRefuel: function() {

        // Change the state back to game
        this.state.start('Selector_fuel');

    },
    doRepair: function() {

      // Change the state back to game
      this.state.start('Selector_repair');

    },
    goOnMission: function() {

      Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].startMission(Mech.distance, Mech.reward, Mech.destination, "departure",Mech.speed);
      Mech.clearMissionSelection();
      // Change the state back to game
      this.state.start('Game');

    },
    doWait: function() {
      Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].startWait(M_STATUS_WAIT,2);
      //Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].startMission(5000, 10000, "destination", "departure",15);
      // Change the state back to game
      this.state.start('Game');

    },

    exitStore: function() {

        // Change the state back to game
        this.state.start('Game');

    }


};
