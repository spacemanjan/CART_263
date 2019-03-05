"use strict";

/*****************

Slamina
Yann-Maurice McNiven

Its animals backwards tho.

******************/
const NUM_OPTIONS = 5

let animals = [
	"aardvark",
	"alligator",
	"alpaca",
	"antelope",
	"ape",
	"armadillo",
	"baboon",
	"badger",
	"bat",
	"pippinbarr",
	"bear",
	"beaver",
	"bison",
	"boar",
	"buffalo",
	"bull",
	"camel",
	"canary",
	"capybara",
	"cat",
	"chameleon",
	"cheetah",
	"chimpanzee",
	"chinchilla",
	"chipmunk",
	"cougar",
	"cow",
	"coyote",
	"crocodile",
	"crow",
	"deer",
	"dingo",
	"dog",
	"donkey",
	"dromedary",
	"elephant",
	"elk",
	"ewe",
	"ferret",
	"finch",
	"fish",
	"fox",
	"frog",
	"gazelle",
	"gila monster",
	"giraffe",
	"gnu",
	"goat",
	"gopher",
	"gorilla",
	"grizzly bear",
	"ground hog",
	"guinea pig",
	"hamster",
	"hedgehog",
	"hippopotamus",
	"hog",
	"horse",
	"hyena",
	"ibex",
	"iguana",
	"impala",
	"jackal",
	"jaguar",
	"kangaroo",
	"koala",
	"lamb",
	"lemur",
	"leopard",
	"lion",
	"lizard",
	"llama",
	"lynx",
	"mandrill",
	"marmoset",
	"mink",
	"mole",
	"mongoose",
	"monkey",
	"moose",
	"mountain goat",
	"mouse",
	"mule",
	"muskrat",
	"mustang",
	"mynah bird",
	"newt",
	"ocelot",
	"opossum",
	"orangutan",
	"oryx",
	"otter",
	"ox",
	"panda",
	"panther",
	"parakeet",
	"parrot",
	"pig",
	"platypus",
	"polar bear",
	"porcupine",
	"porpoise",
	"prairie dog",
	"puma",
	"rabbit",
	"raccoon",
	"ram",
	"rat",
	"reindeer",
	"reptile",
	"rhinoceros",
	"salamander",
	"seal",
	"sheep",
	"shrew",
	"silver fox",
	"skunk",
	"sloth",
	"snake",
	"squirrel",
	"tapir",
	"tiger",
	"toad",
	"turtle",
	"walrus",
	"warthog",
	"weasel",
	"whale",
	"wildcat",
	"wolf",
	"wolverine",
	"wombat",
	"woodchuck",
	"yak",
	"zebra"
];
let answers = [];
let goodAnimal;
let goodShake = false;
let correct = 0;
let $counter;

$( document ).ready( setup );

function setup() {

	$( '#hide' ).on( 'click', start );

}

function start() {
	$( '#hide' ).remove();
	$counter = $( '<div class="counter"></div>' );
	$counter.text( 'Correct answers so far: ' + correct );
	$( 'body' ).append( $counter );
	newRound();
	if ( annyang ) {
		// Let's define our first command. First the text we expect, and then the function it should call
		var commands = {
			'I GIVE UP': function() {
				correct = 0;
				$counter.text( 'Correct answers so far: ' + correct );
				$('.guess').each(function(){
					if($(this).text()===goodAnimal){
						$(this).effect({
							effect:'shake',
							complete:newRound
						});
					}
				})
			},
			'Say it again': function() {
				speakAnimal( goodAnimal );
				console.log( 'speak damn it' );
			},
			'I think it is :animal': function( animal ) {
				if ( animal === goodAnimal ) {
					console.log( "Correct!" );
					$( ".guess" ).remove();
					correct += 1;
					$counter.text( 'Correct answers so far: ' + correct );
					setTimeout( newRound, 1000 );
				} else {
					console.log( "Wrong!" );
					speakAnimal( goodAnimal );
					correct = 0;
					$counter.text( 'Correct answers so far: ' + correct );
					$('.guess').each(function(){
						if($(this).text()===goodAnimal){
							$(this).effect({
								effect:'shake',
								complete:newRound
							});
						}
					})
				}
				animal = answers;
			}
		};

		// Add our commands to annyang
		annyang.addCommands( commands );

		// Start listening. You can call this here, or attach this call to an event, button, etc.
		annyang.start();
	}
}
//the Label is beast which is pushed into answers[] in function newRound
function addButton( label ) {
	//how to make a new div
	let $button = $( '<div class="guess"></div>' );
	$button.text( label );
	$button.button();
	$button.on( 'click', buttonClick );
	$( 'body' ).append( $button );
}

function buttonClick() {
	if ( $( this ).text() === goodAnimal ) {
		console.log( "Correct!" );
		correct += 1;
		$counter.text( 'Correct answers so far: ' + correct );
		$( ".guess" ).remove();
		setTimeout( newRound, 1000 );
	} else {
		console.log( "Wrong!" );
		correct = 0;
		$counter.text( 'Correct answers so far: ' + correct );
		speakAnimal( goodAnimal );
		$( this ).effect( 'shake' );
	}
}

function newRound() {
	$('.guess').remove();
	answers = [];

	for ( let i = 0; i < NUM_OPTIONS; i++ ) {
		let beast = animals[ Math.floor( Math.random() * animals.length ) ];
		addButton( beast );
		answers.push( beast );
	}
	goodAnimal = answers[ Math.floor( Math.random() * answers.length ) ];

	speakAnimal( goodAnimal );
}

function speakAnimal( name ) {
	//split divides a string into its elements
	let reverseName = name.split( '' ).reverse().join( '' );
	let options = {
		rate: 0.5
	};
	responsiveVoice.speak( reverseName, "Australian Male", options );
}
