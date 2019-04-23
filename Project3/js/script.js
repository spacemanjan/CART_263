"use strict";

/*****************

Snow-Drift
Yann-Maurice McNiven

In Snow Drift you play as a rabbit lost in a snowy landscape, your one goal is Survival, to
survive you must find food but food is not abundant in this barren wasteland. The narrator
guides you as you explore documenting your story, obey, reject, or toy with him as you will.
The important part is to have fun.

******************/
//========GROUPS========//
//The different groups which hold different objects and ties them through common properties
let centerGroup;
let borderGroup;
let isoGroup;
let obstacleGroup;
let eventGroup;
let foodGroup;
let uiGroup;
let stepGroup;
let debugGroup;
let itemGroup;

//========CONSTANTS========//
//The constant variables used in game can be editted here
//Camera scale controller
let zoom = 1.3;
//WorldSize controls the Isometric arrays used for generating the game world
//example: for ( let i = 0; i < worldSize; i += xxx );
let worldSize = 3800;
//CenterMap is the absolute center of the map;
let centerMap = 1900;
//Start is used for the Title screen if false = display Title titleScreen, if true = give player control
let start = false;
//the Typical achorPoint for everything
//0.5 means center of image
let anchorPoint = 0.5
//Player regular speed
let regularSpeed = 100;
//Player faster speed
let fasterSpeed = 150;
//Is it snowing?
let snowing = true;
const TILESIZE = 70;
//number of key strokes until monster
let keysToMonster = 50;

//=======HUNGER-CONSTANTS=========//
//Hunger meter
let hungerMeter
//Hunger rate how much you loose per 30 seconds
let hungerRate = 10;
//Hungermax
let hungerMax = 200;
//How much food replenishes
let nutrition = 60;
let certainDestroy = 0;
let timesRefresh = 0;

//========GAME-VARIABLES========//
//The miscelanous variables used in the game
let title;
let emitter;
let blackScreen;

//========FOOD-VARIABLES========//
//These variables are used by the food functions
let chanceFood = false;
let justAte = false;
let fullHungerBar;
let emptyHungerBar;
let food;
let acornSound = false;
let potatoSound = false;
let carrotSound = false;

//========NARRATOR-VARIABLES========//
let narratorSilence = false;
let narratorState = 0;
let dangerState = 0;
let subtitle;
let subtitles = {
	a0: {
		subtitle: "In the depths of a land far away the snow falls quietly nothing disturbs the tranquility.... except... for you caught in the snow-drift.",
		sound: 'a0'
	},
	a1: {
		subtitle: "In the midst of a snowy landscape a hare awakes in an unfamiliar place, no friends and no shelter in which to burrow in and hide from the cold",
		sound: 'a1'
	},
	a5: {
		subtitle: "the hare realized he was starving, he had no idea how long he’d slept but it must have been an awful long time because he was so hungry he could eat all the carrots in the world",
		sound: 'a5'
	},
	a6: {
		subtitle: "A little lump was under his foot and the hare could tell there was something buried under the snow",
		sound: 'a6'
	},
	a7: {
		subtitle: "Maybe if you pressed the spacebar you’ll start digging",
		sound: 'a7'
	},
	a11: {
		subtitle: "Whatever it was the hare certainly wanted to stay as far away from it as possible but he couldn’t hear it anymore… all he could think of was the sound it made like bones softly rubbing against each other, the smell of something dying and it’s dark undulating flesh…",
		sound: 'a11'
	},
	a12: {
		subtitle: "a weird hook? As the hare takes it the markings seemingly glow briefly, and the hare imagines a sunken city dark and abandoned by time",
		sound: 'a12'
	},
	a13: {
		subtitle: "at the foot of the statue is an old leather bound book, the cover was worn, a dirty from exposure to the elements but still clearly on its spine the words “shogg-agl” and the hare begins imagining awaking from a dream",
		sound: 'a13'
	},
	a15: {
		subtitle: "this was not food, and although it looked appetizing to a starving hare, every bone in his delicate body screamed at him not to eat it, a bloody mass of dark bubbly flesh which reeked like hell, it reminded him of things, things he was sure he had no memories of",
		sound: 'a15'
	},
	a16: {
		subtitle: "the black hare had dug up something, it was short and sharp with a feather attached at it’s hilt, and the smell of blood was still fresh on it",
		sound: 'a16'
	},
	a17: {
		subtitle: "the black hare had now quite the collection of odd trinkets, each one seemed to emit an unpleasant aura, his mind fixed itself to these objects and without any warning the hare collapsed into a dreamless sleep",
		sound: 'a17'
	},
	b0: {
		subtitle: "You stare blankly at the screen, as the narrator realizes that an idiot is playing his game… why don’t you click to start your adventure",
		sound: 'b0'
	},
	b00: {
		subtitle: "Alright you’ve had your fun, now click the game and start playing",
		sound: 'b00'
	},
	b000: {
		subtitle: "Well now you’re just trying to hurt my feelings… I put a lot of work into this game, and I’m not gonna just let you stare at the title screen and waste my time",
		sound: 'b000'
	},
	b0000: {
		subtitle: "You know what… that’s it. You’ve officially hurt my feelings, I’m leaving and I promise you won’t be hearing from me again… I hope it was worth it",
		sound: 'b0000'
	},
	dhd: {
		subtitle: "the hare couldn’t find anything to eat, he lacked the energy to move and so rested in the snow until sleep took him and he dreamed of warm burrows and plenty of carrots",
		sound: 'dhd'
	},
	d000: {
		subtitle: "“As the creature charged at him with what the hare assumed was his face he thought he hear a voice ring out from deep in his mind geb ch’gnaiih nog mnahn’ grahn’ stell’bsna r’luh c-shogg y-s’uhn nilgh’ri y-wgah’n… and then nothing more",
		sound: 'd000'
	},
	d1: {
		subtitle: "the hare suddenly felt a chill run down his furry little spine, danger was nearby and he needed to hide fast",
		sound: 'd1'
	},
	d2: {
		subtitle: "the hare didn’t know what to do he was so scared he panicked and pressed the shift key five times",
		sound: 'd2'
	},
	f9: {
		subtitle: "at first the hare didn’t know what he was looking at but soon that dreadful sense of familiarity crept over him, there in the snow was a crystal like reflection of him, another hare frozen stiff, was this also to be his fate he wondered",
		sound: 'f9'
	},
	g0: {
		subtitle: "suddenly it was night, the stars shone in the sky above the hare sparkling strangely almost rhythmically, the snow had died down and the world was completely silent, the hare felt ill at ease, he felt watched by unseen observers of unknowable intent and desires",
		sound: 'g0'
	},
	g7: {
		subtitle: "the world began to drift and quiver, the hare felt all the hardships lift from his spirit and just as it all was about to fade from existence he finally recalled where he had been before this all began, who he had been, what it had been...",
		sound: 'g7'
	}
}
let interuptNar = false;
let currentSound;
let standingStill = false;
let firstDig = false;
let foodDeath = false;

//========PLAYER-VARIABLES========//
//Player variables including
let player;
let speed;
let playerHiding = false;
let playerKilled = false;
let hidden = false;
let digging = false;
let obscureFilter;
let dangerFilter;
let bloodSplatter;
let playerAlive = true;
let playerHungerDeath = false;
let playerEnding = false;

//=========MONSTER-VARIABLES=======//
let monster;
let monsterSpeed = 200;
let monsterDistance;
let monsterRnd;
let returningMonster = false;
let chase = false;
let blocked = false;
let monsterSpawned = false;
let monsterComing = false;
let monsterPlaced = false;
let monsterSound = 0;
let goFood = false;

//=========KEYBOARD=======//
let up;
let left;
let right;
let down;
let space;
let shift;
let hideCounter = 0;
let keyCounter = 0;

//==SOUNDS-&-MUSIC==// Soundtrack taken from: https://www.youtube.com/watch?v=Elo8-CuGJTo
let soundTrack;
let foodSound1;
let foodSound2;
let monsterSkreech;
let crunch;
let crackle;

//=======TILES==========//
let respawnTile;
let neutralTile;
let borderTile;
let tile;
let newTile;
let dig;
let nonDig;
let wrapRnd;
let newGround;
let rock;
let water;
let nonTile;
let worldMap;


