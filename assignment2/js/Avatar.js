class Avatar extends Agent {
	constructor (x,y,size,sizeLose,maxSize) {
		super(x,y,size,'#DD878D');
		this.sizeLose = sizeLose;
		this.maxSize = size;
		this.count = 0;
	}

	update() {
		if (!this.active){
			return;
		}

		this.x = mouseX;
		this.y = mouseY;

		this.size = constrain(this.size - this.sizeLose,0,this.maxSize);

	if (this.size === 0){
		this.active = false;
	}
}
	eat(other) {
		if (!player.active) {
			return;
		}
		this.size = constrain(this.size + other.size,0,this.maxSize);
  		other.reset();
		this.count += 1;
	}
}
