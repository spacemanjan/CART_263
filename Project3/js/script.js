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
//The MISC variables used in the game
var emitter;
var title;
var titleButton;
var player;
var fullHungerBar;
var emptyHungerBar;
var chanceFood = false;
var food;
//Player movement speed
var speed;


//=========KEYBOARD=======//
var up;
var left;
var right;
var down;
var space;

//==SOUNDTRACK==// taken from: https://www.youtube.com/watch?v=Elo8-CuGJTo
var soundTrack;

//=======TILES==========//
var respawnTile;
var neutralTile;
var borderTile;
var tile;
var newTile;
var dig;
var newGround;

//=======SCROLLING=====//
var distanceSignal = new Phaser.Signal();
var distance;

//======OBSTACLES=====//
var rock;
var water;

//========GROUPS========//
//The different groups which hold different objects and ties them through common properties
var centerGroup;
var borderGroup;
var isoGroup;
var obstacleGroup;
var eventGroup;
var foodGroup;
var uiGroup;

//========CONTROLS=======//
//Variables used for controlling the player character
var Ndown = false, Sdown = false, Edown = false, Wdown = false, SEdown = false, NEdown = false, SWdown = false, NWdown = false;

//========CONSTANTS========//
//The constant variables used in game can be editted here

//Camera scale controller
var zoom = 1.3;

//WorldSize controls the Isometric arrays used for generating the game world
//example: for ( var i = 0; i < worldSize; i += xxx );
var worldSize = 3800;

//CenterMap is the absolute center of the map;
var centerMap = 1900;

//Start is used for the Title screen if false = display Title titleScreen, if true = give player control
var start = false;

//Digging is used to check if the player has infact pressed space to dig, default is false
var digging = false;

//the Typical achorPoint for everything
//0.5 means center of image
var anchorPoint = 0.5

//Player faster speed
var fasterSpeed = 150;

//Is it snowing?
var snowing = true;

//=======HUNGER-CONSTANTS=========//
//Hunger meter
var hungerMeter
//Hunger rate how much you loose per 30 seconds
var hungerRate = 10;
//Hungermax
var hungerMax = 200;
//How much food replenishes
var nutrition = 60;

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
	game.load.image( 'dig', 'assets/images/dig.png' );
	game.load.image( 'water', 'assets/images/water.png' );
	game.load.image( 'rock', 'assets/images/rocks.png' );
	game.load.image( 'dug', 'assets/images/dug.png' );
	game.load.image( 'snow', 'assets/images/snow.png' );
	game.load.image( 'step', 'assets/images/steps.png' );
	game.load.image( 'tile', 'assets/images/snowTile.png' );
	game.load.image( 'tile2', 'assets/images/floor.png' );
	game.load.image( 'indtile', 'assets/images/tile.png');
	game.load.image( 'fullStomach', 'assets/images/goodHunger.png' );
	game.load.image( 'starving', 'assets/images/badHunger.png' );

	//-----------ANIMATIONS-----------//
	game.load.spritesheet( 'playerAnim', 'assets/images/testingspritesheet.png', 70, 74 );
	game.load.spritesheet( 'foodAnim', 'assets/images/foodSpriteSheet.png', 105, 352 );
	// This adds the Phaser Isometric Plugin
	game.plugins.add( new Phaser.Plugin.Isometric( game ) );
	// In order to have the camera move, we need to set our worldBounds
	// setBounds(camera x, camera y, worldbound x, worldbound y)
	// this ends up being a 60 by 60 tile map
	game.world.setBounds( 0, 0, 7600, 3800);
	// Start the IsoArcade physics system.
	game.physics.startSystem( Phaser.Plugin.Isometric.ISOARCADE );
	//sets the point of origin for the first tile 0 = far left/top 1 = far right/bottom
	game.iso.anchor.setTo( anchorPoint, 0 );
}

//========CREATE()========//