//======SPECIAL-WORLDSTUFF======//
let specialLakeEvent = true;
let specialLake = [
	[ 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b' ],
	[ 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b' ],
	[ 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'L', 'b', 'b', 'b', 'b', 'b', 'b', 'b' ],
	[ 'b', 'b', 'b', 'b', 'b', 'b', 'L', 'L', 'L', 'b', 'b', 'b', 'b', 'b', 'b' ],
	[ 'b', 'b', 'b', 'b', 'b', 'L', 'L', 'L', 'L', 'L', 'b', 'b', 'b', 'b', 'b' ],
	[ 'b', 'b', 'b', 'b', 'L', 'L', 'L', 'r', 'L', 'L', 'L', 'b', 'b', 'b', 'b' ],
	[ 'b', 'b', 'b', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'b', 'b', 'b' ],
	[ 'b', 'b', 'b', 'b', 'L', 'L', 'L', 'Li', 'L', 'L', 'L', 'b', 'b', 'b', 'b' ],
	[ 'b', 'b', 'b', 'b', 'b', 'L', 'L', 'L', 'L', 'L', 'b', 'b', 'b', 'b', 'b' ],
	[ 'b', 'b', 'b', 'b', 'b', 'b', 'L', 'L', 'L', 'b', 'b', 'b', 'b', 'b', 'b' ],
	[ 'b', 'b', 'b', 'b', 'b', 'b', 'L', 'L', 'L', 'b', 'b', 'b', 'b', 'b', 'b' ],
	[ 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'L', 'L', 'b', 'b', 'b', 'b', 'b', 'b' ],
	[ 'b', 'b', 'b', 'b', 'b', 'b', 'L', 'L', 'L', 'b', 'b', 'b', 'b', 'b', 'b' ],
	[ 'b', 'b', 'b', 'b', 'b', 'b', 'L', 'L', 'b', 'b', 'b', 'b', 'b', 'b', 'b' ],
	[ 'b', 'b', 'b', 'b', 'b', 'b', 'L', 'L', 'b', 'b', 'b', 'b', 'b', 'b', 'b' ]
]
let specialRockEvent = true;
let specialRocks = [
	[ '', '', '', '', '', '', '', '', '', '' ],
	[ '', '', '', '', 'r', 'r', 'r', '', '', '' ],
	[ '', '', '', 'r', 'r', 'r', 'r', '', '', '' ],
	[ '', '', 'r', 'r', 'sr', '', '', '', '', '' ],
	[ '', '', '', '', '', '', 'a2', '', '', '' ]

]
let specialFrozen = [
	[ 'w', '', '', '', '', 'f', '', '', 'w', '' ],
	[ '', 'w', 'w', '', '', '', '', '', '', '' ],
	[ '', '', 'w', 'w', 'w', '', '', '', '', '' ],
	[ '', '', 'w', 'w', '', '', '', '', 'w', '' ],
	[ '', '', 'w', '', '', '', '', 'w', 'w', '' ],
	[ '', '', '', 'w', 'w', '', '', '', '', '' ],
	[ '', '', '', 'w', 'w', 'w', 'w', '', '', '' ],
	[ '', '', '', 'w', 'w', 'w', '', '', '', '' ],
	[ '', '', '', '', 'w', 'w', '', '', '', '' ],
	[ '', '', '', 'w', '', '', '', '', '', '' ]
]
let uniqueBiome3 = []
let specialBoulderEvent = true;
let specialFrozenHare = true;
let specialDig1 = false;
let specialDig2 = false;
let artifact1;
let artifact1got = false;
let artifact2;
let artifact2got = false;
let artifact3;
let artifact3got = false;
let artifact4;
let artifact4got = false;
let artifact5;
let artifact5got = false;
let finale = false;
let numArtifact = 0;

//=======SCROLLING=====//
//This is the signal sent went the player wraps to reload the map
let distanceSignal = new Phaser.Signal();

//========CONTROLS=======//
//Variables used for controlling the player character
let Ndown = false,
	Sdown = false,
	Edown = false,
	Wdown = false,
	SEdown = false,
	NEdown = false,
	SWdown = false,
	NWdown = false;
//shiftDown tracks the up or down of the shift key
let shiftDown = false;

//=========DEVELOPER=============//
// let chaseCounter = 0;
// let developerMode = true;
// if (developerMode == true){
// 	let zoom = 1;
// }

//==========GAME============//
//Initiate Game Object
//declare width,height & functions -- this is our main Object
let game = new Phaser.Game( window.width, window.height, Phaser.AUTO, '', {
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
	//general sound bits and soundTrack
	game.load.audio( 'music', [ 'assets/sounds/PeacefulPiano.mp3' ] );
	game.load.audio( 'foodsound1', [ 'assets/sounds/foodSound.mp3' ] );
	game.load.audio( 'foodsound2', [ 'assets/sounds/anotherFoodSound.mp3' ] );
	game.load.audio( 'playerDies', [ 'assets/sounds/monsterCrunch.mp3' ] );
	game.load.audio( 'monsterCrackle', [ 'assets/sounds/monsterCrack.mp3' ] );
	game.load.audio( 'monsterSkreech', [ 'assets/sounds/monsterSkreech.mp3' ] );

	//-----------NARRATION-----------//
	//These were the audio files I was going to use for an extensive narration
	//due to time constraints I've had to cut back on the amount of narratives
	//however I'm keeping them here for future use
	game.load.audio( 'a0', [ 'assets/sounds/a0 Copy.mp3' ] );
	game.load.audio( 'a1', [ 'assets/sounds/a1 Copy.mp3' ] );
	game.load.audio( 'a2', [ 'assets/sounds/a2 Copy.mp3' ] );
	game.load.audio( 'a3', [ 'assets/sounds/a3.mp3' ] );
	game.load.audio( 'a4', [ 'assets/sounds/a4 Copy.mp3' ] );
	game.load.audio( 'a5', [ 'assets/sounds/a5 Copy.mp3' ] );
	game.load.audio( 'a6', [ 'assets/sounds/a6 Copy.mp3' ] );
	game.load.audio( 'a7', [ 'assets/sounds/a7 Copy.mp3' ] );
	game.load.audio( 'a8', [ 'assets/sounds/a8 Copy.mp3' ] );
	game.load.audio( 'a9', [ 'assets/sounds/a9 Copy.mp3' ] );
	game.load.audio( 'a10', [ 'assets/sounds/a10 Copy.mp3' ] );
	game.load.audio( 'a11', [ 'assets/sounds/a11 Copy.mp3' ] );
	game.load.audio( 'a12', [ 'assets/sounds/a12 Copy.mp3' ] );
	game.load.audio( 'a13', [ 'assets/sounds/a13 Copy.mp3' ] );
	game.load.audio( 'a15', [ 'assets/sounds/a15 Copy.mp3' ] );
	game.load.audio( 'a16', [ 'assets/sounds/a16 Copy.mp3' ] );
	game.load.audio( 'a17', [ 'assets/sounds/a17_done.mp3' ] );
	game.load.audio( 'b0', [ 'assets/sounds/b0 Copy.mp3' ] );
	game.load.audio( 'b00', [ 'assets/sounds/b00 Copy.mp3' ] );
	game.load.audio( 'b0000', [ 'assets/sounds/b0000 Copy.mp3' ] );
	game.load.audio( 'b0000', [ 'assets/sounds/b0000 Copy.mp3' ] );
	game.load.audio( 'b1', [ 'assets/sounds/b1 Copy.mp3' ] );
	game.load.audio( 'b2', [ 'assets/sounds/b2 Copy.mp3' ] );
	game.load.audio( 'b3', [ 'assets/sounds/b3 Copy.mp3' ] );
	game.load.audio( 'b4', [ 'assets/sounds/b4 Copy.mp3' ] );
	game.load.audio( 'b5', [ 'assets/sounds/b5 Copy.mp3' ] );
	game.load.audio( 'b6', [ 'assets/sounds/b6 Copy.mp3' ] );
	game.load.audio( 'b7', [ 'assets/sounds/b7 Copy.mp3' ] );
	game.load.audio( 'b11', [ 'assets/sounds/b11 Copy.mp3' ] );
	game.load.audio( 'dhd', [ 'assets/sounds/dhd Copy.mp3' ] );
	game.load.audio( 'd0', [ 'assets/sounds/d0 Copy.mp3' ] );
	game.load.audio( 'd00', [ 'assets/sounds/d00.mp3' ] );
	game.load.audio( 'd000', [ 'assets/sounds/d000 Copy.mp3' ] );
	game.load.audio( 'd00000', [ 'assets/sounds/d00000 Copy.mp3' ] );
	game.load.audio( 'd1', [ 'assets/sounds/d1 Copy.mp3' ] );
	game.load.audio( 'd2', [ 'assets/sounds/d2 Copy.mp3' ] );
	game.load.audio( 'd3', [ 'assets/sounds/d3 Copy.mp3' ] );
	game.load.audio( 'd4', [ 'assets/sounds/d4 Copy.mp3' ] );
	game.load.audio( 'd5', [ 'assets/sounds/d5 Copy.mp3' ] );
	game.load.audio( 'd6', [ 'assets/sounds/d6 Copy.mp3' ] );
	game.load.audio( 'd8', [ 'assets/sounds/d8 Copy.mp3' ] );
	game.load.audio( 'd9', [ 'assets/sounds/d9 Copy.mp3' ] );
	game.load.audio( 'e0', [ 'assets/sounds/e0 Copy.mp3' ] );
	game.load.audio( 'e000', [ 'assets/sounds/e000 Copy.mp3' ] );
	game.load.audio( 'e1', [ 'assets/sounds/e1.mp3' ] );
	game.load.audio( 'e2', [ 'assets/sounds/e2 Copy.mp3' ] );
	game.load.audio( 'f0', [ 'assets/sounds/f0 Copy.mp3' ] );
	game.load.audio( 'f1', [ 'assets/sounds/f1_done.mp3' ] );
	game.load.audio( 'f2', [ 'assets/sounds/f2 Copy.mp3' ] );
	game.load.audio( 'f4', [ 'assets/sounds/f4 Copy.mp3' ] );
	game.load.audio( 'f5', [ 'assets/sounds/f5 Copy.mp3' ] );
	game.load.audio( 'f6', [ 'assets/sounds/f6 Copy.mp3' ] );
	game.load.audio( 'f7', [ 'assets/sounds/f7 Copy.mp3' ] );
	game.load.audio( 'f8', [ 'assets/sounds/f9 Copy.mp3' ] );
	game.load.audio( 'f9', [ 'assets/sounds/f999 Copy.mp3' ] );
	game.load.audio( 'g0', [ 'assets/sounds/g0 Copy.mp3' ] );
	game.load.audio( 'g00', [ 'assets/sounds/g00 Copy.mp3' ] );
	game.load.audio( 'g1', [ 'assets/sounds/g1_done.mp3' ] );
	game.load.audio( 'g2', [ 'assets/sounds/g2 Copy.mp3' ] );
	game.load.audio( 'g4', [ 'assets/sounds/g4 Copy.mp3' ] );
	game.load.audio( 'g5', [ 'assets/sounds/g5 Copy.mp3' ] );
	game.load.audio( 'g6', [ 'assets/sounds/g6 Copy.mp3' ] );
	game.load.audio( 'g7', [ 'assets/sounds/g7 Copy.mp3' ] );

	//-----------IMAGES-----------//
	game.load.image( 'title', 'assets/images/titleScreen.png' );
	game.load.image( 'dig', 'assets/images/dig.png' );
	game.load.image( 'water', 'assets/images/water.png' );
	game.load.image( 'rock', 'assets/images/rocks.png' );
	game.load.image( 'dug', 'assets/images/dug.png' );
	game.load.image( 'snow', 'assets/images/snow.png' );
	game.load.image( 'step', 'assets/images/steps.png' );
	game.load.image( 'tile', 'assets/images/snowTile.png' );
	game.load.image( 'tile2', 'assets/images/tile2.png' );
	game.load.image( 'indtile', 'assets/images/tile.png' );
	game.load.image( 'fullStomach', 'assets/images/goodHunger.png' );
	game.load.image( 'starving', 'assets/images/badHunger.png' );
	game.load.image( 'obscure', 'assets/images/hiddenFilter.png' );
	game.load.image( 'danger', 'assets/images/dangerFilter.png' );
	game.load.image( 'nothing', 'assets/images/nothing.png' );
	game.load.image( 'SEstep', 'assets/images/steps.png' );
	game.load.image( 'Rock1', 'assets/images/Rock1.png' );
	game.load.image( 'Rock2', 'assets/images/Rock2.png' );
	game.load.image( 'Rock3', 'assets/images/Rock3.png' );
	game.load.image( 'Water1', 'assets/images/Water1.png' );
	game.load.image( 'Water2', 'assets/images/Water2.png' );
	game.load.image( 'Water3', 'assets/images/Water3.png' );
	game.load.image( 'Snow1', 'assets/images/Snow1.png' );
	game.load.image( 'Snow2', 'assets/images/Snow2.png' );
	game.load.image( 'Snow3', 'assets/images/Snow3.png' );
	game.load.image( 'Tree1', 'assets/images/Tree1.png' );
	game.load.image( 'Tree2', 'assets/images/Tree2.png' );
	game.load.image( 'artifact1', 'assets/images/artifact1.png' );
	game.load.image( 'artifact2', 'assets/images/artifact2.png' );
	game.load.image( 'artifact3', 'assets/images/artifact3.png' );
	game.load.image( 'artifact4', 'assets/images/artifact4.png' );
	game.load.image( 'artifact5', 'assets/images/artifact5.png' );
	game.load.image( 'killedHare', 'assets/images/monsterDeath.png' );
	game.load.image( 'frozenHare', 'assets/images/frozenHare.png' );
	game.load.image( 'blackScreen', 'assets/images/Fade2Black.png' );

	//-----------ANIMATIONS-----------//
	game.load.spritesheet( 'playerAnim', 'assets/images/PlayerMovement.png', 70, 74 );
	game.load.spritesheet( 'monsterAnim', 'assets/images/monsterAnima.png', 70, 74 );
	//game.load.spritesheet('spriteSheetName', 'yoursprite.png', yourframewidth, yourframeheight, yournumberofframes);
	game.load.spritesheet( 'foodAnim', 'assets/images/foodSpriteSheet.png', 15, 88, 28 );
	// This adds the Phaser Isometric Plugin
	game.plugins.add( new Phaser.Plugin.Isometric( game ) );
	// In order to have the camera move, we need to set our worldBounds
	// setBounds(camera x, camera y, worldbound x, worldbound y)
	// this ends up being a 60 by 60 tile map
	game.world.setBounds( 0, 0, 7600, 3800 );
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
	//EVENTGROUP is...
	eventGroup = game.add.group();
	//OBSTACLEGROUP is...
	itemGroup = game.add.group();
	obstacleGroup = game.add.group();
	//FOODGROUP is...
	foodGroup = game.add.group();
	//UIGROUP is...
	uiGroup = game.add.group();
	//DEBUGGROUP is...
	debugGroup = game.add.group();

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
	//initPlayer creates the player
	initPlayer();
	//initFood creates the food gameObject & animations we'll be using
	initFood();
	//spawnBiomes creates the rocks and lakes
	spawnBiome();
	//snowEmitter creates the emitter of the snow particles
	snowEmitter();
	//initHunger creates the hungerMeter graphics & starts a looping timer event
	initHunger();
	//initObscure sets a filter to be positioned precisely where we need it
	initFilters();
	//initMonster creates the monster and its animations
	initMonster();


	//------------SIGNALS-------------//
	distanceSignal.add( newTiles, this );

	//-----------KEYBOARD-------------//
	// Set up our controls using the phaser cursor, which is an embeded controler
	this.cursors = game.input.keyboard.createCursorKeys();
	// Create a listener for the possible key presses
	this.game.input.keyboard.addKeyCapture( [
		Phaser.Keyboard.LEFT,
		Phaser.Keyboard.RIGHT,
		Phaser.Keyboard.UP,
		Phaser.Keyboard.DOWN,
		Phaser.Keyboard.SPACEBAR,
		Phaser.Keyboard.SHIFT
	] );

	manageKeys();

	//----------MUSIC-&-SOUNDS------------//
	//add audio track "music" set it to the soundTrack variable
	soundTrack = game.add.audio( 'music' );
	foodSound1 = game.add.audio( 'foodsound1' );
	foodSound2 = game.add.audio( 'foodsound2' );
	monsterSkreech = game.add.audio( 'monsterSkreech' );
	crunch = game.add.audio( 'playerDies' );
	crackle = game.add.audio( 'monsterCrack' );

	//set music looping to true
	soundTrack.loop = true;
	//play after a half second (this is to avoid having to click on the screen so it can play on title screen)
	setTimeout( function() {
		soundTrack.play();
	}, 500 );

	createSubtitles();

}

//========UPDATE()========//
function update() {
	//-----TITLESCREEN-----//
	// "if game hasn't begun then when the player clicks anywhere on the title sprite begin game"
	if ( start === false ) {
		if ( narratorState === 0 ) {
			narrate( 'a0' )
			game.time.events.add( Phaser.Timer.SECOND * 60, function() {
				if ( start === false ) {
					narrate( 'b0' );
				}
			}, this );
			game.time.events.add( Phaser.Timer.SECOND * 120, function() {
				if ( start === false ) {
					narrate( 'b00' );
				}
			}, this );
			game.time.events.add( Phaser.Timer.SECOND * 180, function() {
				if ( start === false ) {
					narrate( 'b000' );
				}
			}, this );
			game.time.events.add( Phaser.Timer.SECOND * 270, function() {
				if ( start === false ) {
					narrate( 'b0000' );
					narratorSilence = true;
				}
			}, this );
			narratorState = 1;
		}
		//	titlescreen event if clicked
		title.events.onInputDown.add( function() {
			// delete titleScreen so it doesn't remain on screen
			title.destroy();
			// game begins
			start = true;
			narrative( 'a1' )
			player.animations.play( 'WAKE' );
		}, this );
		// "if game has begun then..."
	} else {
		//OVERLAP CHECK, is how we check if the player sprite is over the digging tile & leaves paw prints
		overlapCheck();
		//-----------FOOD--------------------------//
		foodHungerManager();
		//Initiate camera controls (i.e. have camera follow player)
		cameraControl();
		//-----------PLAYER CONTROLS------------//
		playerAnim();
		actionPlayer();
		//-----------MONSTER----------------------//
		monsterAI();
		//monsterManager manages the spawning in and out of monster as well as the dangerFilter
		monsterManager();
		//--------COLLISION-&-SORTING-----------//
		// This is isometric plugin stuff
		// here we set the collision detection for the obstacleGroup & eventGroup
		// Topological sort is how the Iso plugin checks what should be in the infront of what
		game.physics.isoArcade.collide( monster, obstacleGroup, monsterSwitch );
		game.physics.isoArcade.collide( obstacleGroup );
		game.iso.topologicalSort( obstacleGroup );
	}
}

//=======MISCELANOUS-FUNCTIONS=========//
// Here you will find the various functions called in our code
// snowEmitter,initPlayer,overlapCheck,rndNum,cameraControl,manageKeys
// manageKeys establishes listeners and variables attributed to the useable keys
function manageKeys() {
	//KEYPRESS EVENTS *******Be more descriptive
	//UP key press events used for animation and sprite control
	up = game.input.keyboard.addKey( Phaser.Keyboard.UP );
	up.onDown.add( inputDown, this );
	up.onUp.add( inputUp, this );
	//DOWN key 'ditto'
	down = game.input.keyboard.addKey( Phaser.Keyboard.DOWN );
	down.onDown.add( inputDown, this );
	down.onUp.add( inputUp, this );
	//LEFT key 'ditto'
	left = game.input.keyboard.addKey( Phaser.Keyboard.LEFT );
	left.onDown.add( inputDown, this );
	left.onUp.add( inputUp, this );
	//RIGHT key 'ditto'
	right = game.input.keyboard.addKey( Phaser.Keyboard.RIGHT );
	right.onDown.add( inputDown, this );
	right.onUp.add( inputUp, this );
	//SPACE key is an action key, it controls animation and also affects other functions
	space = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );
	space.onDown.add( inputDown, this );
	space.onUp.add( inputUp, this );
	//SHIFT key is also an action key, it also controls animation and also affects other functions
	shift = game.input.keyboard.addKey( Phaser.Keyboard.SHIFT );
	shift.onDown.add( inputDown, this );
	shift.onUp.add( inputUp, this );
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
			if ( holeTile.key == 'dig' ) {
				//NARRATOR LINE 1/10
				if ( goFood === true ) {
					if ( firstDig === false ) {
						narrative( 'a6' )
						firstDig = true;
					}
				}
			}
			if ( digging == true ) {
				// replace the texture of the tile with a new texture
				//***have a food item pop up above the players head + fill their food meter (with appropriate level of nutrition)
				holeTile.loadTexture( 'dug' );
				chanceFood = true;
			};
		} );
	} );
	//ITEM COLLECTION
	//collecting artifacts is controlled here and fixes their icon to the camera
	itemGroup.forEach( function( item ) {
		//"check for overlap between the tile passed in the function above & the player & if they overlap perform..."
		game.physics.isoArcade.overlap( item, player, function( item, player ) {
			// if player is digging for food
			if ( narratorState === 2 ) {
				if ( firstDig === false ) {
					narrative( 'a6' )
					firstDig = true;
				}
			}
			item.destroy();
			if ( item.key == 'artifact1' ) {
				artifact1 = game.add.sprite( 30, 20, 'artifact1' );
				artifact1.fixedToCamera = true;
				artifact1.anchor.setTo( anchorPoint, 0 );
				artifact1got = true;
				numArtifact++;
				currentSound.stop();
				narrative( 'a13' )
			}
			if ( item.key == 'artifact2' ) {
				artifact2 = game.add.sprite( 60, 20, 'artifact2' );
				artifact2.fixedToCamera = true;
				artifact2.anchor.setTo( anchorPoint, 0 );
				artifact2got = true;
				numArtifact++;
				currentSound.stop();
				narrative( 'a12' )
			}
			if ( item.key == 'artifact3' ) {
				artifact3 = game.add.sprite( 90, 20, 'artifact3' );
				artifact3.fixedToCamera = true;
				artifact3.anchor.setTo( anchorPoint, 0 );
				artifact3got = true;
				numArtifact++;
				currentSound.stop();
				narrative( 'f9' )
			}
			if ( item.key == 'artifact4' ) {
				artifact4 = game.add.sprite( 90, 20, 'artifact4' );
				artifact4.fixedToCamera = true;
				artifact4.anchor.setTo( anchorPoint, 0 );
				artifact4got = true;
				numArtifact++;
				currentSound.stop();
				narrative( 'a15' )
			}
			if ( item.key == 'artifact5' ) {
				artifact5 = game.add.sprite( 90, 20, 'artifact5' );
				artifact5.fixedToCamera = true;
				artifact5.anchor.setTo( anchorPoint, 0 );
				artifact5got = true;
				numArtifact++;
				currentSound.stop();
				narrative( 'a16' )
			}
			if ( numArtifact === 5 ) {
				finale = true;
			}
		} );
	} );
	//BORDER WRAP RIGHT HERE
	borderGroup.forEach( function( tile ) {
		game.physics.isoArcade.overlap( tile, player, function() {
			distanceSignal.dispatch();
			player.body.x = 1900;
			player.body.y = 1900;
		} );
	} );
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

