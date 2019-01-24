"use strict";

let $spans;
let secrets;

secrets = 0;

$(document).ready(function () {

	setInterval(update,500);
	$spans = $('.redacted');
    $spans.on('click',spanClicked);
	$spans.hasClass('hidden');
	$('.hidden').on('mouseover',revealSpan);
});

function update() {
	$spans.each(updateSpan);
	$('#secret-num').text(secrets);
	if (secrets === 9){
	$('.not-finish').addClass('finish').removeClass('not-finish');
	}
}

function updateSpan() {
	let r = Math.random();
	if (r < 0.1){
		$(this).removeClass('redacted');
		$(this).addClass('revealed');
	}
}

function spanClicked() {
	$(this).addClass('redacted');
	$(this).removeClass('revealed');
}

function revealSpan() {
	$(this).addClass('found');
	$(this).off('mouseover');
	$(this).removeClass('hidden');
	secrets ++;
}
