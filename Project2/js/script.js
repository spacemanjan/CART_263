"use strict";

/*****************

Children's Avatar Maker 2019 Edition
Yann-Maurice McNiven

In Children's Avatar Maker 2019 Edition, have fun exploring the possibilites of making a fun
character of your own, combine diffrent heads to bodys, change up the legs and the arms.
Discover over 50 diffrent combinations that can be made with this fun project.

******************/


//*****************ARRAYS*****************//
//There are two sets of arrays for each body part
//These array hold the images of the body parts
//The primary array is from where the code pulls its images
//The second array suffixed by Unlock is where images that will be put into the primary array after X amount of clicks are stored
let faces = [
	'assets/images/head/head (27).png',
	'assets/images/head/head (3).png',
	'assets/images/head/head (16).png'
];
let facesUnlock = [
	'assets/images/head/head (1).png',
	'assets/images/head/head (2).png',
	'assets/images/head/head (4).png',
	'assets/images/head/head (5).png',
	'assets/images/head/head (6).png',
	'assets/images/head/head (7).png',
	'assets/images/head/head (8).png',
	'assets/images/head/head (9).png',
	'assets/images/head/head (10).png',
	'assets/images/head/head (11).png',
	'assets/images/head/head (12).png',
	'assets/images/head/head (13).png',
	'assets/images/head/head (14).png',
	'assets/images/head/head (15).png',
	'assets/images/head/head (17).png',
	'assets/images/head/head (18).png',
	'assets/images/head/head (19).png',
	'assets/images/head/head (20).png',
	'assets/images/head/head (21).png',
	'assets/images/head/head (22).png',
	'assets/images/head/head (23).png',
	'assets/images/head/head (24).png',
	'assets/images/head/head (25).png',
	'assets/images/head/head (26).png',
	'assets/images/head/head (28).png',
	'assets/images/head/head (29).png',
	'assets/images/head/head (30).png',
	'assets/images/head/head (31).png',
	'assets/images/head/head (32).png',
	'assets/images/head/head (33).png'
];
let bodies = [
	'assets/images/torso/torso (6).png',
	'assets/images/torso/torso (9).png',
	'assets/images/torso/torso (15).png'
];
let bodiesUnlock = [
	'assets/images/torso/torso (1).png',
	'assets/images/torso/torso (2).png',
	'assets/images/torso/torso (3).png',
	'assets/images/torso/torso (4).png',
	'assets/images/torso/torso (5).png',
	'assets/images/torso/torso (7).png',
	'assets/images/torso/torso (8).png',
	'assets/images/torso/torso (10).png',
	'assets/images/torso/torso (11).png',
	'assets/images/torso/torso (12).png',
	'assets/images/torso/torso (13).png',
	'assets/images/torso/torso (14).png',
	'assets/images/torso/torso (16).png',
	'assets/images/torso/torso (17).png',
	'assets/images/torso/torso (18).png',
	'assets/images/torso/torso (19).png',
	'assets/images/torso/torso (20).png',
	'assets/images/torso/torso (21).png',
	'assets/images/torso/torso (22).png',
	'assets/images/torso/torso (23).png',
	'assets/images/torso/torso.png',
];
let hands = [
	'assets/images/arms/arms (4).png',
	'assets/images/arms/arms (18).png',
	'assets/images/arms/arms (19).png'
];
let handsUnlock = [
	'assets/images/arms/arms (1).png',
	'assets/images/arms/arms (2).png',
	'assets/images/arms/arms (3).png',
	'assets/images/arms/arms (5).png',
	'assets/images/arms/arms (6).png',
	'assets/images/arms/arms (7).png',
	'assets/images/arms/arms (8).png',
	'assets/images/arms/arms (9).png',
	'assets/images/arms/arms (10).png',
	'assets/images/arms/arms (11).png',
	'assets/images/arms/arms (12).png',
	'assets/images/arms/arms (13).png',
	'assets/images/arms/arms (14).png',
	'assets/images/arms/arms (15).png',
	'assets/images/arms/arms (16).png',
	'assets/images/arms/arms (17).png',
	'assets/images/arms/arms (20).png',
	'assets/images/arms/arms (21).png',
	'assets/images/arms/arms (22).png',
	'assets/images/arms/arms.png',

];
let feets = [
	'assets/images/legs/legs (3).png',
	'assets/images/legs/legs (9).png',
	'assets/images/legs/legs (13).png'
];
let feetsUnlock = [
	'assets/images/legs/legs (1).png',
	'assets/images/legs/legs (2).png',
	'assets/images/legs/legs (4).png',
	'assets/images/legs/legs (5).png',
	'assets/images/legs/legs (6).png',
	'assets/images/legs/legs (7).png',
	'assets/images/legs/legs (8).png',
	'assets/images/legs/legs (10).png',
	'assets/images/legs/legs (11).png',
	'assets/images/legs/legs (12).png',
	'assets/images/legs/legs (14).png',
	'assets/images/legs/legs (15).png',
	'assets/images/legs/legs (16).png',
	'assets/images/legs/legs (17).png',
	'assets/images/legs/legs (18).png',
	'assets/images/legs/legs (19).png',
	'assets/images/legs/legs (20).png',
	'assets/images/legs/legs (21).png',
	'assets/images/legs/legs (22).png',
	'assets/images/legs/legs (23).png',
	'assets/images/legs/legs.png'
];

