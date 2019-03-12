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
	'assets/images/head/goomba.png',
	'assets/images/head/mario.png'
];
let facesUnlock = [
	'assets/images/head/clown.png',
	'assets/images/head/bread.png',
	'assets/images/head/shaggy.png'
];
let bodies = [
	'assets/images/torso/body.png',
];
let bodiesUnlock = [

];
let hands = [

];
let handsUnlock = [

];
let feets = [

];
let feetsUnlock = [

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



//--------------=START_PROGRAM=--------------//
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
//Set it so that on clicking of body parts toggle is called
//Activate Annyang so we launch the voice commands portion
//& Finally begin playing soundtrack
function setup() {
	$( 'HTML' ).off();
	$head = $( '#head' );
	$head.on( 'click', toggle );

	$torso = $( '#torso' );
	$torso.on( 'click', toggle );

	$arms = $('.arms');
	$arms.on('click', toggle );

	$legs = $('#legs');
	$legs.on('click', toggle );

	activeAnnyang();
	sound.play();
}

//--------------=TOGGLE=--------------//
//toggle is the main function of Children's Avatar Maker 2019 Edition
//$(this) is the clicked id/class (#head, #torso, .arms, #legs)
//$(this) will be animated to go right off screen.
//At the completion of the first animation the changeImages function is called
//the css of $(this) is changed to -250 and then animated
//back to it's original position
function toggle() {
	nextSFX.play();
	//add 1 to the numClick variable
	numClick += 1;
	//first animation stage
	$( this ).animate( {
		left: "2000"
		//changeImages is called
	}, 500, changeImages );
	//second animation stage
	$( this ).animate( {
		left: "37.5%"
	}, 1000 );
	console.log( numClick );
	console.log( facesUnlock );
	//distortSound is called here so that with each click it adds the current settings and distorts the sound with every click
	distortSound();
	// stopPropogation();
}

//--------------=CHANGE_IMAGES=--------------//
//change images is the second main function which works in conjuction with TOGGLE
//this function sets the css to the far left
//then the function checks what $(this) is either (#head, #torso, #arms, #legs)
//depending on which is selected, change the image to a new image
function changeImages() {
	//CSS position change
	$( this ).css( 'left', -250 );

	//Randomly select new image from array & store it in a variable (face,body,hand,feet)
	let face = faces[ Math.floor( Math.random() * faces.length ) ];
	let body = bodies[ Math.floor( Math.random() * bodies.length) ];
	let hand = hands[ Math.floor( Math.random() * hands.length) ];
	let feet = feets[ Math.floor( Math.random() * feets.length) ];

	//Set the new image to the selected (this) body part
	if ( this.id === "head" ) {
		$head.attr( 'src', face );
	};
	if (this.id === "torso" ) {
		$torso.attr('src', body);
	};
	if (this.class === "arms") {
		$arms.attr('src', hand);
	};
	if (this.id === "legs") {
		$legs.attr('src', feet)
	};

	//Lastly we call addImages function
	addImages();
}

//--------------=ADD_IMAGES=--------------//
//
function addImages() {
	let faceImage = facesUnlock[ Math.floor( Math.random() * facesUnlock.length ) ];
	if ( numClick == 2 || numClick == 4 || numClick == 6 ) {
		unlockSFX.play();
		$( '#unlock' ).attr( 'src', 'assets/images/text/new-unlock-available-animation_0000_NEW-UNLOCK-AVAILABLE.png' );
		notif = setInterval( unlockNotify, 100 );

		faces.push( faceImage );
		//removes the random image from the faces Unlock array
		facesUnlock.splice( $.inArray( faceImage, facesUnlock ), 1 );
		console.log( faceImage );
	}
}

//--------------=ACTIVE_ANNYANG=--------------//
function activeAnnyang() {
	if ( annyang ) {
		var commands = {
			'RESET': function() {
				$head.attr( 'src', 'assets/images/head/mario.png' );
			},
			'RANDOM': function() {
				let randoFace = faces[ Math.floor( Math.random() * faces.length ) ];
				$head.attr( 'src', randoFace );
				console.log( faces.length );
			},
			'DANCE': function() {
				dancing = setInterval( dance, 500 );
			},
			'STOP DANCING': function() {
				clearInterval( dancing );
			}
		}
	}
	// Add our commands to annyang
	annyang.addCommands( commands );
	// Start listening. You can call this here, or attach this call to an event, button, etc.
	annyang.start();
}

//--------------=DISTORT_SOUND=--------------//
//With these setting true distortion happens at 200 clicks
function distortSound() {
	let flanger = new Pizzicato.Effects.Flanger( {
		time: 0.05,
		speed: 0.05,
		depth: 0.05,
		feedback: 0.05,
		mix: 0.05
	} );
	sound.addEffect( flanger );
}

//--------------=DANCING EFFECTS=--------------//
function dance() {
	$head.effect( "bounce", 500 );
	$torso.effect( "shake", 500 );
	$arms.effect( "bounce", 500 );
	$legs.effect( "shake", 500 );
}

//------=ANIMATE UNLOCK NOTIFICATION=-------//
//UnlockNotify is called in the addImages function,
function unlockNotify() {
	let $unlock = $( '#unlock' )
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
		clearInterval( notif );
	}

}
