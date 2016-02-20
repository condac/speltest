
var Menu = {



    preload : function() {
        // Loading images is required so that later on we can create sprites based on the them.
        // The first argument is how our image will be refered to,
        // the second one is the path to our file.
        this.game.stage.backgroundColor = '#061f27';
        this.game.assets = {
          launch: 0,
          gravity:0,
          etc: ''
        };
        //this.game.assets = JSON.parse(localStorage.getItem('saveSettings'));
        if (this.game.assets.launch != null) {
          this.game.assets = {
            launch: this.game.assets.launch+1,
            gravity:0,
            etc: ''
          };
        } else {
          this.game.assets = {
            launch: 0,
            gravity:0,
            etc: ''
          };
        }
    },

    create: function () {
      this.state.start('Game');
        var logo;
        // Add a sprite to your game, here the sprite will be the game's logo
        // Parameters are : X , Y , image name (see above)
        logo = this.add.sprite(this.world.centerX, this.world.centerY/3, 'logo');
        logo.smoothed = false;
        logo.scale.x = 2;
        logo.scale.y = 2;


        var versionText;
        versionText = this.add.bitmapText(this.world.width - 1, this.world.height - 1, 'nokia_font', 'v0.01',12);
        versionText.anchor.x = 1;
        versionText.anchor.y = 1;
        versionText.smoothed = false;

        var gamelogoText;
        gamelogoText = this.add.bitmapText(this.world.centerX, this.world.centerY/2, 'nokia_font', 'OpenPorts!'+this.game.assets.launch,30);
        gamelogoText.anchor.x = 0.5;
        gamelogoText.anchor.y = 0.5;
        gamelogoText.smoothed = false;

        var startText;
        startText = this.add.bitmapText(this.world.centerX, this.world.centerY, 'nokia_font', 'Start Game',20);
        startText.anchor.x = 0.5;
        startText.anchor.y = 0.5;
        startText.smoothed = false;
        startText.inputEnabled = true;
        // It will act as a button to start the game.
        startText.events.onInputDown.add(this.startGame, this);

        var saveText;
        saveText = this.add.bitmapText(this.world.centerX, this.world.centerY - 40, 'nokia_font', 'Save Settings',20);
        saveText.anchor.x = 0.5;
        saveText.anchor.y = 0.5;
        saveText.smoothed = false;
        saveText.inputEnabled = true;
        // It will act as a button to start the game.
        saveText.events.onInputDown.add(this.saveSettings, this);

    },

    startGame: function () {

        // Change the state to the actual game.
        this.state.start('Game');

    },
    saveSettings: function () {

      localStorage.setItem('saveSettings',JSON.stringify(this.game.assets));
      this.game.assets = JSON.parse(localStorage.getItem('saveSettings'));
    }

};