//*****************VARIABLES*****************//
//Declare head, torso, arms, & legs variables
//The primary variables in CAM 2019 Edition
let $head;
let $torso;
let $arms;
let $legs;

//Variable numClick will track how many times the user clicks on any body part
let numClick = 0;

//Animation variables
//Can be called and set to an interval & used in clearing an interval
let dancing;
let notif;

//*****************SOUNDS*****************//
//For this project I'm using Pizzicato it's a library for tweaking and working with sound
//The soundtrack must be loaded in using Pizzicato
//We set the looping of the sound in here to be true
let sound = new Pizzicato.Sound( {
	source: 'file',
	options: {
		path: 'assets/sounds/fingerFamily.mp3',
		loop: true
	}
} );

//Sound Effects
//These are the decorative sounds which pepper the game and make it more reactive
//Next plays after every body part switch
//Unlock plays after X amount of clicks is reached in addImages();
let nextSFX = new Audio( "assets/sounds/next.wav" );
let unlockSFX = new Audio( "assets/sounds/achieve.wav" );



//--------------=START_OF_CODE=--------------//
//-------------------------------------------------//
//-------------------------------------------------//
//-------------------------------------------------//
$( document ).ready( preload );

//--------------=PRELOAD=--------------//
//preload is called at the begining to make sure things are called not on load
//but only when the user is ready to play & clicks on the screen
function preload() {
	//"on click launch setup"
	$( 'HTML' ).click( setup );
}

//--------------=SETUP=-----------------//
//The starting function, initiates all the body parts
//Turn the html off so we aren't calling setup with every click
//
//Set it so that on clicking of body parts toggle function is called
//
//Activate Annyang so we launch the voice commands portion
//
//Finally begin playing soundtrack
function setup() {
	//HTML turned off
	$( 'HTML' ).off();

	//Defining the variables to mean their respective id or class
	//On click trigger the toggle function
	$head = $( '#head' );
	$head.on( 'click', toggle );
	$torso = $( '#torso' );
	$torso.on( 'click', toggle );
	$arms = $( '#arms' );
	$arms.on( 'click', toggle );
	$legs = $( '#legs' );
	$legs.on( 'click', toggle );

	//Activate Annyang(I'm listening to you kiddo)
	activeAnnyang();

	//Play the soundtrack
	sound.play();
}

