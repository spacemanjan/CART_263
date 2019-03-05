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
let bodies = [

];
let hands = [

];
let feets = [

];

//declare head, torso, arms, & legs variables
let $head;
let $torso;
let $arms;
let $legs;

//variable numClick will track how many times a body part has been toggled
let numClick = 0;

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
	$head = $( '#head' );
	$head.on( 'click', toggle );

	$torso = $( '#torso' );
	$torso.on( 'click', toggle );
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
	console.log(numClick);
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
function addImages(){
	if (numClick === 2){
		console.log("muthafucka");
	}
}
