var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'vart syns denna text?');


game.state.add('Boot', Boot);
game.state.add('Loading', Load);
game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('Store', Store);
game.state.add('Selector', Selector);

game.state.start('Boot');