//=======FOOD-FUNCTIONS=========//
function initHunger() {
	hungerMeter = 100;
	fullHungerBar = game.add.sprite( 730, 20, 'fullStomach', uiGroup );
	fullHungerBar.anchor.setTo( anchorPoint, 0 );
	emptyHungerBar = game.add.sprite( 730, 20, 'starving', uiGroup );
	emptyHungerBar.anchor.setTo( anchorPoint, 0 );
	emptyHungerBar.alpha = 0;
	fullHungerBar.alpha = 0;
	fullHungerBar.fixedToCamera = true;
	emptyHungerBar.fixedToCamera = true;
	//Every 10 seconds change the alpha and update hungerMeter
	game.time.events.loop( Phaser.Timer.SECOND * 5, function() {
		if ( goFood === true ) {
			if ( hungerMeter > 0 ) {
				if ( justAte == false ) {
					if ( hidden == true ) {
						hungerMeter -= hungerRate * 2
					} else {
						hungerMeter -= hungerRate
					}
				};
				fullHungerBar.alpha = hungerMeter / 200
				emptyHungerBar.alpha = ( 1 - ( hungerMeter / 200 ) );
			} else {
				emptyHungerBar.alpha = 1;
				playerAlive = false;
				if ( playerAlive === false && foodDeath === false ) {
					//NARRATOR LINE 1/10
					narrative( 'dhd' )
				}
				playerHungerDeath = true;
				foodDeath = true;
			}
		}
	}, this );
}

