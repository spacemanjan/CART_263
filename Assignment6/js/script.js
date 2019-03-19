"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
$(document).ready(function(){
		$.getJSON('data/data.JSON', dataLoaded);
		$('HTML').click(function(){
			location.reload();
		})
});

function dataLoaded(data){
	console.log(data);
	let cats = getRandomElement(data.cats);
	let rooms = getRandomElement(data.rooms);
	let condiments = getRandomElement(data.condiments);
	let monsters = getRandomElement(data.greek_monsters);
	let vowels = data.vowels;
	console.log(condiments);
	console.log(rooms);
	console.log(cats);
	console.log(vowels);
	let verb = 'is';
	if (condiments.charAt(condiments.length-1) === 's'){
		verb = 'are';
	}
	let catsan = 'a';
	let roomsan = 'a';
	let monsteran = 'a';
	for (let i = 0; i < vowels.length; i++){
	if (cats.charAt(0) === vowels[i] ){
		catsan = 'an'
	}
	if (rooms.charAt(0) === vowels[i] ){
		roomsan = 'an'
	}
	if (monsters.charAt(0) === vowels[i] ){
		monsteran = 'an'
	}
}
	console.log(verb);
	let description = condiments +" "+ verb +" like a "+ cats +" in a "+ rooms;
	let templateDescription = `${condiments} ${verb} like ${catsan} ${cats} in ${roomsan} ${rooms} where ${monsteran} ${monsters} has just been.`;
	console.log(templateDescription);

	$('body').append(templateDescription);
}

function getRandomElement(array) {
	let element = array[Math.floor(Math.random() * array.length)];
	return element;
}
