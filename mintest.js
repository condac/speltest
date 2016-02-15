var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'vart syns denna text', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('boss', 'assets/lego.png');
    game.load.image('melon', 'assets/lego.png');
    game.load.spritesheet('button', 'assets/phaser.png', 63, 22);

}

var boss;
var melon;
var button;
var text;

function create() {

    game.time.advancedTiming = true;
    boss = game.add.sprite(game.world.centerX, game.world.centerY, 'boss');
    boss.anchor.setTo(0.5, 0.5);

    melon = game.add.sprite(500, game.world.centerY, 'melon');
    melon.anchor.setTo(0.5, 0.5);

    //  For browsers that support it, this keeps our pixel art looking crisp (works across Canvas and WebGL)

    //  You can either set smoothing on a specific sprite, like this:
    boss.smoothed = false;

    boss.scale.x = 2;
    boss.scale.y = 2;

    melon.scale.x = 1;
    melon.scale.y = 1;

    //  Or across the whole stage, like this:
    // game.stage.smoothed = false;

    //  Zoom in each time we press the button
    button = game.add.button(32, 32, 'button', clickedIt, this, 0, 0, 0);
    button.smoothed = false;
    button.scale.x = 2;
    button.scale.y = 2;

    var style = { font: "16px Courier", fill: "#fff", align: "left" };

    text = game.add.text(32, 64, 'hej hej', style);
}

function clickedIt() {

    boss.scale.x += 0.5;
    boss.scale.y += 0.5;

    melon.scale.x += 0.5;
    melon.scale.y += 0.5;

}
function render() {

    game.debug.bodyInfo(boss, 132, 32);
    text.setText(game.time.fps);

}
