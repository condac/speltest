var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'vart syns denna text?');

var banan = new Player.constructor();

game.state.add('Boot', Boot);
game.state.add('Loading', Load);
game.state.add('Menu', Menu);
game.state.add('Game', Game);

game.state.start('Boot');