function foodHungerManager() {
	if ( chanceFood == true ) {
		let rnd = rndNum( 100 )
		chanceFood = false;
		if ( rnd <= 96 ) {
			food.body.x = player.body.x;
			food.body.y = player.body.y;
			food.alpha = 1;
		}
		if ( rnd < 25 ) {

			food.animations.play( 'puff' );
		} else if ( rnd >= 25 && rnd < 50 ) {

			//You get an acorn, acorn animation, + 15 hungerMeter
			food.animations.play( 'acorn' );
			foodSound1.play();
			hungerMeter += nutrition / 4;
		} else if ( rnd >= 50 && rnd < 75 ) {

			//You get a potato, potato animation, + 30 hungerMeter
			food.animations.play( 'potato' );
			foodSound2.play();
			hungerMeter += nutrition / 2;
		} else if ( rnd >= 75 && rnd < 97 ) {

			//You get a Carrot, carrot animation, + 60 hungerMeter
			food.animations.play( 'carrot' );
			foodSound1.play();
			hungerMeter += nutrition;
		} else if ( rnd == 97 || rnd == 98 ) {
			//artifact 1 animation here

			if ( specialDig1 == false ) {
				artifact4 = game.add.isoSprite( player.body.x, player.body.y, 0, 'artifact4', 0, itemGroup );
				artifact4.anchor.setTo( anchorPoint, 0 );
				game.physics.isoArcade.enable( artifact4 );
				artifact4.body.collideWorldBounds = true;
				specialDig1 = true;
			}
		} else if ( rnd == 99 || rnd == 100 ) {
			//artifact 2 animation here

			if ( specialDig2 == false ) {
				artifact5 = game.add.isoSprite( player.body.x, player.body.y, 0, 'artifact5', 0, itemGroup );
				artifact5.anchor.setTo( anchorPoint, 0 );
				game.physics.isoArcade.enable( artifact5 );
				artifact5.body.collideWorldBounds = true;
				specialDig2 = true;
			} else {
				food.animations.play( 'puff' );
			}
		}
		//Make sure HungerMeter is never over 200
		if ( hungerMeter > 200 ) {
			hungerMeter = 200;
		}
		fullHungerBar.alpha = hungerMeter / 200
		emptyHungerBar.alpha = ( 1 - ( hungerMeter / 200 ) );
	}
	//Increase player speed if hunger is between 180 & 200
	if ( hungerMeter > 180 ) {
		speed = fasterSpeed
	} else {
		speed = regularSpeed;
	}
}

