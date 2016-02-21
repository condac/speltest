
var Store = {

  //var background,text
  //var logo;
  param1 : 0,

    preload : function() {

        this.game.stage.backgroundColor = '#CBA';

        //var phaserJSON = this.game.cache.getJSON('shipDatabase');
        //phaserJSON = phaserJSON["shipDatabase"];
        //console.log(phaserJSON);
        //for (var ship in phaserJSON) {
        //  this.game.load.image(phaserJSON[ship].shipIcon, './assets/images/'+phaserJSON[ship].shipIcon);
            //console.log("tried to load:"+phaserJSON[ship].shipIcon);
        //}

    },

    create: function () {
      //var background = game.add.sprite(0, 0, "storeBackground");
      //background.smoothed = false;
      //background.scale.x = 2;
      //background.scale.y = 2;

        var gamelogoText;
        gamelogoText = this.add.bitmapText(this.world.centerX, 10, 'nokia_font', 'This is the Store',30);
        gamelogoText.anchor.x = 0.5;
        gamelogoText.anchor.y = 0;
        gamelogoText.smoothed = false;
	       gamelogoText.tint = 0x223344;
        var exitText;
        exitText = this.add.bitmapText(this.world.centerX,this.world.height, 'nokia_font', 'Exit Store',20);
        exitText.anchor.x = 0.5;
        exitText.anchor.y = 1;
        exitText.smoothed = false;
        exitText.inputEnabled = true;
        // It will act as a button to start the game.
        exitText.events.onInputDown.add(this.exitStore, this);


        var i = 0;
        var categoryButtonWidth = 120;
        var categoryButtonHeight = 32;

        for (var cat in Mech.jsonShipCategory) {
          var categoryButton = this.add.button(100+categoryButtonWidth*i,50, "categoryButton", this.changeCategory, this );
          categoryButton.cat = cat
          categoryButton.smoothed = false;
          categoryButton.anchor.x = 0;
          categoryButton.anchor.y = 0;
          categoryButton.scale.x = 2;
          categoryButton.scale.y = 2;

          var categoryText = this.add.bitmapText(100+categoryButtonWidth*i+categoryButtonWidth/2, 50+categoryButtonHeight/2, 'nokia_font', Mech.jsonShipCategory[cat].name,20);
          categoryText.cat = cat;
          categoryText.anchor.x = 0.5;
          categoryText.anchor.y = 0.5;
          categoryText.smoothed = false;
          categoryText.inputEnabled = true;
          categoryText.tint = 0x223344;
          // It will act as a button to start the game.
          categoryText.events.onInputDown.add(this.changeCategory, this);


          i += 1;


          //this.game.load.image(phaserJSON[ship].shipIcon, './assets/images/'+phaserJSON[ship].shipIcon);
          //phaserJSON[ship].shipIcon
        }

        /*
        var menuButton;
        // Add a sprite to your game, here the sprite will be the game's logo
        // Parameters are : X , Y , image name (see above)

        menuButton = this.add.button(this.world.centerX, this.world.centerY, 'crapship', this.buyShip, this );
        menuButton.shipType = SHIP_TYPE_RUST_1;
        menuButton.smoothed = false;
        menuButton.anchor.x = 0.5;
        menuButton.anchor.y = 0.5;
        menuButton.scale.x = 1;
        menuButton.scale.y = 1;
        */

        var shipImageHeight = 160;
        var textwidthoffset = 500;
        var startHeight = 100;
        //var phaserJSON = this.game.cache.getJSON('shipDatabase');
        var phaserJSON = Mech.jsonShipDatabase; //phaserJSON["shipDatabase"];
        console.log(phaserJSON);
        var i = 0;
        for (var ship in phaserJSON) {
          if (phaserJSON[ship].category ==Mech.storeCurrentCategory) {
            var shipButton = this.add.button(textwidthoffset, startHeight+shipImageHeight*i, phaserJSON[ship].shipIcon, this.buyShip, this );
            shipButton.shipType = phaserJSON[ship].id;
            shipButton.smoothed = false;
            shipButton.anchor.x = 0;
            shipButton.anchor.y = 0;
            shipButton.scale.x = 2;
            shipButton.scale.y = 2;
            var shipTextString =
                                " "+ phaserJSON[ship].modelName+"\n"+
                                " Cost: "+ phaserJSON[ship].cost+"\n"+
                                " FuelTank: "+ phaserJSON[ship].tankSize+"\n"+
                                " cargoSize: "+ phaserJSON[ship].cargoSize+"\n"+
                                " maxSpeed: "+ phaserJSON[ship].maxSpeed+"\n"+
                                " dailyCost: "+ phaserJSON[ship].dailyCost+"\n"+
                                " fuelUse: "+ phaserJSON[ship].fuelUse+"\n"+
                                "";
            var shipText;
            shipText = this.add.bitmapText(150, startHeight+shipImageHeight*i+5, 'nokia_font', shipTextString,20);
            shipText.anchor.x = 0;
            shipText.anchor.y = 0;
            shipText.smoothed = false;

            i += 1;
          }

          //this.game.load.image(phaserJSON[ship].shipIcon, './assets/images/'+phaserJSON[ship].shipIcon);
          //phaserJSON[ship].shipIcon
        }
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
    changeCategory: function(button) {
      console.log("Store: changeCategory" +button.cat);
        Mech.storeCurrentCategory = button.cat;
        this.state.start('Store');

    },



    exitStore: function() {

        // Change the state back to game
        this.state.start('Game');

    }


};
