"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
var game = new Phaser.Game( window.width, window.height, Phaser.AUTO, '', {
	preload: preload,
	create: create,
	update: update
} );

var worldSize = 3000;

var start = true;
var title;
var titleButton;
var isoGroup;
var obstacleGroup;
var eventGroup;
var foodGroup;
var player;
var dig;
var digging = false;

function preload() {
	game.load.image( 'title', 'assets/images/titleScreen.png');
	game.load.image( 'tile', 'assets/images/tile2.png' );
	game.load.image( 'bear', 'assets/images/leftBunny222.png' );
	game.load.image( 'dig', 'assets/images/dig.png' );
	game.load.image( 'water', 'assets/images/water.png' );
	game.load.image( 'rock', 'assets/images/rocks.png' );
	game.load.image( 'carrot', 'assets/images/food.png' );
	game.load.image( 'dug', 'assets/images/dug.png' );
	game.load.image( 'snow', 'assets/images/snow.png');
	game.load.image( 'step', 'assets/images/steps.png');
	game.load.image( 'tile2', 'assets/images/tilealt1.png');

	// game.load.image('E', 'images/controls/E.png');
	// game.load.image('N', 'images/controls/N.png');
	// game.load.image('NE', 'images/controls/NE.png');
	// game.load.image('NW', 'images/controls/NW.png');
	// game.load.image('S', 'images/controls/S.png');
	// game.load.image('SE', 'images/controls/SE.png');
	// game.load.image('SW', 'images/controls/SW.png');
	// game.load.image('W', 'images/controls/W.png');

	game.plugins.add( new Phaser.Plugin.Isometric( game ) );
	// In order to have the camera move, we need to increase the size of our world bounds.
	//setBounds(camera x, camera y, worldbound x, worldbound y)
	game.world.setBounds( 0, 0, 9000, 9000 );
	// Start the IsoArcade physics system.
	game.physics.startSystem( Phaser.Plugin.Isometric.ISOARCADE );
	//sets the point of origin for the first tile 0 = far left/top 1 = far right/bottom
	game.iso.anchor.setTo( 0.5, 0 );
}

function create() {
	//make groups
	isoGroup = game.add.group();
	foodGroup = game.add.group();
	eventGroup = game.add.group();
	obstacleGroup = game.add.group();
	// Set the global gravity for IsoArcade.
	game.physics.isoArcade.gravity.setTo( 0, 0, -500 );

	spawnTiles();
	spawnDig();
	initPlayer();
	spawnWater();
	spawnRocks();


	// Set up our controls.
	this.cursors = game.input.keyboard.createCursorKeys();

	this.game.input.keyboard.addKeyCapture( [
		Phaser.Keyboard.LEFT,
		Phaser.Keyboard.RIGHT,
		Phaser.Keyboard.UP,
		Phaser.Keyboard.DOWN,
		Phaser.Keyboard.SPACEBAR
	] );
	var space = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );

	space.onDown.add( function() {
		digging = true;
		game.time.events.add(Phaser.Timer.SECOND * 0.2, diggingFalse, this);
	}, this );
	if (start === false ){
	//fixedtoCAMERA look this up
	title = game.add.sprite(game.camera.centerX+910, game.camera.centerY, 'title');
	title.anchor.setTo(0.5);
	title.scale.setTo(0.8,0.8);
	title.inputEnabled = true;
	console.log(game.camera.centerX, game.camera.centerY);
}

//SNOW STUFF
var emitter = game.add.emitter(game.camera.centerX+910, 0, 2500);
emitter.width = game.world.width;
emitter.makeParticles('snow');
emitter.minParticleScale = 0.3;
emitter.maxParticleScale = 0.9;
emitter.setYSpeed(300, 500);
emitter.setXSpeed(5, 25);
emitter.angle = 30
emitter.minRotation = 0;
emitter.maxRotation = 0;

emitter.start(false, 2500, 1, 0);
}

function update() {
	if (start === false){
		title.events.onInputDown.add( function(){
			title.destroy();
			start = true;
		}, this );
	} else {
	var speed = 100;

	if ( this.cursors.up.isDown ) {
		player.body.velocity.y = -speed;
	} else if ( this.cursors.down.isDown ) {
		player.body.velocity.y = speed;
	} else {
		player.body.velocity.y = 0;
	}

	if ( this.cursors.left.isDown ) {
		player.body.velocity.x = -speed;
	} else if ( this.cursors.right.isDown ) {
		player.body.velocity.x = speed;
	} else {
		player.body.velocity.x = 0;
	}

	//collision and topological sorting (figured it out DONT FORGET TO CHECK PINK LINES)
	game.physics.isoArcade.collide( obstacleGroup );
	game.iso.topologicalSort( obstacleGroup );
	game.physics.isoArcade.collide( eventGroup );
	game.iso.topologicalSort( eventGroup );
	overlapCheck();
}
console.log(player.x,player.y);
}