function initFood() {
	food = game.add.isoSprite( 1900, 1900, 0, 'foodAnim', 0, foodGroup );

	food.animations.add( 'carrot', [ 0, 1, 2, 3, 4, 5, 6 ], 10, false );
	food.animations.add( 'potato', [ 7, 8, 9, 10, 11, 12, 13 ], 10, false );
	food.animations.add( 'acorn', [ 14, 15, 16, 17, 18, 19, 20 ], 10, false );
	food.animations.add( 'puff', [ 21, 22, 23, 24, 25, 26, 27 ], 10, false );

	// INSTEAD OF ONCOMPLETE US THIS !!!!!
	// delay substraction of foodRate by 30seconds in hunger function
	food.events.onAnimationComplete.add( function() {
		if ( food.animations.currentAnim.name == 'puff' ) {
			food.alpha = 0;
		} else {
			food.alpha = 0;
			justAte = true;
			game.time.events.add( Phaser.Timer.SECOND * 30, function() {
				justAte = false;
			}, this );
		}
	}, this );

	food.anchor.setTo( anchorPoint );
	game.physics.isoArcade.enable( food );
	food.body.collideWorldBounds = true;
	food.alpha = 0;
}

//=======NARRATOR-FUNCTIONS=========//
function narrate( key ) {
	if ( narratorSilence === false ) {
		subtitle.text = subtitles[ key ].subtitle;
		currentSound = game.add.audio( subtitles[ key ].sound );
		currentSound.play();
		currentSound.onStop.add( narratorManager, this );
	}
}

function narrative( sound ) {
	currentSound.stop();
	narrate( sound );
}

function narratorManager( sound ) {
	if ( sound.key === 'a1' ) {
		narrate( 'a5' );
		goFood = true;
	}
	if ( sound.key === 'a6' ) {
		narrate( 'a7' );
	}
	if ( sound.key === 'd1' ) {
		narrate( 'd2' );
	}
	if ( sound.key === 'a16', 'a15', 'f9', 'a12', 'a13' ) {
		if ( finale === true ) {
			narrate( 'g7' );
			playerEnding = true;
		}
	}
}

function createSubtitles() {
	let style = {
		font: "18px Arial",
		fill: "#000000",
		align: "center",
		wordWrap: true,
		wordWrapWidth: 600
	};
	subtitle = game.add.text( game.camera.x + 20, game.camera.y + 450, 'crunchy', style );
	subtitle.fixedToCamera = true;
	game.sound.setDecodedCallback( [ currentSound ], start, this );
}

//=======MONSTER-FUNCTIONS=========//
//These functions control the monster in all it's glory
//AI and spawn as well as chase and redirection in case it can't navigate out

//monsterManager
//declares if the monster is coming, adds the filter if it is, controls some narratives
//&& monster skreech
function monsterManager() {
	//if the number of keys
	if ( keyCounter >= keysToMonster ) {
		monsterComing = true;
	}
	if ( monsterComing == true ) {
		if ( dangerFilter.alpha < 1 ) {
			dangerFilter.alpha += 0.01;
		} else {
			dangerFilter.alpha -= 0.05;
		}
		//NARRATOR LINE 1/10
		if ( dangerState === 0 ) {
			currentSound.stop();
			narrative( 'd1' )
			dangerState = 1
		}
	} else {
		if ( dangerFilter.alpha > 0 ) {
			dangerFilter.alpha -= 0.01;
		}
	}

	if ( dangerState === 2 ) {
		if ( playerAlive === true ) {
			currentSound.stop();
			narrative( 'a11' )
			dangerState = 3
		}
	}
	if ( monsterSpawned == true && playerHiding == false ) {
		if ( playerKilled === false ) {
			chase = true;
		}
	}

	if ( monsterSpawned === true ) {
		monster.animations.play( 'active' );
		if ( monsterSound == 0 ) {
			monsterSkreech.play();
			monsterSound = 1;
		}
	}
}

//initMonster
//sets up the animations and basic properties of the monster
//also manages when it spawns after monster coming is called and de-spawns
function initMonster() {
	monster = game.add.isoSprite( 0, 0, 0, 'monsterAnim', 0, obstacleGroup );
	//monster animations will go here
	monster.animations.add( 'active', [ 0, 1, 2, 3, 4, 5, 6, 7 ], 10, true );
	monster.animations.add( 'dying', [ 8, 9, 10, 11, 12, 13, 14, 15 ], 10, false );

	monster.alpha = 0;
	game.time.events.loop( Phaser.Timer.SECOND * 1.5, function() {
		monsterRnd = rndNum( 8 )
		blocked = false;
	}, this );
	game.time.events.loop( Phaser.Timer.SECOND * 5, function() {
		returningMonster = false;
		if ( monsterComing == true ) {
			game.time.events.add( Phaser.Timer.SECOND * 15, function() {
				monsterSpawned = true;
				monsterComing = false;
				keyCounter = 0;
			}, this );
		};
		if ( monsterSpawned == true ) {
			game.time.events.add( Phaser.Timer.SECOND * 30, function() {
				monsterSpawned = false;
				if ( dangerState === 1 ) {
					dangerState = 2
				}
				monsterSound = 0;
			}, this );
		}
	}, this );
	monster.anchor.setTo( anchorPoint );
	//enable physics on the monster
	game.physics.isoArcade.enable( monster );
	//collide with the floor of the world/don't fall into oblivion
	monster.body.collideWorldBounds = true;
}

//monsterAI
//This is the brain of the monster it checks if the player is hiding or not & moves the monster
//randomly changes directions and initiates chase
function monsterAI() {
	if ( monsterSpawned == true ) {
		if ( monsterPlaced == false ) {
			let rndDistance = game.rnd.integerInRange( -700, 700 )
			if ( rndDistance >= 150 || rndDistance <= -150 ) {
				monster.alpha = 1;
				monster.body.x = player.body.x + rndDistance;
				monster.body.y = player.body.y + rndDistance;
				monsterPlaced = true;
			}
		} else {
			monsterDistance = Phaser.Math.distance( player.body.x, player.body.y, monster.body.x, monster.body.y );
			if ( blocked == false ) {
				if ( returningMonster == false ) {
					if ( monsterDistance <= 700 ) {
						if ( monsterRnd == 1 ) {
							monster.body.velocity.y = -monsterSpeed;
							monster.body.velocity.x = -monsterSpeed;
						} else if ( monsterRnd == 2 ) {
							monster.body.velocity.y = monsterSpeed;
							monster.body.velocity.x = monsterSpeed;
						} else if ( monsterRnd == 3 ) {
							monster.body.velocity.x = monsterSpeed;
							monster.body.velocity.y = -monsterSpeed;
						} else if ( monsterRnd == 4 ) {
							monster.body.velocity.x = -monsterSpeed;
							monster.body.velocity.y = monsterSpeed;
						} else if ( monsterRnd == 5 ) {
							monster.body.velocity.x = monsterSpeed;
							monster.body.velocity.y = 0;
						} else if ( monsterRnd == 6 ) {
							monster.body.velocity.y = monsterSpeed;
							monster.body.velocity.x = 0;
						} else if ( monsterRnd == 7 ) {
							monster.body.velocity.x = -monsterSpeed;
							monster.body.velocity.y = 0;
						} else if ( monsterRnd == 8 ) {
							monster.body.velocity.y = -monsterSpeed;
							monster.body.velocity.x = 0;
						}
					} else {
						returningMonster = true;
					}
				} else {
					if ( chase == false ) {
						if ( monster.body.x > player.body.x && monster.body.y > player.body.y ) {
							monster.body.velocity.x = -monsterSpeed;
							monster.body.velocity.y = -monsterSpeed;
						} else if ( monster.body.x < player.body.x && monster.body.y < player.body.y ) {
							monster.body.velocity.x = monsterSpeed;
							monster.body.velocity.y = monsterSpeed;
						} else if ( monster.body.x > player.body.x && monster.body.y < player.body.y ) {
							monster.body.velocity.x = -monsterSpeed;
							monster.body.velocity.y = monsterSpeed;
						} else if ( monster.body.x < player.body.x && monster.body.y > player.body.y ) {
							monster.body.velocity.x = monsterSpeed;
							monster.body.velocity.y = -monsterSpeed;
						} else if ( monster.body.x == player.body.x && monster.body.y > player.body.y ) {
							monster.body.velocity.x = 0;
							monster.body.velocity.y = -monsterSpeed;
						} else if ( monster.body.x == player.body.x && monster.body.y < player.body.y ) {
							monster.body.velocity.x = 0;
							monster.body.velocity.y = monsterSpeed;
						} else if ( monster.body.x > player.body.x && monster.body.y == player.body.y ) {
							monster.body.velocity.x = -monsterSpeed;
							monster.body.velocity.y = 0;
						} else if ( monster.body.x < player.body.x && monster.body.y == player.body.y ) {
							monster.body.velocity.x = monsterSpeed;
							monster.body.velocity.y = 0;
						}
					}
				}
				if ( chase == true ) {
					if ( monster.body.x > player.body.x && monster.body.y > player.body.y ) {
						monster.body.velocity.x = -monsterSpeed;
						monster.body.velocity.y = -monsterSpeed;
					} else if ( monster.body.x < player.body.x && monster.body.y < player.body.y ) {
						monster.body.velocity.x = monsterSpeed;
						monster.body.velocity.y = monsterSpeed;
					} else if ( monster.body.x > player.body.x && monster.body.y < player.body.y ) {
						monster.body.velocity.x = -monsterSpeed;
						monster.body.velocity.y = monsterSpeed;
					} else if ( monster.body.x < player.body.x && monster.body.y > player.body.y ) {
						monster.body.velocity.x = monsterSpeed;
						monster.body.velocity.y = -monsterSpeed;
					} else if ( monster.body.x == player.body.x && monster.body.y > player.body.y ) {
						monster.body.velocity.x = 0;
						monster.body.velocity.y = -monsterSpeed;
					} else if ( monster.body.x == player.body.x && monster.body.y < player.body.y ) {
						monster.body.velocity.x = 0;
						monster.body.velocity.y = monsterSpeed;
					} else if ( monster.body.x > player.body.x && monster.body.y == player.body.y ) {
						monster.body.velocity.x = -monsterSpeed;
						monster.body.velocity.y = 0;
					} else if ( monster.body.x < player.body.x && monster.body.y == player.body.y ) {
						monster.body.velocity.x = monsterSpeed;
						monster.body.velocity.y = 0;
					}
				}
			} else {
				if ( monsterRnd == 1 ) {
					monster.body.velocity.y = -monsterSpeed;
					monster.body.velocity.x = -monsterSpeed;
				} else if ( monsterRnd == 2 ) {
					monster.body.velocity.y = monsterSpeed;
					monster.body.velocity.x = monsterSpeed;
				} else if ( monsterRnd == 3 ) {
					monster.body.velocity.x = monsterSpeed;
					monster.body.velocity.y = -monsterSpeed;
				} else if ( monsterRnd == 4 ) {
					monster.body.velocity.x = -monsterSpeed;
					monster.body.velocity.y = monsterSpeed;
				} else if ( monsterRnd == 5 ) {
					monster.body.velocity.x = monsterSpeed;
					monster.body.velocity.y = 0;
				} else if ( monsterRnd == 6 ) {
					monster.body.velocity.y = monsterSpeed;
					monster.body.velocity.x = 0;
				} else if ( monsterRnd == 7 ) {
					monster.body.velocity.x = -monsterSpeed;
					monster.body.velocity.y = 0;
				} else if ( monsterRnd == 8 ) {
					monster.body.velocity.y = -monsterSpeed;
					monster.body.velocity.x = 0;
				}
			}
		}
	} else {
		monster.alpha = 0;
		monster.body.x = 0;
		monster.body.y = 0;
	}
}