//--------------=TOGGLE=--------------//
//toggle is the main function of Children's Avatar Maker 2019 Edition
//
//first it plays the soundbite signifying next image
//Adds 1 to the number of clicks being tracked by the numClick variable
//
//$(this) is the clicked id (#head, #torso, #arms, #legs)
//$(this) will be animated to go right off screen.
//
//At the completion of the first animation the changeImages function is called
//the css of $(this) is changed to -250
//
//Then it is animated back to it's original position
//
//Last thing toggle does is to add distortion by calling the distortSound function (see the function for more info)
function toggle() {
	//Play sound effect
	nextSFX.play();

	//add 1 to the numClick variable
	numClick += 1;

	//first animation stage
	$( this ).animate( {
		left: "2000"
		//here changeImages is called
	}, 500, changeImages );

	//second animation stage
	if ( this.id === 'arms' ) {
		$( this ).animate( {
			left: "30%"
		}, 1000 );
	} else {
		$( this ).animate( {
			left: "37.5%"
		}, 1000 );
	}

	//distortSound is called here
	distortSound();
}

//--------------=CHANGE_IMAGES=--------------//
//change images is the second main function which works in conjuction with TOGGLE
//this function sets the css to the far left
//
//then the function checks what $(this) is either (#head, #torso, #arms, #legs)
//depending on which is selected, change the image to a random new image
function changeImages() {
	//CSS position change
	$( this ).css( 'left', -500 );

	//Randomly select new image from array & store it in a variable (face,body,hand,feet)
	let face = faces[ Math.floor( Math.random() * faces.length ) ];
	let body = bodies[ Math.floor( Math.random() * bodies.length ) ];
	let hand = hands[ Math.floor( Math.random() * hands.length ) ];
	let feet = feets[ Math.floor( Math.random() * feets.length ) ];

	//Set the new image to the selected (this) body part
	if ( this.id === "head" ) {
		$head.attr( 'src', face );
	};
	if ( this.id === "torso" ) {
		$torso.attr( 'src', body );
	};
	if ( this.id === "arms" ) {
		$arms.attr( 'src', hand );
	};
	if ( this.id === "legs" ) {
		$legs.attr( 'src', feet )
	};

	//Lastly we call addImages function
	unlockImages();
}

