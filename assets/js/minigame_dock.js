// Selector is the gamestate where player select what to do with a ship when it is at a port waiting for orders
// Selector is started by a ship during nextDay() when a ship needs input.



var Minigame_dock = {

   key1: 0,
   key2: 0,
   key3: 0,
   key4: 0,
   key5: 0,
   tslider: 0,
   tback: 0,
   debugtext: 0,
   throttlePositionY: 320,
   throttlePositionX: 320,
   throttleSizeY: 200,
   throttleInput: 0,
   turnPositionY: 520,
   turnPositionX: 270,
   turnSizeX: 100,
   turnInput: 0,
   boatSprite: 0,
   level: 0,
   hit: 0,


  //Posible outcome are a ship that is going on a mission or delay the ship at port for x days for repairs or just wait
  // Functions to do before is to refuel, repair, and select mission

    preload : function() {

        this.game.stage.backgroundColor = '#669ED3';

    },

    create: function () {

      game.physics.startSystem(Phaser.Physics.P2JS);

      throttlePositionY = 320;
      throttlePositionX = 1000;
      throttleSizeY = 200;
      throttleInput = 0;

      turnPositionY= 520;
      turnPositionX= 950;
      turnSizeX = 100;
      turnInput = 0;

      hit = 0;
      //var background = game.add.sprite(0, 0, "portBackground");
      //background.smoothed = false;
      //background.scale.x = 2;
      //background.scale.y = 2;

      var boatoffset = 450;
      var waterlevel = 148;

      //var waterline = game.add.sprite(0, game.world.height-waterlevel, "portBackground_water");
      //waterline.smoothed = false;
      //waterline.scale.x = 2;
      //waterline.scale.y = 2;
      //waterline.alpha = 0.9;

      map = game.add.tilemap('level1');

      //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
      map.addTilesetImage('tileset', 'gameTiles');

      //create layer
      backgroundlayer = map.createLayer('Tile Layer 1');
      //blockedLayer = map.createLayer('collayer');
      //blockedLayer.resizeWorld(); // tror den gör om physics gränser till tilemaps dimentioner
      //collision on blockedLayer
      map.setCollisionBetween(5, 12);
      game.physics.p2.convertTilemap(map, backgroundlayer);
      //this.map.setCollisionBetween(1, 100, true, 'collayer'); // Sifrorna är vilket tile id i jsonfilen den ska loopa till

      //this.backgroundlayer.resizeWorld();

      //map = this.add.tilemap('level01');
      //map.addTilesetImage('Space', 'tiles');
      //layer = map.createLayer('Space');
      //layer.resizeWorld();// next set collisions
      //map.setCollisionBetween(1, 99);
      // example
      //then below the collision set up have this





      boatSprite = game.add.sprite(100, boatoffset, "sliderY" );
      boatSprite.inputEnabled = true;
      //boatSprite.input.enableDrag();
      boatSprite.smoothed = false;
      boatSprite.scale.x = 0.5;
      boatSprite.scale.y = 0.5;
      boatSprite.anchor.x = 0.5;
      boatSprite.anchor.y = 0.5;


      game.physics.p2.enable(boatSprite);
      boatSprite.body.mass = 100;
      boatSprite.body.drag = 100;
      game.physics.p2.friction = 0.1;
      //level = game.add.sprite(0, 0, "minigame_dock_level1");
      //level.smoothed = false;
      //level.scale.x = 1;
      //level.scale.y = 1;
      //game.physics.p2.enable(this.blockedLayer, true); // true fals is debuging
      //  Here we create a Body specific callback.
    //  Note that only impact events between the ship and the panda are used here, the sweet/candy object is ignored.
      //boatSprite.body.createBodyCallback(this.blockedLayer, this.hitLevel, this);

    //  And before this will happen, we need to turn on impact events for the world
      game.physics.p2.setImpactEvents(true);


      cursors = game.input.keyboard.createCursorKeys();

      // Throttle slider


      tback = this.add.sprite(throttlePositionX, throttlePositionY, "sliderY" );
      //tback.inputEnabled = true;
      //tback.input.enableDrag();
      tback.smoothed = false;
      tback.scale.x = 1;
      tback.scale.y = 1;

      tslider = this.add.sprite(throttlePositionX, throttlePositionY+throttleSizeY/2, "portMapPin" );
      tslider.inputEnabled = true;
      tslider.input.enableDrag();
      tslider.smoothed = false;
      tslider.scale.x = 8;
      tslider.scale.y = 8;
      tslider.input.boundsSprite = tback;

      //Turn slider
      turnback = this.add.sprite(turnPositionX, turnPositionY, "sliderX" );
      //tback.inputEnabled = true;
      //tback.input.enableDrag();
      turnback.smoothed = false;
      turnback.scale.x = 1;
      turnback.scale.y = 1;

      turnslider = this.add.sprite(turnPositionX+turnSizeX/2, turnPositionY, "portMapPin" );
      turnslider.inputEnabled = true;
      turnslider.input.enableDrag();
      turnslider.smoothed = false;
      turnslider.scale.x = 8;
      turnslider.scale.y = 8;
      turnslider.anchor.x = 0.5;
      turnslider.anchor.y = 0;
      turnslider.input.boundsSprite = turnback;


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

      var playerTextString = "Minigame "+Mech.players[Mech.currentPlayer].getName()+":"
      var playerText;
      playerText = this.add.bitmapText(10, 10, 'nokia_font', playerTextString,30);
      playerText.anchor.x = 0;
      playerText.anchor.y = 0;
      playerText.smoothed = false;

      //console.log(Mech.ports[Mech.cPort]);
      //console.log(Mech.ports);
      //console.log(Mech.cPort);

      debugtext = game.add.text(5, game.world.height, '- debugtext sätts i update -');
      debugtext.anchor.x = 0;
      debugtext.anchor.y = 1;
      debugtext.align = 'center';

      //  Font style
      debugtext.font = 'Arial Black';
      debugtext.fontSize = 12;
      debugtext.fontWeight = 'bold';
      debugtext.fill = '#ff00ff';
      debugtext.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

    },

    hitLevel: function( body1, body2) {
      hit += 1;

    },
    update: function() {
        // The update function is called constantly at a high rate (somewhere around 60fps),
        // updating the game field every time.
        throttleInput = tslider.y - throttlePositionY - throttleSizeY/2;
        turnInput = turnslider.x - turnPositionX - turnSizeX/2;
        var temptext = "Debug:"+" Throttle: "+throttleInput+" Turn: "+turnInput+""+" hit: "+hit+"";

        boatSprite.body.thrust(-throttleInput*1.0);
        turnInput = turnInput*(throttleInput/400);
        boatSprite.body.rotateLeft(turnInput);

        debugtext.setText(temptext);

        if (cursors.left.isDown)        {
            boatSprite.body.rotateLeft(10);
        }
        else if (cursors.right.isDown)        {
            boatSprite.body.rotateRight(10);
        }
        else        {
            //boatSprite.body.setZeroRotation();
        }

        if (cursors.up.isDown)        {
            boatSprite.body.thrust(400);
        }
        else if (cursors.down.isDown)        {
            boatSprite.body.reverse(400);
        }

    },


    exitStore: function() {

        // Change the state back to game
        this.state.start('Game');

    }


};
