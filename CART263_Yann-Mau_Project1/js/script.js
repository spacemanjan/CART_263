/*****************

Think Think Revolution - Sisyphus Edition
Yann-Maurice McNiven

Sisyphus has put down his stone to contemplate like the philosophers of his culture on
the meaning of life, unfortunately for sisphys like his classic challenge this will be an
unachievable task. Hit the keys as they correspond to inspire sisyphus' thoughts and
at the same time try and contemplate the greater mysteries yourself and live the
sisyphus experience.

******************/

//declaring my variables
let r;
let sisStage = 1;
let score = 0;
//load my sounds
let soundtrack = new Audio( "assets/sounds/AgeOfMythology.wav" );
let upsound = new Audio( "assets/sounds/1stTone.wav" );
let downsound = new Audio( "assets/sounds/2ndTone.wav" );
let leftsound = new Audio( "assets/sounds/3rdTone.wav" );
let rightsound = new Audio( "assets/sounds/4thTone.wav" );

//create an array with thoughts to be loaded in by the life() function
let thoughts = [
	"Plato might have known",
	"A good sandwhich",
	"Life and death",
	"Living every day",
	"Letting life take the reins",
	"Allowing oneself to trust",
	"Being open to new experiences",
	"Smelling the roses",
	"Treating yourself",
	"Enjoying every detail",
	"pushing a large stone",
	"suffering for others",
	"giving up control",
	"in being honest",
	"playing video games",
	"Pippin might know the answer",
	"Worshiping zeus",
	"maybe there is no answer"
];

//preload function
$( document ).ready( preload );
//load game on click
function preload(){
	$('HTML').click(setup);
}

function setup() {
	$('HTML').off();
	//hide instructions by adding class gone which has visibility: hidden in css
	$('.Instructions').addClass('gone');
	//call function every second to generate a random number
	setInterval( random, 1000 );
	//shorthand for the sisyphus animation
	$sisy = $( '#sisy' );
	//setup keySetup so it's listening for our key presses
	keySetup();

	//start the soundtrack
	//declare loop as true so it repeats constantly
	soundtrack.loop = true;
	soundtrack.currentTime = 0;
	soundtrack.play();

	//setInterval for the animation of sisyphus
	setInterval( sisyphus, 400 );
}

//key Setup will check if the corresponding key is down and check where it is in
//relation to the static key if its within the range it will change the arrow to ressemble the
//static arrow and make a corresponding sound
function keySetup() {
	$( window ).keydown( function( evt ) {
		if ( evt.which === 38 ) {
			$( '.uparrow' ).each( function() {
				//if the arrow is within 60px difference up and down from the center of the static arrows then
				//play sound, change img src & add a point to the score
				if ( ( $( this ).offset().top ) - ( $( '#uphold' ).offset().top ) <= 30 && ( $( this ).offset().top ) - ( $( '#uphold' ).offset().top ) >= -30 ) {
					upsound.currentTime = 0;
					upsound.play();
					$( this ).attr( 'src', 'assets/images/uphold.png' );
					score += 1;
					console.log( score );
				}
			} )
		} else if ( evt.which === 40 ) {
			$( '.downarrow' ).each( function() {
				if ( ( $( this ).offset().top ) - ( $( '#downhold' ).offset().top ) <= 30 && ( $( this ).offset().top ) - ( $( '#downhold' ).offset().top ) >= -30 ) {
					downsound.currentTime = 0;
					downsound.play();
					$( this ).attr( 'src', 'assets/images/downhold.png' );
					score += 1;
				}
			} )
		} else if ( evt.which === 37 ) {
			$( '.leftarrow' ).each( function() {
				if ( ( $( this ).offset().top ) - ( $( '#lefthold' ).offset().top ) <= 30 && ( $( this ).offset().top ) - ( $( '#lefthold' ).offset().top ) >= -30 ) {
					leftsound.currentTime = 0;
					leftsound.play();
					$( this ).attr( 'src', 'assets/images/lefthold.png' );
					score += 1;
				}
			} )
		} else if ( evt.which === 39 ) {
			$( '.rightarrow' ).each( function() {
				if ( ( $( this ).offset().top ) - ( $( '#righthold' ).offset().top ) <= 30 && ( $( this ).offset().top ) - ( $( '#righthold' ).offset().top ) >= -30 ) {
					rightsound.currentTime = 0;
					rightsound.play();
					$( this ).attr( 'src', 'assets/images/righthold.png' );
					score += 1;
				}
			} )
		}
	} )
}

function random() {
	//generate random number to determine which arrow is sent out
	r = Math.floor( ( Math.random() * 4 ) + 1 );
	//send out arrow
	addArrow();
}