//--------------=UNLOCK_IMAGES=--------------//
//Unlock images is the function which removes images from the stored images array('body part name'Unlock)
//using .splice and put the new image in the corresponding body part active image array using .push
//
//A new Image is only added to the active array after a certain amount of clicks
//Unlock sound effect plays when image is added + "new unlock available" animation plays
function unlockImages() {
	//Randomly select images from the Unlock arrays and links them to the newFace/Body/Hand/Feet varaiable
	let newFace = facesUnlock[ Math.floor( Math.random() * facesUnlock.length ) ];
	let newBody = bodiesUnlock[ Math.floor( Math.random() * bodiesUnlock.length ) ];
	let newHand = handsUnlock[ Math.floor( Math.random() * handsUnlock.length ) ];
	let newFeet = feetsUnlock[ Math.floor( Math.random() * feetsUnlock.length ) ];

	//This template is repeated for all the other body parts
	//Faces: Number of clicks to unlock 30
	if ( numClick == 3 || numClick == 6 || numClick == 9 || numClick == 12 || numClick == 15 || numClick == 18 || numClick == 21 || numClick == 24 || numClick == 27 || numClick == 30 || numClick == 33 || numClick == 36 || numClick == 39 || numClick == 42 || numClick == 45 || numClick == 48 || numClick == 51 || numClick == 54 || numClick == 57 || numClick == 60 || numClick == 63 || numClick == 66 || numClick == 69 || numClick == 72 || numClick == 75 || numClick == 78 || numClick == 81 || numClick == 84 || numClick == 87 || numClick == 90 || numClick == 93 || numClick == 96 || numClick == 99 ) {

		//Pushing new unlock into active array & removing new unlock from unlock array
		faces.push( newFace );
		facesUnlock.splice( $.inArray( newFace, facesUnlock ), 1 );

		//Play Unlock sound effect
		unlockSFX.play();

		//Unlock div set source to first frame
		$( '#unlock' ).attr( 'src', 'assets/images/text/new-unlock-available-animation_0000_NEW-UNLOCK-AVAILABLE.png' );

		//Link animation to notif so we can cancel it later
		//call the unlockNotify function
		notif = setInterval( unlockNotify, 100 );
	}
	//BODIES
	if ( numClick == 1 || numClick == 4 || numClick == 8 || numClick == 10 || numClick == 14 || numClick == 18 || numClick == 20 || numClick == 24 || numClick == 28 || numClick == 30 || numClick == 34 || numClick == 38 || numClick == 41 || numClick == 44 || numClick == 48 || numClick == 50 || numClick == 54 || numClick == 58 || numClick == 61 || numClick == 64 || numClick == 68 || numClick == 70 || numClick == 74 || numClick == 88 ) {
		bodies.push( newBody );
		bodiesUnlock.splice( $.inArray( newBody, bodiesUnlock ), 1 );
	}
	//HANDS
	if ( numClick == 2 || numClick == 12 || numClick == 18 || numClick == 22 || numClick == 26 || numClick == 29 || numClick == 31 || numClick == 33 || numClick == 39 || numClick == 43 || numClick == 46 || numClick == 49 || numClick == 51 || numClick == 54 || numClick == 58 || numClick == 60 || numClick == 62 || numClick == 65 || numClick == 67 || numClick == 69 || numClick == 72 || numClick == 78 || numClick == 83 || numClick == 93 ) {
		hands.push( newHand );
		handsUnlock.splice( $.inArray( newHand, handsUnlock ), 1 );
	}
	//LEGS
	if ( numClick == 5 || numClick == 10 || numClick == 15 || numClick == 20 || numClick == 25 || numClick == 30 || numClick == 35 || numClick == 40 || numClick == 45 || numClick == 50 || numClick == 55 || numClick == 65 || numClick == 70 || numClick == 75 || numClick == 60 || numClick == 80 || numClick == 85 || numClick == 90 || numClick == 95 || numClick == 100 ) {
		feets.push( newFeet );
		feetsUnlock.splice( $.inArray( newFeet, feetsUnlock ), 1 );
	}

}

//--------------=ACTIVE_ANNYANG=--------------//
//In active annyang we set the commands used in the game and what functions they execute
function activeAnnyang() {
	//"if someone says one of these commands..."
	if ( annyang ) {
		//declare commands
		var commands = {
			//"Reset" makes the head, body, arms & legs the default starting assets
			'RESET': function() {
				$head.attr( 'src', 'assets/images/head/head (3).png' );
				$torso.attr( 'src', 'assets/images/torso/torso (6).png' );
				$arms.attr( 'src', 'assets/images/arms/arms (4).png' );
				$legs.attr( 'src', 'assets/images/legs/legs (3).png' );
			},
			//"Random" randomly picks images from active arrays
			'RANDOM': function() {
				let randoFace = faces[ Math.floor( Math.random() * faces.length ) ];
				let randoBody = bodies[ Math.floor( Math.random() * bodies.length ) ];
				let randoHand = hands[ Math.floor( Math.random() * hands.length ) ];
				let randoFeet = feets[ Math.floor( Math.random() * feets.length ) ];
				$head.attr( 'src', randoFace );
				$torso.attr( 'src', randoBody );
				$arms.attr( 'src', randoHand );
				$legs.attr( 'src', randoFeet );
			},
			//"Dance" calls the dance function on setInterval and sets it to the dancing variable
			'DANCE': function() {
				dancing = setInterval( dance, 500 );
			},
			//"Stop dancing" stops the animation by clearing the interval dancing
			'STOP DANCING': function() {
				clearInterval( dancing );
			}
		}
	}
	// Add our commands to annyang
	annyang.addCommands( commands );

	// Start listening.
	annyang.start();
}

