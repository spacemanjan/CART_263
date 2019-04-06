"use strict";

/*****************

Snow-Drift
Yann-Maurice McNiven

In Snow Drift you play as a rabbit lost in a snowy landscape, your one goal is Survival, to
survive you must find food but food is not abundant in this barren wasteland. The narrator
guides you as you explore documenting your story, obey, reject, or toy with him as you will.
The important part is to have fun.

******************/
//========VARIABLES========//
//The various variables used in the game
var emitter;
var title;
var titleButton;
var player;
var space;

//SOUNDTRACK taken from: https://www.youtube.com/watch?v=Elo8-CuGJTo
var soundTrack;

//=======TILES==========//
var tile;
var newTile;
var dig;
var newGround;

//======OBSTACLES=====//
var rock;
var water;

//========GROUPS========//
//The different groups which hold different objects and ties them through common properties
var isoGroup;
var obstacleGroup;
var eventGroup;
var foodGroup;

//========CONSTANTS========//
//The constant variables used in game can be editted here

//Camera scale controller
var zoom = 1;

//WorldSize controls the Isometric arrays used for generating the game world
//example: for ( var i = 0; i < worldSize; i += xxx );
var worldSize = 3000;

//Start is used for the Title screen if false = display Title titleScreen, if true = give player control
var start = false;

//Digging is used to check if the player has infact pressed space to dig, default is false
var digging = false;

//the Typical achorPoint for everything
//0.5 means center of image
var anchorPoint = 0.5

//Player movement speed
var speed = 100;

//Is it snowing?
var snowing = true;

//==========GAME============//
//Initiate Game Object
//declare width,height & functions -- this is our main Object
var game = new Phaser.Game( window.width, window.height, Phaser.AUTO, '', {
	preload: preload,
	create: create,
	update: update
} );

//========PRELOAD()========//
//The preload function is where images are loaded into the game Object
//The Isometric Plugin is added in here, the worldBounds are set Here
//The aracade Physics system is launched here.
function preload() {
	//-----------SOUNDS----------//
	game.load.audio('music',['assets/sounds/PeacefulPiano.mp3']);

	//-----------IMAGES-----------//
	//********NEED TO CHANGE THE NAMES OF THESE CUZ THEY CONFUSING
	game.load.image( 'title', 'assets/images/titleScreen.png' );
	game.load.image( 'tile', 'assets/images/snowTile.png' );
	game.load.image( 'player', 'assets/images/leftBunny222.png' );
	game.load.image( 'dig', 'assets/images/dig.png' );
	game.load.image( 'water', 'assets/images/water.png' );
	game.load.image( 'rock', 'assets/images/rocks.png' );
	game.load.image( 'carrot', 'assets/images/food.png' );
	game.load.image( 'dug', 'assets/images/dug.png' );
	game.load.image( 'snow', 'assets/images/snow.png' );
	game.load.image( 'step', 'assets/images/steps.png' );
	game.load.image( 'tile2', 'assets/images/floor.png' );

	// game.load.image('E', 'images/controls/E.png');
	// game.load.image('N', 'images/controls/N.png');
	// game.load.image('NE', 'images/controls/NE.png');
	// game.load.image('NW', 'images/controls/NW.png');
	// game.load.image('S', 'images/controls/S.png');
	// game.load.image('SE', 'images/controls/SE.png');
	// game.load.image('SW', 'images/controls/SW.png');
	// game.load.image('W', 'images/controls/W.png');

	// This adds the Phaser Isometric Plugin
	game.plugins.add( new Phaser.Plugin.Isometric( game ) );
	// In order to have the camera move, we need to set our worldBounds
	// setBounds(camera x, camera y, worldbound x, worldbound y)
	game.world.setBounds( 0, 0, 9000, 9000 );
	// Start the IsoArcade physics system.
	game.physics.startSystem( Phaser.Plugin.Isometric.ISOARCADE );
	//sets the point of origin for the first tile 0 = far left/top 1 = far right/bottom
	game.iso.anchor.setTo( anchorPoint, 0 );
}

//========CREATE()========//


