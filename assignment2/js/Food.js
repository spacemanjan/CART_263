class Food extends Agent {
	constructor (x,y,minSize,maxSize,vx,vy,maxSpeed) {
		super(x,y, random(minSize,maxSize),'#F0FF00');
		this.minSize = minSize;
		this.maxSize = maxSize;
		this.maxSpeed = FOOD_SPEED;
		this.vx = random(-this.maxSpeed, this.maxSpeed);
		this.vy = random(-this.maxSpeed, this.maxSpeed);
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;

		// Wrapper (makes sure the food stays on screen)
		if (this.x > width){
			this.x -= width;
		} else if (this.x < 0){
			this.x += width;
		}
		if (this.y > height){
			this.y -= height;
		} else if (this.y < 0){
			this.y += height;
		}

	}

	reset() {
		this.x = random(0,width);
		this.y = random(0,height);
		this.size = random(this.minSize, this.maxSize);
		this.vx = random(-this.maxSpeed, this.maxSpeed);
		this.vy = random(-this.maxSpeed, this.maxSpeed);
	}
}
