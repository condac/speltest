
var Boot = function(game) {
  this.game = game;
};

Boot.prototype = {
  preload: function() {

		this.game.stage.backgroundColor = '#461f27';
    this.game.load.bitmapFont('nokia_font', './assets/fonts/nokia.png', './assets/fonts/nokia.xml');
    this.game.load.image('loading', './assets/images/loading.png');

  },
  create: function() {
   this.game.state.start('Loading');
  }
};

var Load = function(game) {
  this.game = game;
};

Load.prototype = {
  preload: function() {

    var loadingText = this.game.add.bitmapText(Game.w/2, Game.h/2, 'nokia_font', 'Loading...', 21);
    loadingText.x = this.game.width / 2 - loadingText.textWidth / 2;

  	var preloading = this.game.add.sprite(Game.w/2-64, Game.h/2+50, 'loading');
  	this.game.load.setPreloadSprite(preloading);

    // Place all files to load here
    this.game.load.image('logo', './assets/images/lego.png');
    this.game.load.image('worldmap', './assets/images/world-map_640_16color.png');
    this.game.load.spritesheet('button', 'assets/images/phaser.png', 63, 22);
    this.game.load.json('shipDatabase', './assets/ships.json');
    //this.game.load.json('portDatabase', './assets/ports.json');
    this.game.load.image('buyShipButtonImage', './assets/images/buyship.png');
    this.game.load.image('loadGameButtonImage', './assets/images/loadgame.png');
    this.game.load.image('mainMenuButtonImage', './assets/images/mainmenu.png');
    this.game.load.image('nextDayButtonImage', './assets/images/nextday.png');
    this.game.load.image('saveGameButtonImage', './assets/images/savegame.png');
    this.game.load.image('pirateship', './assets/images/pirate-ship.png');
    this.game.load.image('button1', './assets/images/knapp11.png');
    this.game.load.image('button2', './assets/images/knapp22.png');
    this.game.load.image('button3', './assets/images/knapp33.png');
    this.game.load.image('button4', './assets/images/knapp44.png');
    //Loop function to load all images specified in ships.json


  },
  create: function() {
    Mech.createWorld();
    this.game.state.start('Menu');
  }
};
