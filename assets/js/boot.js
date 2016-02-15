
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
    this.game.load.spritesheet('button', 'assets/images/phaser.png', 63, 22);

  },
  create: function() {
    this.game.state.start('Menu');
  }
};