//generate arrows
function addArrow() {
	//create new arrow div
	let $arrow = $( '<img></img>' );
	$arrow.addClass
	//if r = 1 create UP arrow
	//give it the class of up/down/left/right arrow & a corresponding image
	//when the arrow completes it's animation remove it
	if ( r === 1 ) {
		$arrow.attr( 'class', 'uparrow' );
		$arrow.attr( 'src', 'assets/images/Arrowup.png' );
		$arrow.animate( {
			top: "-=1100"
		}, 5000, function() {
			$( this ).remove();
		} );
	}
	// repeat same process with other arrows
	if ( r === 2 ) {
		$arrow.attr( 'class', 'downarrow' );
		$arrow.attr( 'src', 'assets/images/Arrowdown.png' );
		$arrow.animate( {
			bottom: "+=1100"
		}, 5000, function() {
			$( this ).remove();
		} );
	}
	if ( r === 3 ) {
		$arrow.attr( 'class', 'leftarrow' );
		$arrow.attr( 'src', 'assets/images/Arrowleft.png' );
		$arrow.animate( {
			bottom: "+=1100"
		}, 5000, function() {
			$( this ).remove();
		} );
	}
	if ( r === 4 ) {
		$arrow.attr( 'class', 'rightarrow' );
		$arrow.attr( 'src', 'assets/images/Arrowright.png' );
		$arrow.animate( {
			bottom: "+=1100"
		}, 5000, function() {
			$( this ).remove();
		} );
	}
	// spawn arrows in smartzone
	$arrow.appendTo( "#smartZone" );
}

//Sisyphus animation function
//Sisyphus has three stages a resting stage (stage 1), a rising stage (stage 2), and a return
//to resting stage (stage 3), this function controls the animation frames, and depending
//on the stage sisyphus is at what animation he should do next.
//His animations depend on the score every 5 points he will change positions
function sisyphus() {
	//resting stage
	if ( sisStage === 1 ) {
		if ( $sisy.attr( 'src' ) === "assets/images/Sysphis1.png" ) {
			$sisy.attr( 'src', 'assets/images/Sysphis1breath.png' );
		} else {
			$sisy.attr( 'src', 'assets/images/Sysphis1.png' );
		}
	}
	//score/stage handler also triggers the life() function
	if ( score >= 5 ) {
		if ( sisStage === 1 ) {
			sisStage = 2;
		} else if ( sisStage === 2 ) {
			sisStage = 3;
		}
		//
		life();
		console.log("LIFE");
		score = 0;
	}
	if ( sisStage === 2 ) {
		if ( ( $sisy.attr( 'src' ) === "assets/images/Sysphis1.png" ) || ( $sisy.attr( 'src' ) === "assets/images/Sysphis1breath.png" ) ) {
			$sisy.attr( 'src', 'assets/images/Sysphis2.png' ).delay( 200 );
		} else if ( $sisy.attr( 'src' ) === "assets/images/Sysphis2.png" ) {
			$sisy.attr( 'src', 'assets/images/Sysphis3.png' ).delay( 200 );
		} else if ( $sisy.attr( 'src' ) === "assets/images/Sysphis3.png" ) {
			$sisy.attr( 'src', 'assets/images/Sysphis4.png' ).delay( 200 );
		} else if ( $sisy.attr( 'src' ) === "assets/images/Sysphis4.png" ) {
			$sisy.attr( 'src', 'assets/images/Sysphis5.png' ).delay( 200 );
		}
	}
	if ( sisStage === 3 ) {
		if ( $sisy.attr( 'src' ) === "assets/images/Sysphis5.png" ) {
			$sisy.attr( 'src', 'assets/images/Sysphis4.png' ).delay( 200 );
		} else if ( $sisy.attr( 'src' ) === "assets/images/Sysphis4.png" ) {
			$sisy.attr( 'src', 'assets/images/Sysphis3.png' ).delay( 200 );
		} else if ( $sisy.attr( 'src' ) === "assets/images/Sysphis3.png" ) {
			$sisy.attr( 'src', 'assets/images/Sysphis2.png' ).delay( 200 );
		} else if ( $sisy.attr( 'src' ) === "assets/images/Sysphis2.png" ) {
			$sisy.attr( 'src', 'assets/images/Sysphis1.png' ).delay( 200 );
		}
		if ( $sisy.attr( 'src' ) === "assets/images/Sysphis1.png" ) {
			sisStage = 1;
		}
	}
}
//Life() pulls from the array at the top and generates a new thought
//its called every 5 points
function life() {
	let $think = $( '#thinking' );
	let thought = thoughts[ Math.floor( Math.random() * thoughts.length ) ];
	// Add a p tag to the dialog div that contains the question text
	$think.html('The Meaning of life is...');
	$think.append( "<p>" + thought + "</p>" );

}