//monsterSwitch
//manually switches the monster's direction if monster is blocked
function monsterSwitch() {
	monsterRnd++;
	if ( returningMonster == true || chase == true ) {
		blocked = true;
	}
}

//========PLAYER-FUNCTIONS=========//
//These are the functions which control the player and give him all his properties
// Initiate Player, player is created and placed in the world,manages his directional animations
function initPlayer() {
	//set the player & place it in the obstacle group so it can collide and overlap check + be topologically sorted properly
	player = game.add.isoSprite( centerMap, centerMap, 0, 'playerAnim', 0, obstacleGroup );

	// add the animations from the spritesheet
	player.animations.add( 'S', [ 0, 1, 2, 3, 4, 5, 6, 7 ], 10, true );
	player.animations.add( 'SW', [ 8, 9, 10, 11, 12, 13, 14, 15 ], 10, true );
	player.animations.add( 'W', [ 16, 17, 18, 19, 20, 21, 22, 23 ], 10, true );
	player.animations.add( 'NW', [ 24, 25, 26, 27, 28, 29, 30, 31 ], 10, true );
	player.animations.add( 'N', [ 32, 33, 34, 35, 36, 37, 38, 39 ], 10, true );
	player.animations.add( 'NE', [ 56, 57, 58, 59, 60, 61, 62, 63 ], 10, true );
	player.animations.add( 'E', [ 48, 49, 50, 51, 52, 53, 54, 55 ], 10, true );
	player.animations.add( 'SE', [ 40, 41, 42, 43, 44, 45, 46, 47 ], 10, true );
	player.animations.add( 'HIDE', [ 64, 65, 66, 67, 68, 69, 70, 71 ], 10, false );
	player.animations.add( 'IDLE', [ 72, 73, 74, 75, 76, 77, 78, 79 ], 10, true );
	player.animations.add( 'WAKE', [ 80, 81, 82, 83, 84, 85, 86, 87 ], 10, false );
	player.animations.add( 'SLEEP', [ 88, 89, 90, 91, 92, 93, 94, 95 ], 10, false );

	player.anchor.setTo( anchorPoint );
	//enable physics on the player
	game.physics.isoArcade.enable( player );
	//collide with the floor of the world/don't fall into oblivion
	player.body.collideWorldBounds = true;
}
//action Player
//action player changes the velocity of the player depending on the directional input
function actionPlayer() {
	if ( digging == true ) {
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
	} else if ( digging == false ) {
		if ( hideCounter == 5 ) {
			hidden = true;
			playerHiding = true;
			hideCounter = 0;
		}
		if ( Ndown == true ) {
			player.body.velocity.y = -speed;
			player.body.velocity.x = -speed;
		} else if ( Sdown == true ) {
			player.body.velocity.y = speed;
			player.body.velocity.x = speed;
		} else if ( Edown == true ) {
			player.body.velocity.x = speed;
			player.body.velocity.y = -speed;
		} else if ( Wdown == true ) {
			player.body.velocity.x = -speed;
			player.body.velocity.y = speed;
		} else if ( SEdown == true ) {
			player.body.velocity.x = speed;
			player.body.velocity.y = 0;
		} else if ( SWdown == true ) {
			player.body.velocity.y = speed;
			player.body.velocity.x = 0;
		} else if ( NWdown == true ) {
			player.body.velocity.x = -speed;
			player.body.velocity.y = 0;

		} else if ( NEdown == true ) {
			player.body.velocity.y = -speed;
			player.body.velocity.x = 0;

		} else {
			player.body.velocity.x = 0;
			player.body.velocity.y = 0;
		}
	}
}
//Input Down
//Input Down is our primary key capture and effector
//depending on the key down it either choses a direction to move the character and which
//animation to play, and the hiding ability as well, if player is hiding and a key is pressed the
//player will immediately jump out
function inputDown( key ) {
	// digging mechanic: if space is pressed then player is digging
	// *****Must add animation for digging
	if ( playerAlive === true ) {
		keyCounter++;
		if ( playerHiding == true ) {
			if ( key === shift || key === up || key === down || key === left || key === right ) {
				hidden = false
			}
		} else {
			if ( key === space ) {
				digging = true;
			}
			// shift adds 1 to the hideCounter
			if ( key === shift ) {
				if ( shiftDown == false ) {
					hideCounter++;
				}
				shiftDown = true;
			}
			if ( key === up ) {
				NEdown = true;
			}
			if ( key === down ) {
				SWdown = true;
			}
			if ( key === left ) {
				NWdown = true;
			}
			if ( key === right ) {
				SEdown = true;
			}
			if ( NWdown == true && NEdown == true ) {
				NEdown = false;
				NWdown = false;
				Ndown = true;
			}
			if ( NEdown == true && SEdown == true ) {
				NEdown = false;
				SEdown = false;
				Edown = true;
			}
			if ( NWdown == true && SWdown == true ) {
				NWdown = false;
				SWdown = false;
				Wdown = true;
			}
			if ( SWdown == true && SEdown == true ) {
				SWdown = false;
				SEdown = false;
				Sdown = true;
			}
		}
	} else {}
}
//INPUT UP
//this working in conjuction with input down, and resets the variables false
function inputUp( key ) {
	Ndown = false;
	Edown = false;
	Wdown = false;
	Sdown = false;
	SEdown = false;
	NEdown = false;
	SWdown = false;
	NWdown = false;
	if ( key === space ) {
		digging = false;
	}
	if ( key === shift ) {
		shiftDown = false;
	}
}
//Player Anim
//This function controls much of player, including animations && death circumstances
function playerAnim() {
	//PLAYER ANIMATIONS
	if ( SEdown == true ) {
		player.animations.play( 'SE' );
	} else if ( SWdown == true ) {
		player.animations.play( 'SW' );
	} else if ( NWdown == true ) {
		player.animations.play( 'NW' );
	} else if ( NEdown == true ) {
		player.animations.play( 'NE' );
	} else if ( Sdown == true ) {
		player.animations.play( 'S' );
	} else if ( Edown == true ) {
		player.animations.play( 'E' );
	} else if ( Wdown == true ) {
		player.animations.play( 'W' );
	} else if ( Ndown == true ) {
		player.animations.play( 'N' );
	} else if ( playerHiding == true ) {
		player.animations.play( 'HIDE' );
		if ( obscureFilter.alpha < 1 ) {
			obscureFilter.alpha += 0.01;
		}
		if ( player.frame == 68 ) {
			if ( hidden == true ) {
				player.animations.paused = true;
			} else {
				player.animations.paused = false;
				player.frame = 69;
			}
		}
		player.events.onAnimationComplete.add( function() {
			if ( obscureFilter.alpha > 0 ) {
				obscureFilter.alpha -= 0.01;
			} else {
				playerHiding = false;
			};
		}, this );
	} else if ( playerHungerDeath == true ) {
		artifactAlphaZero();
		player.animations.play( 'SLEEP' )
		if ( blackScreen.alpha < 1 ) {
			blackScreen.alpha += 0.001;
		}
		if ( player.frame == 95 ) {
			player.animations.paused = true;
		}
	} else if ( playerEnding === true ) {
		artifactAlphaZero();
		player.animations.play( 'SLEEP' )
		if ( blackScreen.alpha < 1 ) {
			blackScreen.alpha += 0.001;
		}
		if ( player.frame == 95 ) {
			player.animations.paused = true;
		}
	} else if ( playerKilled === true ) {
		artifactAlphaZero();
		if ( blackScreen.alpha < 1 ) {
			blackScreen.alpha += 0.001;
		}
	} else {
		player.animations.play( 'IDLE' );
	}
	//RESET MONSTER returning ai
	if ( monsterDistance < 60 ) {
		returningMonster = false;
	}
	//MONSTER DEATH CIRCUMSTANCES
	if ( monsterDistance < 35 ) {
		//hidden might/should be playerHiding
		if ( hidden === false && monsterSpawned === true && playerEnding === false ) {
			//add monster killing player animation here
			bloodSplatter = game.add.isoSprite( player.body.x, player.body.y, 0, 'killedHare', 0, centerGroup );
			bloodSplatter.anchor.setTo( anchorPoint, 0 );
			game.physics.isoArcade.enable( bloodSplatter );
			bloodSplatter.body.collideWorldBounds = true;
			crunch.play();
			player.kill();
			playerKilled = true;
			hidden = true;
			chase = false;
			//NARRATOR LINE 1/10
			narrative( 'd000' )
		}
	}
}
//init Filters
//This sets up our filters which are used for dramatic effect in our game
function initFilters() {
	obscureFilter = game.add.sprite( game.camera.x - 55, game.camera.y - 40, 'obscure' );
	obscureFilter.fixedToCamera = true;
	obscureFilter.scale.setTo( 0.4, 0.4 );
	obscureFilter.alpha = 0;

	dangerFilter = game.add.sprite( game.camera.x - 55, game.camera.y - 40, 'danger' );
	dangerFilter.fixedToCamera = true;
	dangerFilter.scale.setTo( 0.4, 0.4 );
	dangerFilter.alpha = 0;

	blackScreen = game.add.sprite( game.camera.x - 55, game.camera.y - 40, 'blackScreen' );
	blackScreen.fixedToCamera = true;
	blackScreen.scale.setTo( 1, 1 );
	blackScreen.alpha = 0;
}
//Artifact Alpha Zero
//Sets all the arrifacts alpha to zero
function artifactAlphaZero() {
	artifact1.alpha = 0;
	artifact2.alpha = 0;
	artifact3.alpha = 0;
	artifact4.alpha = 0;
	artifact5.alpha = 0;
}