function create() {
	game.stage.backgroundColor = "#ffffff";
	// Set the global gravity for IsoArcade.
	game.physics.isoArcade.gravity.setTo( 0, 0, -500 );

	//Create the groups with the varaibles we made at the top
	//The order we declare these groups is important as it sets their priority in relation to each other
	//ISOGROUP is...
	isoGroup = game.add.group();
	//CENTERGROUP is...
	centerGroup = game.add.group();
	//BORDERGROUP is...
	borderGroup = game.add.group();
	//FOODGROUP is...
	foodGroup = game.add.group();
	//EVENTGROUP is...
	eventGroup = game.add.group();
	//OBSTACLEGROUP is...
	obstacleGroup = game.add.group();
	//UIGROUP is...
	uiGroup = game.add.group();

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
	//spawnBorder creates the border which if stepped on triggers the wrapping effect
	spawnBorder();
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

	//------------SIGNALS-------------//
	distanceSignal.add(newTiles, this);

	//-----------KEYBOARD-------------//
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

	manageKeys();

	//----------MUSIC------------//
	//add audio track "music" set it to the soundTrack variable
	soundTrack = game.add.audio('music');
	//set music looping to true
	soundTrack.loop = true;
	//play after a half second (this is to avoid having to click on the screen so it can play on title screen)
	setTimeout(function(){ soundTrack.play(); }, 500);

	initHunger();
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
		//-----------FOOD--------------------------//
		foodHungerManager();
		//Initiate camera controls (i.e. have camera follow player)
		cameraControl();
		//-----------PLAYER CONTROLS------------//
		playerAnim();
		movePlayer();
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
	// console.log(player.body.x, player.body.y);

}

//=======VARIOUS-FUNCTIONS=========//
// Here you will find the various functions called in our code
// snowEmitter,initPlayer,overlapCheck,rndNum,cameraControl,manageKeys

// manageKeys establishes listeners and variables attributed to the useable keys
function manageKeys(){
	//KEYPRESS EVENTS *******Be more descriptive
	//UP key press events used for animation and sprite control
	up = game.input.keyboard.addKey( Phaser.Keyboard.UP );
	up.onDown.add(inputDown,this);
	up.onUp.add(inputUp,this);
	//DOWN key 'ditto'
	down = game.input.keyboard.addKey( Phaser.Keyboard.DOWN );
	down.onDown.add(inputDown,this);
	down.onUp.add(inputUp,this);
	//LEFT key 'ditto'
	left = game.input.keyboard.addKey( Phaser.Keyboard.LEFT );
	left.onDown.add(inputDown,this);
	left.onUp.add(inputUp,this);
	//RIGHT key 'ditto'
	right = game.input.keyboard.addKey( Phaser.Keyboard.RIGHT );
	right.onDown.add(inputDown,this);
	right.onUp.add(inputUp,this);
	//SPACE key is an action key, it controls animation and also affects other functions
	space = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );
	space.onDown.add(inputDown,this);
	space.onUp.add(inputUp,this);
}

// snowEmitter creates and defines the properties of the emitter
function snowEmitter() {
	// Add emitter to game
	emitter = game.add.emitter();
	// give it the sprite it will be emitting
	emitter.makeParticles( 'snow' );
	// define the various properties
	emitter.minParticleScale = 0.3;
	emitter.maxParticleScale = 1.9;
	emitter.setYSpeed( 900 ); //900
	emitter.setXSpeed( 5, 25 );
	emitter.minRotation = 0;
	emitter.maxRotation = 0;
	emitter.maxParticles = 10000;
	// Emitter position & width, fix it to the camera so it's always snowing wherever you are
	emitter.width = 1700;
	emitter.fixedToCamera = true;
	//on & off switch for the snow emitter
	emitter.on = snowing;
	// start the emitter and define its behavior
	//start(explode, lifespan, frequency, quantity);
	emitter.start( false, 1000, 0.5, 0 );
}

