// Selector is the gamestate where player select what to do with a ship when it is at a port waiting for orders
// Selector is started by a ship during nextDay() when a ship needs input.

var Selector_mission = {

  //Posible outcome are a ship that is going on a mission or delay the ship at port for x days for repairs or just wait
  // Functions to do before is to repair, repair, and select mission

  shiptext: 0,
  repairing: false,
  repairAmount: 0,



    preload : function() {

        this.game.stage.backgroundColor = '#EDC';

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


      var textSize = 20;
      var textSpace = textSize +1;

      var playerTextString = "Select cargo for: "+Mech.players[Mech.currentPlayer].shipList[Mech.currentShip].getName()+".";
        var playerText;
        playerText = this.add.bitmapText(10, 10, 'nokia_font', playerTextString,30);
        playerText.anchor.x = 0;
        playerText.anchor.y = 0;
        playerText.smoothed = false;

        var i = 0;

        for (var port in Mech.ports[Mech.cPort].connections ) {
          //console.log(Mech.ports[Mech.cPort].connections[port]);
          var distance = Mech.ports[Mech.cPort].getDistanceTo(Mech.ports[Mech.cPort].connections[port]);
          var distancenm = Math.round(distance)+"nm";
            var portButton = this.add.bitmapText(150, 40+32*i+5, 'nokia_font', PortFactory.getName(Mech.ports[Mech.cPort].connections[port])+"   "+distancenm ,20);
            portButton.portId = Mech.ports[Mech.cPort].connections[port];
            portButton.distance = distance;
            portButton.smoothed = false;
            portButton.anchor.x = 0;
            portButton.anchor.y = 0;
            portButton.scale.x = 2;
            portButton.scale.y = 2;
            portButton.inputEnabled = true;
            // It will act as a button
            portButton.events.onInputDown.add(this.portButtonClick, this);

            var shipTextString =
                                " "+ Mech.ports[Mech.cPort].connections[port]+"\n"+

                                "";
            //var shipText;
            //shipText = this.add.bitmapText(150, 40+30*i+5, 'nokia_font', shipTextString,20);
            //shipText.anchor.x = 0;
            //shipText.anchor.y = 0;
            //shipText.smoothed = false;

            i += 1;


          //this.game.load.image(phaserJSON[ship].shipIcon, './assets/images/'+phaserJSON[ship].shipIcon);
          //phaserJSON[ship].shipIcon
        }

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
    portButtonClick: function(button) {
      console.log(button.portId);
      Mech.setDestination(button.portId, button.distance);

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
                            "Oil Price: $"+Mech.ports[Mech.cPort].getOilPriceText()+" per Ton \n"+
                            "";

        //shipText.setText(shipTextString);


    },


};