function create() {

	// Set the global gravity for IsoArcade.
	game.physics.isoArcade.gravity.setTo( 0, 0, -500 );

	//Create the groups with the varaibles we made at the top
	//The order we declare these groups is important as it sets their priority in relation to each other
	//ISOGROUP is...
	isoGroup = game.add.group();
	//FOODGROUP is...
	foodGroup = game.add.group();
	//EVENTGROUP is...
	eventGroup = game.add.group();
	//OBSTACLEGROUP is...
	obstacleGroup = game.add.group();

	//------TITLESCREEN-IN-CREATE------//
	// "If game hasn't started yet then display the titleScreen sprite"
	if ( start === false ) {
		// add the Title Screen Sprite to game, position it at center screen based on the camera x & y
		title = game.add.sprite( game.camera.x + 400, game.camera.centerY, 'title' );
		// set the achorPoint of this sprite's x to the center
		title.anchor.setTo( anchorPoint );
		// scale the image to fit in our canvas
		title.scale.setTo( 0.8, 0.8 );
		// enable titleScreen to recieve input (i.e. notice when it's been clicked on)
		title.inputEnabled = true;
	}

	//----------WORLD-MAKING------------//
	//Here is where the world is being made
	//Each of these is creating one layer of the world & sets their importance (last being the most important and first being the least)
	//spawnTiles creates the base layer of the world (i.e. the initial worldSize)
	spawnTiles();
	//spawnDig creates the food stashs located around the map
	spawnDig();
	//initPlayer creates the player
	initPlayer();
	//spawnWater creates the bodies of water located on the map
	spawnWater();
	//spawnRocks creates the bolders found around the map
	spawnRocks();
	//snowEmitter creates the emitter of the snow particles
	snowEmitter();

	//-----------CONTROLS-------------//
	// Set up our controls using the phaser cursor, which is an embeded controler
	this.cursors = game.input.keyboard.createCursorKeys();
	// Create a listener for the possible key presses
	this.game.input.keyboard.addKeyCapture( [
		Phaser.Keyboard.LEFT,
		Phaser.Keyboard.RIGHT,
		Phaser.Keyboard.UP,
		Phaser.Keyboard.DOWN,
		Phaser.Keyboard.SPACEBAR
	] );
	//space has to be specified because it is not included in the phaser cursor library
	space = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );

	//----------MUSIC------------//
	//add audio track "music" set it to the soundTrack variable
	soundTrack = game.add.audio('music');
	//set music looping to true
	soundTrack.loop = true;
	//play after a half second (this is to avoid having to click on the screen so it can play on title screen)
	setTimeout(function(){ soundTrack.play(); }, 500);
}

//========UPDATE()========//


function update() {
	//-----TITLESCREEN-----//
	// "if game hasn't begun then when the player clicks anywhere on the title sprite begin game"
	if ( start === false ) {
		//	titlescreen event if clicked
		title.events.onInputDown.add( function() {
			// delete titleScreen so it doesn't remain on screen
			title.destroy();
			// game begins
			start = true;
		}, this );
		// "if game has begun then..."
	} else {

		//Initiate camera controls (i.e. have camera follow player)
		cameraControl();

		//-----------PLAYER CONTROLS------------//

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

		// digging mechanic: if space is pressed then player is digging
		//******should disable other inputs and play animation of player digging
		space.onDown.add( function() {
			digging = true;
			//digging can't be true forever so set digging to false after 20 milliseconds with time event
			game.time.events.add( Phaser.Timer.SECOND * 0.2, function() {
				digging = false;
			}, this );
		}, this );

		//--------COLLISION-&-SORTING-----------//
		// This is isometric plugin stuff
		// here we set the collision detection for the obstacleGroup & eventGroup
		// Topological sort is how the Iso plugin checks what should be in the infront of what
		//****WHEN MAKING SPRITES DONT FORGET TO CHECK PINK LINES****
		game.physics.isoArcade.collide( obstacleGroup );
		game.iso.topologicalSort( obstacleGroup );
		game.physics.isoArcade.collide( eventGroup );
		game.iso.topologicalSort( eventGroup );

		//OVERLAP CHECK, is how we check if the player sprite is over the digging tile & leaves paw prints
		overlapCheck();
	}

	// console.log area
	// this area is called wether or not start is true
	console.log( digging );
}

//=======VARIOUS-FUNCTIONS=========//
// Here you will find the various functions called in our code
// snowEmitter,initPlayer,overlapCheck,rndNum

// snowEmitter creates and defines the properties of the emitter
function snowEmitter() {
	// Add emitter to game
	emitter = game.add.emitter();
	// give it the sprite it will be emitting
	emitter.makeParticles( 'snow' );
	// define the various properties
	emitter.minParticleScale = 0.3;
	emitter.maxParticleScale = 1.9;
	emitter.setYSpeed( 900 );
	emitter.setXSpeed( 5, 25 );
	emitter.minRotation = 0;
	emitter.maxRotation = 0;
	emitter.maxParticles = 1000;
	// Emitter position & width, fix it to the camera so it's always snowing wherever you are
	emitter.width = 1700;
	emitter.fixedToCamera = true;
	//on & off switch for the snow emitter
	emitter.on = snowing;
	// start the emitter and define its behavior
	//start(explode, lifespan, frequency, quantity);
	emitter.start( false, 1000, 1, 0 );
}

