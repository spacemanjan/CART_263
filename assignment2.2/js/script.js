"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let player;
let words;
let foodies = [];


// constant
//
const FOOD_SPEED = 10;
let food = 100;
// preload()
//
// not necessary for this assignment

function preload() {
}


// setup()
//
// Description of setup

function setup() {
	createCanvas(windowWidth,windowHeight);
	player = new Avatar (this.x,this.y,80,1,);
	//x,y,size
	words = new Words(windowWidth/2,windowHeight/2);
	for (let i = 0; i < food ; i++){

	foodies.push(new Food (random(0,width),random(0,height),40,90,'#F0FF00'));
}
}


// draw()
//
// Description of draw()

function draw() {
	background(50,10,70);
	words.display();
	player.display();
	player.update();
	if (player.collide(foodies)) {
		player.eat(foodies);
	}
	for (let i = 0; i < food ; i++){
	foodies[i].display();
	foodies[i].update();
}
	for (let i = 0; i < food; i++){
		if (player.collide(foodies[i])){
			foodies[i].reset();
			player.eat(foodies[i]);
		}
	}
}
