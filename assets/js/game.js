var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue,
    textStyle_Key, textStyle_Value;
var sprite1;
var cashText;
var dumpText;

var buttonBuyShip;
var buttonLoadGame;
var buttonMainMenu;
var buttonNextDay;
var buttonSaveGame;
var button1, button2, button3, button4;

var p1_cashText;
var p2_cashText;
var p3_cashText;
var p4_cashText;

var Game = {

    preload : function() {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        //game.load.image('snake', './assets/images/snake.png');
        //game.load.image('apple', './assets/images/apple.png');
    },

    create : function() {
      console.log("Game Create");
        var background = game.add.sprite(0, 0, "worldmap");
        background.smoothed = false;
        background.scale.x = 2;
        background.scale.y = 2;


        var buttonwidth = 89*2;
        var buttonheight = 21;

        buttonMainMenu = this.add.button(buttonwidth*0, 0, 'mainMenuButtonImage', this.buttonMainMenuClick, this);
        buttonBuyShip =  this.add.button(buttonwidth*1, 0, 'buyShipButtonImage',  this.buttonBuyShipClick, this);
        buttonLoadGame = this.add.button(buttonwidth*2, 0, 'loadGameButtonImage', this.buttonLoadGameClick, this);
        buttonNextDay =  this.add.button(buttonwidth*3, 0, 'nextDayButtonImage',  this.buttonNextDayClick, this);
        buttonSaveGame = this.add.button(buttonwidth*4, 0, 'saveGameButtonImage', this.buttonSaveGameClick, this);

        buttonBuyShip.smoothed = false;
        buttonLoadGame.smoothed = false;
        buttonMainMenu.smoothed = false;
        buttonNextDay.smoothed = false;
        buttonSaveGame.smoothed = false;

        buttonBuyShip .scale.x = 2;
        buttonLoadGame.scale.x = 2;
        buttonMainMenu.scale.x = 2;
        buttonNextDay .scale.x = 2;
        buttonSaveGame.scale.x = 2;

        buttonBuyShip .scale.y = 2;
        buttonLoadGame.scale.y = 2;
        buttonMainMenu.scale.y = 2;
        buttonNextDay .scale.y = 2;
        buttonSaveGame.scale.y = 2;


        var playerbuttonwidth = 64*2;
        var playerbuttonheight = 64*2;

        button1 = this.add.button(playerbuttonwidth*0, playerbuttonheight*1, 'button1', this.buttonPlayer1Click, this);
        button2 = this.add.button(playerbuttonwidth*0, playerbuttonheight*2, 'button2', this.buttonPlayer2Click, this);
        button3 = this.add.button(playerbuttonwidth*0, playerbuttonheight*3, 'button3', this.buttonPlayer3Click, this);
        button4 = this.add.button(playerbuttonwidth*0, playerbuttonheight*4, 'button4', this.buttonPlayer4Click, this);

        button1.smoothed = false;
        button2.smoothed = false;
        button3.smoothed = false;
        button4.smoothed = false;

        button1.scale.x = 2;
        button2.scale.x = 2;
        button3.scale.x = 2;
        button4.scale.x = 2;

        button1.scale.y = 2;
        button2.scale.y = 2;
        button3.scale.y = 2;
        button4.scale.y = 2;

        sprite1 = this.add.sprite(100, 200, 'pirateship');
        sprite1.inputEnabled = true;
        sprite1.input.enableDrag();
        sprite1.scale.x = 1;
        sprite1.scale.y = 1;
        sprite1.events.onInputDown.add(this.sprite1Click, this);


        // Set up a Phaser controller for keyboard input.
        cursors = game.input.keyboard.createCursorKeys();

        game.stage.backgroundColor = '#061f27';



        // Add Text to top of game.
        textStyle_Key = { font: "bold 18px Courier", fill: "#111", align: "left" };
        textStyle_Value = { font: "bold 18px Courier", fill: "#fff", align: "center" };

        dumpText = game.add.text(playerbuttonwidth, playerbuttonheight, "This is the game!!", textStyle_Key);

        dumpText.setText(ShipFactory.getModelName(SHIP_TYPE_RUST_1));
        //scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);


        p1_cashText = this.game.add.bitmapText(this.world.width, 15*1, 'nokia_font', 'Cash:', 15);
        p1_cashText.anchor.x = 1;
        p1_cashText.anchor.y = 0;
        p1_cashText.smoothed = false;
        p1_cashText.setText("Cash: "+Mech.players[1].getCash());

        p2_cashText = this.game.add.bitmapText(this.world.width, 15*2, 'nokia_font', 'Cash:', 15);
        p2_cashText.anchor.x = 1;
        p2_cashText.anchor.y = 0;
        p2_cashText.smoothed = false;
        p2_cashText.setText("Cash: "+Mech.players[2].getCash());

        p3_cashText = this.game.add.bitmapText(this.world.width, 15*3, 'nokia_font', 'Cash:', 15);
        p3_cashText.anchor.x = 1;
        p3_cashText.anchor.y = 0;
        p3_cashText.smoothed = false;
        p3_cashText.setText("Cash: "+Mech.players[3].getCash());

        p4_cashText = this.game.add.bitmapText(this.world.width, 15*4, 'nokia_font', 'Cash:', 15);
        p4_cashText.anchor.x = 1;
        p4_cashText.anchor.y = 0;
        p4_cashText.smoothed = false;
        p4_cashText.setText("Cash: "+Mech.players[4].getCash());

        this.checkForAction();

    },

    buttonPlayer1Click: function() {
      console.log("buttonPlayer1Click");
      Mech.setCurrentPlayer(1);
      //Mech.setCurrentShip(1);

    },
    buttonPlayer2Click: function() {
      console.log("buttonPlayer2Click");
      Mech.setCurrentPlayer(2);

    },
    buttonPlayer3Click: function() {
      console.log("buttonPlayer3Click");
      Mech.setCurrentPlayer(3);

    },
    buttonPlayer4Click: function() {
      console.log("buttonPlayer4Click");
      Mech.setCurrentPlayer(4);

    },
    checkForAction: function() {
      for (var player in Mech.players) {
        for (var ship in Mech.players[player].shipList) {
          if (Mech.players[player].shipList[ship].waitingForAction() ) {
            Mech.setCurrentPlayer(player);
            Mech.setCurrentShip(ship);
            game.state.start("Selector");
          }

        }
      }

    },


    buttonMainMenuClick: function() {
      console.log("buttonMainMenuClick");
      this.mainMenu();

    },
    buttonBuyShipClick: function() {
      console.log("buttonBuyShipClick");
      //var name = prompt("Please enter the name of your new ship", "MS Titanic");
      //Mech.players[1].buyShip(SHIP_TYPE_RUST_1,name);
      game.state.start('Store');
    },
    buttonLoadGameClick: function() {
      console.log("buttonLoadGameClick");

      Mech.players[1].shipList[0].startMission(5000, 10000, "destination", "departure",15);


    },
    buttonNextDayClick: function() {
      console.log("buttonNextDayClick");
      Mech.nextDay();
      console.log(Mech.players[1]);
      this.checkForAction();
    },
    buttonFastForwardClick: function() {
      console.log("buttonFastForwardClick");
      //Start some timer that run nextDay at interval

    },
    buttonSaveGameClick: function() {
      console.log("buttonSaveGameClick");
      console.log("shiplist output:");
      console.log(Mech.players);


    },

    sprite1Click: function() {
      console.log("sprite1click");
      Mech.players[1].addCash(100000);

    },

    update: function() {
        // The update function is called constantly at a high rate (somewhere around 60fps),
        // updating the game field every time.
        // We are going to leave that one empty for now.
        p1_cashText.setText(Mech.players[1].getName()+" : "+Mech.players[1].getCashNiceString());
        p2_cashText.setText(Mech.players[2].getName()+" : "+Mech.players[2].getCashNiceString());
        p3_cashText.setText(Mech.players[3].getName()+" : "+Mech.players[3].getCashNiceString());
        p4_cashText.setText(Mech.players[4].getName()+" : "+Mech.players[4].getCashNiceString());
        this.updateText();
    },

    updateText: function() {
      var shipstatus = "Player "+Mech.currentPlayer+" ships: \n";
      for (var ship in Mech.players[Mech.currentPlayer].shipList) {

        shipstatus += Mech.players[Mech.currentPlayer].shipList[ship].getName()+": ";
        shipstatus += Mech.players[Mech.currentPlayer].shipList[ship].getCurrentStatusInText();
        shipstatus +="\n";
      }

      dumpText.setText( shipstatus );
    },
    generateApple: function(){

        // Chose a random place on the grid.
        // X is between 0 and 585 (39*15)
        // Y is between 0 and 435 (29*15)

        var randomX = Math.floor(Math.random() * 40 ) * squareSize,
            randomY = Math.floor(Math.random() * 30 ) * squareSize;

        // Add a new apple.
        apple = game.add.sprite(randomX, randomY, 'apple');
    },
    render: function() {
        // The update function is called constantly at a high rate (somewhere around 60fps),
        // updating the game field every time.
        // We are going to leave that one empty for now.
        //game.debug.spriteInfo(sprite1, 32, 32);
    },

    mainMenu: function() {
        game.state.start('Menu');
    }

};
