"use strict";

/*****************

Children's Avatar Maker 2019 Edition
Yann-Maurice McNiven

In Children's Avatar Maker 2019 Edition, have fun exploring the possibilites of making a fun
character of your own, combine diffrent heads to bodys, change up the legs and the arms.
Discover over 50 diffrent combinations that can be made with this fun project.

******************/

//--------------=VARIABLES=--------------//
//declare faces, bodies, hands, & feets arrays
//these arrays will hold the corresponding body part's library of images to chose from
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
let bodiesUnlock= [

];
let hands = [

];
let handsUnlock = [

];
let feets = [

];
let feetsUnlock = [

];

//declare head, torso, arms, & legs variables
let $head;
let $torso;
let $arms;
let $legs;

//variable numClick will track how many times a body part has been toggled
let numClick = 0;

//Load in sound track using Pizzicato
//Pizzicato is the library I'm using to distort the sound
let sound = new Pizzicato.Sound({
	source: 'file',
	options: { path: 'assets/sounds/fingerFamily.mp3', loop: true }
});

//declare dancing so we can call it and set it to an interval & clearInterval 
let dancing;

//--------------=START_PROGRAM=--------------//
$( document ).ready( preload );

//--------------=PRELOAD=--------------//
//preload is called at the begining to make sure things are called not on load
//but only when the user is ready to play & clicks on the screen
function preload() {
	//"on click launch setup"
	$( 'HTML' ).click( setup );
}

//--------------=SETUP=--------------//
function setup() {
	$('HTML').off();
	$head = $( '#head' );
	$head.on( 'click', toggle );

	$torso = $( '#torso' );
	$torso.on( 'click', toggle );

	activeAnnyang();

	sound.play();

}

//--------------=TOGGLE=--------------//
//toggle is the main function of Children's Avatar Maker 2019 Edition
//$(this) is the clicked id (#head, #torso, #arms, #legs)
//$(this) will be animated to go right off screen.
//At the completion of the first animation the changeImages function is called
//the css of $(this) is changed to -250 and then animated
//back to it's original position
function toggle() {
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
	stopPropogation();
}

//--------------=CHANGE_IMAGES=--------------//
//change images is the second main function which works in conjuction with TOGGLE
//this function sets the css to the far left
//then the function checks what $(this) is either (#head, #torso, #arms, #legs)
//depending on which is selected, change the image to a new image
function changeImages() {
	let face = faces[ Math.floor( Math.random() * faces.length ) ];
	$( this ).css( 'left', -250 );
	if ( this.id === "head" ) {
		$head.attr( 'src', face );
	}
	//call addImages function at the end of the last click
	addImages();
}

//--------------=ADD_IMAGES=--------------//
function addImages() {
	let faceImage = facesUnlock[ Math.floor( Math.random() * facesUnlock.length ) ];
	if ( numClick == 2 || numClick == 4 ) {
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
				dancing = setInterval(dance, 500);
			},
			'STOP DANCING':function() {
				clearInterval(dancing);
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
function distortSound(){
	let flanger = new Pizzicato.Effects.Flanger({
	    time: 0.01,
	    speed: 0.01,
	    depth: 0.01,
	    feedback: 0.01,
	    mix: 0.01
	});
	sound.addEffect(flanger);
}

function dance(){
	$head.effect("bounce", 500);
}