// overlapCheck is an event function which is checking if player is over the dig tile
function overlapCheck() {
	//"for each tile in the event group preform the following..."
	eventGroup.forEach( function( dig ) {
		//"check for overlap between the tile passed in the function above & the player & if they overlap perform..."
		game.physics.isoArcade.overlap( dig, player, function( holeTile, player ) {
			// if player is digging for food
			if ( digging == true ) {
				// replace the texture of the tile with a new texture
				//***have a food item pop up above the players head + fill their food meter (with appropriate level of nutrition)
				holeTile.loadTexture( 'dug' );
			};
		} );
	} );
	//THIS WAS USED TO MAKE THE PAW PRINTS IN THE SNOW
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

// Initiate Player, player is created and placed in the world
function initPlayer() {
	//set the player & place it in the obstacle group so it can collide and overlap check + be topologically sorted properly
	player = game.add.isoSprite( 1350, 2500, 0, 'player', 0, obstacleGroup );
	player.anchor.setTo( anchorPoint );
	//should be placed in the center of the world
	player.x = 4500;
	player.y = 700;
	//enable physics on the player
	game.physics.isoArcade.enable( player );
	//collide with the floor of the world/don't fall into oblivion
	player.body.collideWorldBounds = true;
}

// camera Control (pretty clear what this does)
function cameraControl() {
	// Make the camera follow the player.
	game.camera.follow( player );
	// sets the zoom of the camera
	game.camera.scale.x = zoom;
	game.camera.scale.y = zoom;
}

// simple random number function pulls a number from the range its given
function rndNum( num ) {
	return Math.floor( Math.random() * num );
}

//****************FUNCTIONS TBA***********************//
//function music(){}

//function hunger(){}

//function dayNight(){}

//function narrator(){}

//function predatorAI(){}

//function worldGenerator(){}

//=========WORLD-MAKING-FUNCTIONS============//

// In this section is located all the functions called in Create() which make the isometric landscape
// & generates the objects, player, food, water ect...
function spawnTiles() {
	// THIS IS THE TEMPLATE USED FOR PLACING EVERYTHING ELSE IN THE GAMEWORLD
	// The basic function is this: create a loop for the X and then a loop for Y creating a isometric grid
	// Based on the worldSize we add a tile every X amount of pixels (x is determined by the size of grid squares we want)
	//so in this loop we're adding a tile every 158px
	for ( var i = 0; i < worldSize; i += 152 ) {
		for ( var j = 0; j < worldSize; j += 152 ) {
			// Create a tile using the new game.add.isoSprite factory method at the specified position.
			var rnd = rndNum( 2 );
			if ( rnd == 0 ) {
				newTile = game.add.isoSprite( i, j, 0, 'tile2', 0, isoGroup );
				newTile.anchor.setTo( anchorPoint, 0 );
				game.physics.isoArcade.enable( newTile );
				newTile.body.collideWorldBounds = true;
			} else {
				tile = game.add.isoSprite( i, j, 0, 'tile', 0, isoGroup );
				tile.anchor.setTo( anchorPoint, 0 );
				game.physics.isoArcade.enable( tile );
				tile.body.collideWorldBounds = true;
			}
		}
	}
}

function spawnDig() {
	for ( var i = 0; i < worldSize; i += 38 ) {
		for ( var j = 0; j < worldSize; j += 38 ) {
			//randomly pick tiles to place so in this case 1:21 chance of being placed (i guess, honestly im no good at math)
			var rnd = rndNum( 40 );
			if ( rnd == 2 ) {
				dig = game.add.isoSprite( i, j, 0, 'dig', 0, eventGroup );
				dig.anchor.setTo( anchorPoint, 0 );
				// newGround = game.add.isoSprite( i, j, 0, 'dug', 0, foodGroup );
				// newGround.anchor.setTo( 0.5, 0);
				game.physics.isoArcade.enable( dig );
				dig.body.collideWorldBounds = true;
			}
		}
	}
}

function spawnWater() {
	for ( var i = 0; i < worldSize; i += 38 ) {
		for ( var j = 0; j < worldSize; j += 38 ) {
			var rnd = rndNum( 40 );
			if ( rnd == 1 ) {
				water = game.add.isoSprite( i, j, 0, 'water', 0, obstacleGroup );
				water.anchor.setTo( anchorPoint, 0 );
				game.physics.isoArcade.enable( water );
				water.body.collideWorldBounds = true;
				water.body.immovable = true;
			}
		}
	}
}

function spawnRocks() {
	for ( var i = 0; i < worldSize; i += 38 ) {
		for ( var j = 0; j < worldSize; j += 38 ) {
			//randomly pick tiles to place so in this case 1:21 chance of being placed (i guess, honestly im no good at math)
			var rnd = rndNum( 40 );
			if ( rnd == 0 ) {
				rock = game.add.isoSprite( i, j, 0, 'rock', 0, obstacleGroup );
				rock.anchor.setTo( anchorPoint, 0 );
				game.physics.isoArcade.enable( rock );
				rock.body.collideWorldBounds = true;
				rock.body.immovable = true;
			}
		}
	}
}