//=========WORLD-MAKING-FUNCTIONS============//
// In this section is located all the functions called in Create() which make the isometric landscape
// & generates the objects, player, food, water ect...

// new Tiles
// newTiles is the function responsible for changing the biome when you wrap
function newTiles() {
	if ( certainDestroy < 7 ) {
		//for each tile in the group except for player and monster destroy
		obstacleGroup.forEach( function( tile ) {
			if ( tile.key == 'playerAnim' || tile.key == 'monsterAnim' ) {
			} else {
				tile.destroy();
			}
		} );
		eventGroup.forEach( function( tile ) {
			tile.destroy();
		} );
		itemGroup.forEach( function( tile ) {
			tile.destroy();
		} );
		//Make it loop a couple times to be sure to destroy all desired tiles completely
		certainDestroy++;
		newTiles();
	} else {
		// call spawn biome and re populate the world
		certainDestroy = 0
		spawnBiome();
		timesRefresh++;
	}
}
//spawn tiles
//this lays down the floor for our world
function spawnTiles() {
	// THIS IS THE TEMPLATE USED FOR PLACING EVERYTHING ELSE IN THE GAMEWORLD
	// The basic function is this: create a loop for the X and then a loop for Y creating a isometric grid
	// Based on the worldSize we add a tile every X amount of pixels (x is determined by the size of grid squares we want)
	//so in this loop we're adding a tile every 140px
	for ( let i = 0; i < worldSize; i += 140 ) {
		for ( let j = 0; j < worldSize; j += 140 ) {
			// Create the center platform always white nothing spawns here
			if ( ( i >= 1368 && i <= 2280 ) && ( j >= 1368 && j <= 2280 ) ) {
				respawnTile = game.add.isoSprite( i, j, 0, 'tile2', 0, centerGroup );
				respawnTile.anchor.setTo( anchorPoint, 0 );
				game.physics.isoArcade.enable( respawnTile );
				respawnTile.body.collideWorldBounds = true;
			}
			if ( ( i >= 0 && j <= 456 ) || ( i <= 456 && j >= 0 ) || ( i >= 3192 && j <= 3800 ) || ( i <= 3800 && j >= 3192 ) ) {
				neutralTile = game.add.isoSprite( i, j, 0, 'tile2', 0, centerGroup );
				neutralTile.anchor.setTo( anchorPoint, 0 );
				game.physics.isoArcade.enable( neutralTile );
				neutralTile.body.collideWorldBounds = true;
			} else {
				// Create a tile using the new game.add.isoSprite factory method at the specified position.
				let rnd = rndNum( 2 );
				if ( rnd == 0 ) {
					newTile = game.add.isoSprite( i, j, 0, 'tile2', 0, isoGroup );
					newTile.anchor.setTo( anchorPoint, 0 );
					game.physics.isoArcade.enable( newTile );
					newTile.body.collideWorldBounds = true;
				} else {
					tile = game.add.isoSprite( i, j, 0, 'tile2', 0, isoGroup );
					tile.anchor.setTo( anchorPoint, 0 );
					game.physics.isoArcade.enable( tile );
					tile.body.collideWorldBounds = true;
				}
			}
		}
	}
}
//Spawn Biome
//spawn biome is our primary function for creating our strange world
function spawnBiome() {
	//rndSpecial is the rnd num which decides which unique biome will spawn
	//we will only start spawning special biomes after 2 wraps around the map
	let rndSpecial;
	if ( timesRefresh < 2 ) {
		rndSpecial = 0;
	} else {
		rndSpecial = rndNum( 5 );
	}
	//general tile setting
	for ( let i = 0; i < worldSize; i += 70 ) {
		for ( let j = 0; j < worldSize; j += 70 ) {
			let rnd = rndNum( 40 );
			if ( ( i >= 1368 && i <= 2280 ) && ( j >= 1368 && j <= 2280 ) ) {
				//don't spawn anything here
			} else if ( ( i >= 0 && j <= 456 ) || ( i <= 456 && j >= 0 ) || ( i >= 3192 && j <= 3800 ) || ( i <= 3800 && j >= 3192 ) ) {
				//don't spawn anything here either
			} else if ( ( i <= 1050 ) && ( j <= 1050 ) ) {
				// if rnd special === 1 and artifact1 is not gotten then spawn the special biome here
				if ( rndSpecial == 1 && artifact1got === false ) {
					if ( specialLakeEvent == true ) {
						//the special biomes are pulled from custom arrays declared at the top
						for ( let g = 0; g < specialLake.length; g++ ) {
							for ( let h = 0; h < specialLake[ g ].length; h++ ) {
								if ( specialLake[ g ][ h ] === 'b' ) {
									water = game.add.isoSprite( ( ( i + g * TILESIZE ) / 2 ) + 315, ( ( j + h * TILESIZE ) / 2 ) + 315, 0, 'Water3', 0, obstacleGroup );
									water.anchor.setTo( anchorPoint, 0 );
									game.physics.isoArcade.enable( water );
									water.body.collideWorldBounds = true;
									water.body.immovable = true;
								}
								if ( specialLake[ g ][ h ] === 'L' ) {
									rock = game.add.isoSprite( ( ( i + g * TILESIZE ) / 2 ) + 315, ( ( j + h * TILESIZE ) / 2 ) + 315, 0, 'Snow2', 0, eventGroup );
									rock.anchor.setTo( anchorPoint, 0 );
									game.physics.isoArcade.enable( rock );
									rock.body.collideWorldBounds = true;
									rock.body.immovable = true;
								}
								if ( specialLake[ g ][ h ] === 'Li' ) {
									artifact1 = game.add.isoSprite( ( ( i + g * TILESIZE ) / 2 ) + 315, ( ( j + h * TILESIZE ) / 2 ) + 315, 0, 'artifact1', 0, itemGroup );
									artifact1.anchor.setTo( anchorPoint, 0 );
									game.physics.isoArcade.enable( artifact1 );
									artifact1.body.collideWorldBounds = true;
								}
								if ( specialLake[ g ][ h ] === 'r' ) {
									rock = game.add.isoSprite( ( ( i + g * TILESIZE ) / 2 ) + 315, ( ( j + h * TILESIZE ) / 2 ) + 315, 0, 'Rock2', 0, obstacleGroup );
									rock.anchor.setTo( anchorPoint, 0 );
									game.physics.isoArcade.enable( rock );
									rock.body.collideWorldBounds = true;
									rock.body.immovable = true;
								}
							}
						}
					}
					specialLakeEvent = false;
				// Otherwise if no special biome then place normal obstacles here
				// repeate all this for the other specialBiomes
				} else {
					if ( rnd == 2 ) {
						rock = game.add.isoSprite( i, j, 0, 'Rock1', 0, obstacleGroup );
						rock.anchor.setTo( anchorPoint, 0 );
						game.physics.isoArcade.enable( rock );
						rock.body.collideWorldBounds = true;
						rock.body.immovable = true;
					} else if ( rnd == 3 ) {
						dig = game.add.isoSprite( i, j, 0, 'dig', 0, eventGroup );
						dig.anchor.setTo( anchorPoint, 0 );
						game.physics.isoArcade.enable( dig );
						dig.body.collideWorldBounds = true;
					} else if ( rnd == 4 ) {
						rock = game.add.isoSprite( i, j, 0, 'Rock2', 0, obstacleGroup );
						rock.anchor.setTo( anchorPoint, 0 );
						game.physics.isoArcade.enable( rock );
						rock.body.collideWorldBounds = true;
						rock.body.immovable = true;
					}
				}
			} else if ( ( i >= 2000 && i <= 2400 ) && ( j >= 2000 && j <= 2400 ) ) {
				if ( rndSpecial == 2 && artifact2got === false ) {
					if ( specialRockEvent == true ) {
						for ( let g = 0; g < specialRocks.length; g++ ) {
							for ( let h = 0; h < specialRocks[ g ].length; h++ ) {
								if ( specialRocks[ g ][ h ] === '' ) {}
								if ( specialRocks[ g ][ h ] === 'r' ) {
									rock = game.add.isoSprite( ( ( i + g * TILESIZE ) / 2 ) + 315, ( ( j + h * TILESIZE ) / 2 ) + 315, 0, 'Rock2', 0, obstacleGroup );
									rock.anchor.setTo( anchorPoint, 0 );
									game.physics.isoArcade.enable( rock );
									rock.body.collideWorldBounds = true;
									rock.body.immovable = true;
								}
								if ( specialRocks[ g ][ h ] === 'sr' ) {
									rock = game.add.isoSprite( ( ( i + g * TILESIZE ) / 2 ) + 315, ( ( j + h * TILESIZE ) / 2 ) + 315, 0, 'Tree1', 0, obstacleGroup );
									rock.anchor.setTo( anchorPoint, 0 );
									game.physics.isoArcade.enable( rock );
									rock.body.collideWorldBounds = true;
									rock.body.immovable = true;
								}
								if ( specialRocks[ g ][ h ] === 'a2' ) {
									artifact2 = game.add.isoSprite( ( ( i + g * TILESIZE ) / 2 ) + 315, ( ( j + h * TILESIZE ) / 2 ) + 315, 0, 'artifact2', 0, itemGroup );
									artifact2.anchor.setTo( anchorPoint, 0 );
									game.physics.isoArcade.enable( artifact2 );
									artifact2.body.collideWorldBounds = true;
								}
							}
						}
					}
					specialRockEvent = false;
				} else {
					if ( rnd == 2 ) {
						rock = game.add.isoSprite( i, j, 0, 'Rock1', 0, obstacleGroup );
						rock.anchor.setTo( anchorPoint, 0 );
						game.physics.isoArcade.enable( rock );
						rock.body.collideWorldBounds = true;
						rock.body.immovable = true;
					} else if ( rnd == 3 ) {
						dig = game.add.isoSprite( i, j, 0, 'dig', 0, eventGroup );
						dig.anchor.setTo( anchorPoint, 0 );
						game.physics.isoArcade.enable( dig );
						dig.body.collideWorldBounds = true;
					} else if ( rnd == 4 ) {
						rock = game.add.isoSprite( i, j, 0, 'Rock2', 0, obstacleGroup );
						rock.anchor.setTo( anchorPoint, 0 );
						game.physics.isoArcade.enable( rock );
						rock.body.collideWorldBounds = true;
						rock.body.immovable = true;
					}
				}
			} else if ( ( i >= 1750 && j >= 1750 ) && ( i <= 2450 && j <= 2450 ) ) {
				if ( rndSpecial == 3 && artifact3got === false ) {
					if ( specialFrozenHare === true ) {
						for ( let g = 0; g < specialFrozen.length; g++ ) {
							for ( let h = 0; h < specialFrozen[ g ].length; h++ ) {
								if ( specialFrozen[ g ][ h ] === '' ) {}
								if ( specialFrozen[ g ][ h ] === 'f' ) {
									rock = game.add.isoSprite( ( ( i + g * TILESIZE ) / 2 ), ( ( j + h * TILESIZE ) / 2 ), 0, 'frozenHare', 0, itemGroup );
									rock.anchor.setTo( anchorPoint, 0 );
									game.physics.isoArcade.enable( rock );
									rock.body.collideWorldBounds = true;
									rock.body.immovable = true;
								}
								if ( specialFrozen[ g ][ h ] === 'w' ) {
									water = game.add.isoSprite( ( ( i + g * TILESIZE ) / 2 ), ( ( j + h * TILESIZE ) / 2 ), 0, 'Water3', 0, obstacleGroup );
									water.anchor.setTo( anchorPoint, 0 );
									game.physics.isoArcade.enable( water );
									water.body.collideWorldBounds = true;
									water.body.immovable = true;
								}
							}
						}
					}
					specialFrozenHare = false;
				} else {
					if ( rnd == 2 ) {
						rock = game.add.isoSprite( i, j, 0, 'Rock1', 0, obstacleGroup );
						rock.anchor.setTo( anchorPoint, 0 );
						game.physics.isoArcade.enable( rock );
						rock.body.collideWorldBounds = true;
						rock.body.immovable = true;
					} else if ( rnd == 3 ) {
						dig = game.add.isoSprite( i, j, 0, 'dig', 0, eventGroup );
						dig.anchor.setTo( anchorPoint, 0 );
						game.physics.isoArcade.enable( dig );
						dig.body.collideWorldBounds = true;
					} else if ( rnd == 4 ) {
						rock = game.add.isoSprite( i, j, 0, 'Rock2', 0, obstacleGroup );
						rock.anchor.setTo( anchorPoint, 0 );
						game.physics.isoArcade.enable( rock );
						rock.body.collideWorldBounds = true;
						rock.body.immovable = true;
					}
				}
			} else {
				if ( rnd == 2 ) {
					rock = game.add.isoSprite( i, j, 0, 'Rock1', 0, obstacleGroup );
					rock.anchor.setTo( anchorPoint, 0 );
					game.physics.isoArcade.enable( rock );
					rock.body.collideWorldBounds = true;
					rock.body.immovable = true;
				} else if ( rnd == 3 ) {
					dig = game.add.isoSprite( i, j, 0, 'dig', 0, eventGroup );
					dig.anchor.setTo( anchorPoint, 0 );
					game.physics.isoArcade.enable( dig );
					dig.body.collideWorldBounds = true;
				} else if ( rnd == 4 ) {
					rock = game.add.isoSprite( i, j, 0, 'Rock2', 0, obstacleGroup );
					rock.anchor.setTo( anchorPoint, 0 );
					game.physics.isoArcade.enable( rock );
					rock.body.collideWorldBounds = true;
					rock.body.immovable = true;
				}
			}
		}
	}
}
//Spawn Border
//This sets up the wrapper zone that when overlapped sends the player back to center
function spawnBorder() {
	for ( let i = 0; i < worldSize; i += 40 ) {
		for ( let j = 0; j < worldSize; j += 40 ) {
			if ( ( i >= 0 && j <= 40 ) || ( i <= 40 && j >= 0 ) || ( i >= 3760 && j <= 3800 ) || ( i <= 3800 && j >= 3760 ) ) {
				borderTile = game.add.isoSprite( i, j, 0, '', 0, borderGroup );
				borderTile.anchor.setTo( anchorPoint, 0 );
				game.physics.isoArcade.enable( borderTile );
				borderTile.body.collideWorldBounds = true;
			}
		}
	}
}
