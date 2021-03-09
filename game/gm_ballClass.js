/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */


let velRange = [-10,-9,-8,-7,-6,6,7,8,9,10]

// ball class
class Ball {
	constructor(_x, _y, _r, _col) {
		this.x = _x;
		this.y = _y;
		this.r = _r;
		this.speedX = random(velRange) * levels[level].velInt
		this.speedY = random(velRange) * levels[level].velInt
		this.colour = (_col);
		this.paused = false;
	};
	move() {
		if(!this.paused){
			this.x = this.x + this.speedX;
			this.y = this.y + this.speedY;
		}

		// if ball x value is greater than width of canvas
		if (this.x > width - this.r) {
			// move the ball the other way
			this.speedX *= -1;
			this.x = width - this.r;
			// console.log(this.x)
		} else if (this.x < this.r) {
			this.speedX *= -1;
			this.x = this.r;

		}
		if (this.y > height - this.r) {
			this.speedY *= -1;
			this.y = height - this.r;
		} else if (this.y < this.r) {
			this.speedY *= -1;
			this.y = this.r;
		}
	};
	pauseBalls(){
		this.paused = true;
		this.x = this.x
		this.y = this.y
	}
	clicked(_px, _py) {
		// calculate the distance between mouse and ball
		let d = dist(_px, _py, this.x, this.y);
		// if the distance to the ball is less than the ball rad
		if (d < this.r) {
			// yes
			return true;
		}
	};
	show() {
		stroke(0,255,0)
		fill(this.colour)
		ellipse(this.x, this.y, this.r * 2)
	}
}