function spawnTiles() {
	var tile;
	var newTile;
	//tile dimesions width = 64px height = 37px
	//so in this loop its adding a tile every 38px
	for ( var i = 0; i < worldSize; i += 76 ) {
		for ( var j = 0; j < worldSize; j += 76 ) {
			// Create a tile using the new game.add.isoSprite factory method at the specified position.
			// The last parameter is the group you want to add it to (just like game.add.sprite)
			var rnd = rndNum (40);
			if ( rnd == 0 ){
				newTile = game.add.isoSprite( i, j, 0, 'tile2', 0, isoGroup );
				newTile.anchor.setTo(0.5, 0);
				game.physics.isoArcade.enable ( newTile );
				newTile.body.collideWorldBounds = true;
			} else {
			tile = game.add.isoSprite( i, j, 0, 'tile', 0, isoGroup );
			tile.anchor.setTo( 0.5, 0 );
			game.physics.isoArcade.enable ( tile );
			tile.body.collideWorldBounds = true;
			}
		}
	}
}

function spawnRocks() {
	var rock;
	for ( var i = 0; i < worldSize; i += 38 ) {
		for ( var j = 0; j < worldSize; j += 38 ) {
			//randomly pick tiles to place so in this case 1:21 chance of being placed (i guess, honestly im no good at math)
			var rnd = rndNum( 40 );
			if ( rnd == 0 ) {
				rock = game.add.isoSprite( i, j, 0, 'rock', 0, obstacleGroup );
				rock.anchor.setTo( 0.5, 0 );
				game.physics.isoArcade.enable( rock );
				rock.body.collideWorldBounds = true;
				rock.body.immovable = true;
			}
		}
	}
}

function spawnWater() {
	var water;
	for ( var i = 0; i < worldSize; i += 38 ) {
		for ( var j = 0; j < worldSize; j += 38 ) {
			var rnd = rndNum( 40 );
			if ( rnd == 1 ) {
				water = game.add.isoSprite( i, j, 0, 'water', 0, obstacleGroup );
				water.anchor.setTo( 0.5, 0 );
				game.physics.isoArcade.enable( water );
				water.body.collideWorldBounds = true;
				water.body.immovable = true;
			}
		}
	}
}

function spawnDig() {
var dig;
var newGround;
	for ( var i = 0; i < worldSize; i += 38 ) {
		for ( var j = 0; j < worldSize; j += 38 ) {
			//randomly pick tiles to place so in this case 1:21 chance of being placed (i guess, honestly im no good at math)
			var rnd = rndNum( 40 );
			if ( rnd == 2 ) {
				dig = game.add.isoSprite( i, j, 0, 'dig', 0, eventGroup );
				dig.anchor.setTo( 0.5, 0 );
				// newGround = game.add.isoSprite( i, j, 0, 'dug', 0, foodGroup );
				// newGround.anchor.setTo( 0.5, 0);
				game.physics.isoArcade.enable( dig );
				dig.body.collideWorldBounds = true;
			}
		}
	}
}

function initPlayer() {
	player = game.add.isoSprite( 1350, 2500, 0, 'bear', 0, obstacleGroup );
	player.anchor.setTo( 0.5 );
	player.x = 4500;
	player.y = 700;
	game.physics.isoArcade.enable( player );
	player.body.collideWorldBounds = true;
	// Make the camera follow the player.
	game.camera.follow( player );
	game.camera.scale.x = 1;
	game.camera.scale.y = 1;
}

function rndNum( num ) {
	return Math.floor( Math.random() * num );
}

function diggingFalse(){
	digging=false;
}

function overlapCheck(){
	var newGround;
	eventGroup.forEach(function(dig){
		game.physics.isoArcade.overlap(dig, player ,function(holeTile,player){
						// newGround = game.add.isoSprite( holeTile.world.x, holeTile.world.y, 0, 'dug', 0, foodGroup );
						// newGround.anchor.setTo( 0.5, 0);
						// console.log(holeTile.world.x, holeTile.world.y, newGround.x, newGround.y);
						holeTile.loadTexture('dug');
					// 	if(digging == true){
					// 	holeTile.destroy();
					// 	digging = false;
					// };
	        });
});
	// isoGroup.forEach(function(tile){
	// 	game.physics.isoArcade.overlap(tile, player ,function(freshTile,player){
	// 					// newGround = game.add.isoSprite( holeTile.world.x, holeTile.world.y, 0, 'dug', 0, foodGroup );
	// 					// newGround.anchor.setTo( 0.5, 0);
	// 					// console.log(holeTile.world.x, holeTile.world.y, newGround.x, newGround.y);
	// 					freshTile.loadTexture('step');
	// 				// 	if(digging == true){
	// 				// 	holeTile.destroy();
	// 				// 	digging = false;
	// 				// };
	// 		});
	// });
}