//--------------=DISTORT_SOUND=--------------//
//Distort Sound is called  by the toggle function
//so that with each click it adds the current settings and distorts the sound with every click
//
//With these setting true distortion happens at 200 clicks
function distortSound() {
	let flanger = new Pizzicato.Effects.Flanger( {
		time: 0.025,
		speed: 0.025,
		depth: 0.025,
		feedback: 0.025,
		mix: 0.025
	} );
	sound.addEffect( flanger );
}

//--------------=DANCING EFFECTS=--------------//
//Defines the effects of each body part and their interval in this case .5 second
function dance() {
	$head.effect( "bounce", 500 );
	$torso.effect( "shake", 500 );
	$arms.effect( "bounce", 500 );
	$legs.effect( "shake", 500 );
}

//------=ANIMATE UNLOCK NOTIFICATION=-------//
//UnlockNotify is called in the unlockImages function, it dictates the frame by frame animation
function unlockNotify() {

	//set $unlock to be equal to the div with the id unlock
	let $unlock = $( '#unlock' )

	//Animation
	if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0000_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', 'assets/images/text/new-unlock-available-animation_0001_NEW-UNLOCK-AVAILABLE.png' );
	} else if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0001_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', 'assets/images/text/new-unlock-available-animation_0002_NEW-UNLOCK-AVAILABLE.png' );
	} else if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0002_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', 'assets/images/text/new-unlock-available-animation_0003_NEW-UNLOCK-AVAILABLE.png' );
	} else if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0003_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', 'assets/images/text/new-unlock-available-animation_0004_NEW-UNLOCK-AVAILABLE.png' );
	} else if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0004_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', 'assets/images/text/new-unlock-available-animation_0005_NEW-UNLOCK-AVAILABLE.png' );
	} else if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0005_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', 'assets/images/text/new-unlock-available-animation_0006_NEW-UNLOCK-AVAILABLE.png' );
	} else if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0006_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', 'assets/images/text/new-unlock-available-animation_0007_NEW-UNLOCK-AVAILABLE.png' );
	} else if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0007_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', 'assets/images/text/new-unlock-available-animation_0008_NEW-UNLOCK-AVAILABLE.png' );
	} else if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0008_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', 'assets/images/text/new-unlock-available-animation_0009_NEW-UNLOCK-AVAILABLE.png' );
	} else if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0009_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', 'assets/images/text/new-unlock-available-animation_0010_NEW-UNLOCK-AVAILABLE.png' );
	} else if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0010_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', 'assets/images/text/new-unlock-available-animation_0011_NEW-UNLOCK-AVAILABLE.png' );
	} else if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0011_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', 'assets/images/text/new-unlock-available-animation_0012_NEW-UNLOCK-AVAILABLE.png' );
	} else if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0012_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', 'assets/images/text/new-unlock-available-animation_0013_NEW-UNLOCK-AVAILABLE.png' );
	} else if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0013_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', 'assets/images/text/new-unlock-available-animation_0014_NEW-UNLOCK-AVAILABLE.png' );
	} else if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0014_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', 'assets/images/text/new-unlock-available-animation_0015_NEW-UNLOCK-AVAILABLE.png' );
	} else if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0015_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', 'assets/images/text/new-unlock-available-animation_0016_NEW-UNLOCK-AVAILABLE.png' );
	} else if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0016_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', 'assets/images/text/new-unlock-available-animation_0017_NEW-UNLOCK-AVAILABLE.png' );
	} else if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0017_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', 'assets/images/text/new-unlock-available-animation_0018_NEW-UNLOCK-AVAILABLE.png' );
	} else if ( $unlock.attr( 'src' ) === 'assets/images/text/new-unlock-available-animation_0018_NEW-UNLOCK-AVAILABLE.png' ) {
		$unlock.attr( 'src', '' );
		//Stop animation by clearing interval notif (which is the variable we linked to when we call setInterval)
		clearInterval( notif );
	}

}
