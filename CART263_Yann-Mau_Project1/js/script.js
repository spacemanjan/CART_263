/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let r;

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
//====SUGGESTION====//
//make 4 triggerzones for each corresponding Arrow
//make triggerzone droppable so it can catch draggable objects
$trigger.droppable({
	//set the tolerance to touch so if the key even overlaps the zone a little it will still be caught
	tolerance: "touch",
	// when a draggable is OVER the triggerZone activate key press function
	over: function(event,ui){
		keyPress();
	}
});
}

//key press will check if the corresponding key is down and if so...
function keyPress(){
	if ($trigger.keydown(38)){
		//make the arrow dissapear
		//make sysphus think
	}
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
	//if r = 1 create UP arrow
	//give it the ID of ONE & a corresponding image
	// make it draggable so that the droppable will notice it
	if (r === 1){
		$arrow.attr('id','one');
		$arrow.attr('src','assets/images/Arrowup.png');
		$arrow.animate({ bottom: "+=1100"}, 5000);
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
