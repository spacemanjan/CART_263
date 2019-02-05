/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let r;
let sisStage;

let thoughts = [
 "Hmmmm that's a good thought",
 "smart thinking",
 "Yup that makes sense to me",
 "if that is true than it must infer that..."
];

$(document).ready(setup);

function setup(){
//call function every second to generate a random number
setInterval(random,1000);
$trigger = $('#triggerZone');
$sisy = $('#sisy');

setInterval(keyPress,1000);
//ISSUE WITH PLAYING MUSIC uncaught DOMException
$('audio#track')[0].play();

//====SUGGESTION====//
//make 4 triggerzones for each corresponding Arrow
//make triggerzone droppable so it can catch draggable objects
$trigger.droppable({
	//set the tolerance to touch so if the key even overlaps the zone a little it will still be caught
	tolerance: "touch",
	// when a draggable is OVER the triggerZone activate key press function
	over: function(event,ui){

	}
});
}

//key press will check if the corresponding key is down and if so...
//TO DO: add music play everytime you hit the key correctly
function keyPress(){
	$(window).keydown(function(evt){
		if (evt.which === 38){
			setInterval( sisyphus, 400);
			sisStage = 1;
		console.log("UP GOT");
	} else if (evt.which === 40){
		setInterval( sisyphus, 400);
		sisStage = 2;
		console.log("DOWN GOT");
	} else if (evt.which === 37){
		console.log("LEFT GOT");
	} else if (evt.which === 39){
		console.log("RIGHT GOT");
	}
		//make the arrow dissapear
		//make sysphus think
	})
}
function random(){
//generate random number to determine which arrow is sent out
 r = Math.floor((Math.random()*4)+1);
 console.log(r);
//send out arrow
addArrow();
}

function addArrow(){
	//create new arrow div
	let $arrow = $('<img></img>');
	$arrow.addClass
	//if r = 1 create UP arrow
	//give it the ID of ONE & a corresponding image
	// make it draggable so that the droppable will notice it
	if (r === 1){
		$arrow.attr('id','one');
		$arrow.attr('src','assets/images/Arrowup.png');
		$arrow.animate({ top: "-=1100"},  5000);
		$arrow.draggable();
		//===ERROR===//
		//my div keeps moving over to the right
	}
	// repeat same process with other arrows
	if(r === 2){
		$arrow.attr('id','two');
		$arrow.attr('src','assets/images/Arrowdown.png');
		$arrow.animate({ bottom: "+=1100"}, 5000);
		// $arrow.draggable();
	}
	if(r === 3){
		$arrow.attr('id','three');
		$arrow.attr('src','assets/images/Arrowleft.png');
		$arrow.animate({ bottom: "+=1100"}, 5000);
		// $arrow.draggable();
	}
	if(r === 4){
		$arrow.attr('id','four');
		$arrow.attr('src','assets/images/Arrowright.png');
		$arrow.animate({ bottom: "+=1100"}, 5000);
		// $arrow.draggable();
	}
// spawn arrows in smartzone
	$arrow.appendTo("#smartZone");
}

function sisyphus(){
if (sisStage === 1){
	if ($sisy.attr('src') === "assets/images/Sysphis1.png") {
		$sisy.attr('src', 'assets/images/Sysphis1breath.png');
	}
	else {
		$sisy.attr('src', 'assets/images/Sysphis1.png');
	}
}
if (sisStage === 2){
	if ($sisy.attr('src') === "assets/images/Sysphis1.png") {
		$sisy.attr('src', 'assets/images/Sysphis2.png').delay(200);
	}
	else if ($sisy.attr('src') === "assets/images/Sysphis2.png"){
		$sisy.attr('src', 'assets/images/Sysphis3.png').delay(200);
	}
	else if ($sisy.attr('src') === "assets/images/Sysphis3.png"){
		$sisy.attr('src', 'assets/images/Sysphis4.png').delay(200);
	}
	else if ($sisy.attr('src') === "assets/images/Sysphis4.png"){
		$sisy.attr('src', 'assets/images/Sysphis5.png').delay(200);
	}
	if ($sisy.attr('src') === "assets/images/Sysphis5.png") {
		console.log("im in stage 3")
		sisStage = 3;
	}
}
if (sisStage === 3){
	if ($sisy.attr('src') === "assets/images/Sysphis5.png") {
		$sisy.attr('src', 'assets/images/Sysphis4.png').delay(200);
	}
	else if ($sisy.attr('src') === "assets/images/Sysphis4.png"){
		$sisy.attr('src', 'assets/images/Sysphis3.png').delay(200);
	}
	else if ($sisy.attr('src') === "assets/images/Sysphis3.png"){
		$sisy.attr('src', 'assets/images/Sysphis2.png').delay(200);
	}
	else if ($sisy.attr('src') === "assets/images/Sysphis2.png"){
		$sisy.attr('src', 'assets/images/Sysphis1.png').delay(200);
	}
	if ($sisy.attr('src') === "assets/images/Sysphis1.png") {
		console.log("im in stage 1")
		sisStage = 2;
	}
}}
