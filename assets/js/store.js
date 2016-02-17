
var Store = {

  //var background,text
  //var logo;
  param1 : 0,

    preload : function() {

        this.game.stage.backgroundColor = '#6f7';

    },

    create: function () {
      //var background = game.add.sprite(0, 0, "storeBackground");
      //background.smoothed = false;
      //background.scale.x = 2;
      //background.scale.y = 2;

        var gamelogoText;
        gamelogoText = this.add.bitmapText(this.world.centerX, this.world.centerY/2, 'nokia_font', 'This is the Store',30);
        gamelogoText.anchor.x = 0.5;
        gamelogoText.anchor.y = 0.5;
        gamelogoText.smoothed = false;

        var exitText;
        exitText = this.add.bitmapText(this.world.centerX,this.world.height, 'nokia_font', 'Exit Store',20);
        exitText.anchor.x = 0.5;
        exitText.anchor.y = 1;
        exitText.smoothed = false;
        exitText.inputEnabled = true;
        // It will act as a button to start the game.
        exitText.events.onInputDown.add(this.exitStore, this);



        var menuButton;
        // Add a sprite to your game, here the sprite will be the game's logo
        // Parameters are : X , Y , image name (see above)

        menuButton = this.add.button(this.world.centerX, this.world.centerY, 'pirateship', this.buyShip, this );
        menuButton.shipType = SHIP_TYPE_RUST_1;
        menuButton.smoothed = false;
        menuButton.anchor.x = 0.5;
        menuButton.anchor.y = 0.5;
        menuButton.scale.x = 1;
        menuButton.scale.y = 1;
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