// overlapCheck is an event function which is checking if player is over the dig tile
function overlapCheck() {
		//"for each tile in the event group preform the following..."
		eventGroup.forEach( function( dig ) {
			//"check for overlap between the tile passed in the function above & the player & if they overlap perform..."
			game.physics.isoArcade.overlap( dig, player, function( holeTile, player ) {
				// if player is digging for food
				if (holeTile.key == 'dig'){
					if ( digging == true ) {
						// replace the texture of the tile with a new texture
						//***have a food item pop up above the players head + fill their food meter (with appropriate level of nutrition)
						holeTile.loadTexture( 'dug' );
						chanceFood = true;
					};
				}
			} );
		} );
		//BORDER WRAP RIGHT HERE
		borderGroup.forEach(function(tile){
			game.physics.isoArcade.overlap(tile, player ,function(){
				distanceSignal.dispatch();
				player.body.x = 1900;
				player.body.y = 1900;
		});
	});
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

// newTiles is the function responsible for changing the biome when you wrap
function newTiles(){
	isoGroup.forEach(function(tile){
		var rnd = rndNum( 2 );
			if ( rnd == 0 ) {
				tile.loadTexture('tile');
			} else {
				tile.loadTexture('tile2');
			}
	});
}

//****************FUNCTIONS TBA***********************//

function initHunger(){
	hungerMeter = 200;
	fullHungerBar = game.add.sprite(730,20,'fullStomach', uiGroup );
	fullHungerBar.anchor.setTo( anchorPoint, 0 );
	emptyHungerBar = game.add.sprite(730,20,'starving', uiGroup );
	emptyHungerBar.anchor.setTo( anchorPoint, 0 );
    fullHungerBar.fixedToCamera = true;
	emptyHungerBar.alpha = 0;
	emptyHungerBar.fixedToCamera = true;
	//Every 10 seconds change the alpha and update hungerMeter
	game.time.events.loop(Phaser.Timer.SECOND*10, function(){
		if (hungerMeter > 0) {
			hungerMeter -= hungerRate
			fullHungerBar.alpha = hungerMeter/200
			emptyHungerBar.alpha = (1 - (hungerMeter/200));
		} else {
			emptyHungerBar.alpha = 1;
			console.log('yea youre dead')
		}
	}, this);
}

function foodHungerManager(){
	if (chanceFood == true){
		var rnd = rndNum(100)
		if (rnd < 25){
			//You get nothing, snow puff animation
		} else if (rnd >= 25 && rnd < 50){
			//You get an acorn, acorn animation, + 15 hungerMeter, delay starveOrEat in hunger function
			hungerMeter += nutrition/4;
		} else if (rnd >= 50 && rnd < 75){
			//You get a potato, potato animation, + 30 hungerMeter, delay ''
			hungerMeter += nutrition/2;
		} else if (rnd >= 75 && rnd < 97){
			//You get a Carrot, carrot animation, + 60 hungerMeter, delay ''
			hungerMeter += nutrition;
		} else if (rnd >= 97){
			console.log("artifact get")
		}
		//Make sure HungerMeter is never over 200
		if (hungerMeter > 200){
			hungerMeter = 200;
		}
		fullHungerBar.alpha = hungerMeter/200
		emptyHungerBar.alpha = (1 - (hungerMeter/200));
		chanceFood = false;
	}
	//Increase player speed if hunger is between 180 & 200
	if (hungerMeter > 180){
		speed = fasterSpeed
	} else {
		speed = 100;
	}
	console.log(fullHungerBar.alpha, emptyHungerBar.alpha, hungerMeter);
}

//function steps(){}

//function narrator(){}

//function predatorAI(){}

//function endingScene(){}

//========PLAYER-FUNCTIONS=========//
//*****COMMENTS NEEDED HERE
// Initiate Player, player is created and placed in the world,manages his directional animations
function initPlayer() {
	//set the player & place it in the obstacle group so it can collide and overlap check + be topologically sorted properly
	player = game.add.isoSprite( centerMap, centerMap, 0, 'playerAnim', 0, obstacleGroup );

	// add the animations from the spritesheet
	player.animations.add('S', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
	player.animations.add('SW', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
	player.animations.add('W', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
	player.animations.add('NW', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
	player.animations.add('N', [32, 33, 34, 35, 36, 37, 38, 39], 10, true);
	player.animations.add('NE', [40, 41, 42, 43, 44, 45, 46, 47], 10, true);
	player.animations.add('E', [48, 49, 50, 51, 52, 53, 54, 55], 10, true);
	player.animations.add('SE', [56, 57, 58, 59, 60, 61, 62, 63], 10, true);

	player.anchor.setTo( anchorPoint );
	//enable physics on the player
	game.physics.isoArcade.enable( player );
	//collide with the floor of the world/don't fall into oblivion
	player.body.collideWorldBounds = true;
}

function movePlayer(){
	if (digging == true ) {
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
	}
	else if (digging == false){
		if (Ndown == true) {
		   player.body.velocity.y = -speed;
		   player.body.velocity.x = -speed;
	   }
	   else if (Sdown == true)
	   {
		   player.body.velocity.y = speed;
		   player.body.velocity.x = speed;
	   }
	   else if (Edown == true) {
		   player.body.velocity.x = speed;
		   player.body.velocity.y = -speed;
	   }
	   else if (Wdown == true)
	   {
		   player.body.velocity.x = -speed;
		   player.body.velocity.y = speed;
	   }
	   else if (SEdown == true)
	   {
		   player.body.velocity.x = speed;
		   player.body.velocity.y = 0;
	   }
	   else if (SWdown == true)
	   {
		   player.body.velocity.y = speed;
		   player.body.velocity.x = 0;
	   }
	   else if (NWdown == true)
	   {
		   player.body.velocity.x = -speed;
		   player.body.velocity.y = 0;

	   }
	   else if (NEdown == true)
	   {
		   player.body.velocity.y = -speed;
		   player.body.velocity.x = 0;

	   }
	   else
	   {
		   player.body.velocity.x = 0;
		   player.body.velocity.y = 0;
	   }
   }
}

function inputDown(key){
	// digging mechanic: if space is pressed then player is digging
	// *****Must add animation for digging
	if (key === space){
		digging = true;
	}
	if (key === up){
		NEdown = true;
	}
	if (key === down){
		SWdown = true;
	}
	if (key === left){
		NWdown = true;
	}
	if (key === right){
		SEdown = true;
	}
	if (NWdown == true && NEdown == true ){
		NEdown = false;
		NWdown = false;
		Ndown = true;
	}
	if (NEdown == true && SEdown == true ){
		NEdown = false;
		SEdown = false;
		Edown = true;
	}
	if (NWdown == true && SWdown == true ){
		NWdown = false;
		SWdown = false;
		Wdown = true;
	}
	if (SWdown == true && SEdown == true ){
		SWdown = false;
		SEdown = false;
		Sdown = true;
	}
}

function inputUp(key){
	Ndown = false;
	Edown = false;
	Wdown = false;
	Sdown = false;
	SEdown = false;
	NEdown = false;
	SWdown = false;
	NWdown = false;
	if( key === space){
	digging = false;
	}
}

function playerAnim(){
	 if (SEdown == true){
	        player.animations.play('SE');
	} else if (SWdown == true){
	       	player.animations.play('SW');
	} else if (NWdown == true){
	       	player.animations.play('NW');
	} else if (NEdown == true){
	       	player.animations.play('NE');
	} else if (Sdown == true ){
	        player.animations.play('S');
 	} else if (Edown == true ){
	        player.animations.play('E');
	} else if (Wdown == true){
	        player.animations.play('W');
	} else if (Ndown == true ){
			player.animations.play('N');
	} else{
	       	player.animations.stop();
	}
}

//=========WORLD-MAKING-FUNCTIONS============//
// In this section is located all the functions called in Create() which make the isometric landscape
// & generates the objects, player, food, water ect...
// ***TILES ARE STACKING ONTO EACH OTHER FIX DIS?
function spawnTiles() {
	// THIS IS THE TEMPLATE USED FOR PLACING EVERYTHING ELSE IN THE GAMEWORLD
	// The basic function is this: create a loop for the X and then a loop for Y creating a isometric grid
	// Based on the worldSize we add a tile every X amount of pixels (x is determined by the size of grid squares we want)
	//so in this loop we're adding a tile every 158px
	for ( var i = 0; i < worldSize; i += 152 ) {
		for ( var j = 0; j < worldSize; j += 152 ) {
			// Create the center platform always white nothing spawns here
			if ((i >= 1368 && i <= 2280) && (j >= 1368 && j <= 2280)){
				respawnTile = game.add.isoSprite( i, j, 0, 'tile2', 0, centerGroup );
				respawnTile.anchor.setTo( anchorPoint, 0 );
				game.physics.isoArcade.enable( respawnTile );
				respawnTile.body.collideWorldBounds = true;
			}
			if ((i >= 0 && j <= 456) || (i <= 456 && j >= 0) || (i >= 3192 && j <= 3800) || (i <= 3800 && j >= 3192)) {
				neutralTile = game.add.isoSprite( i, j, 0, 'tile2', 0, centerGroup );
				neutralTile.anchor.setTo( anchorPoint, 0 );
				game.physics.isoArcade.enable( neutralTile );
				neutralTile.body.collideWorldBounds = true;
			} else {
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

function spawnBorder(){
	for ( var i = 0; i < worldSize; i += 40 ) {
		for ( var j = 0; j < worldSize; j += 40 ) {
			if ((i >= 0 && j <= 40) || (i <= 40 && j >= 0) || (i >= 3760 && j <= 3800) || (i <= 3800 && j >= 3760)) {
				borderTile = game.add.isoSprite( i, j, 0, '', 0, borderGroup );
				borderTile.anchor.setTo( anchorPoint, 0 );
				game.physics.isoArcade.enable( borderTile );
				borderTile.body.collideWorldBounds = true;
			}
		}
	}
}
