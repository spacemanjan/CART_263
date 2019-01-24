class Words{
	constructor (x,y,count) {
		this.x = x;
		this.y = y;
		this.active = true;
	}

display(){

	if (player.count >= 100 && player.count <= 250){
	stroke(50);
	fill(0,150,200);
	textSize(150);
	text("YOU CAN'T LOSE",this.x/2-280,this.y+50);
}
if (player.count >= 350 && player.count <= 600){
stroke(50);
fill(0,150,200);
textSize(70);
text("IT'S FUTILE YOU MIGHT AS WELL STOP",this.x/2-280,this.y+50);
}
if (player.count >= 600){
stroke(50);
fill(0,150,200);
textSize(100);
text("OKAY HAVE FUN",this.x/2-200,this.y+50);
}
}
}
