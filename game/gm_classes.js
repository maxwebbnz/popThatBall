/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */


let circleDirectionX = 1; // Left or Right
let circleDirectionY = 1; // Top to Bottom

let velRange = [-10,-9,-8,-7,-6,6,7,8,9,10]

let init = true;
// ball class
class Ball {
	constructor(x, y, r, col) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.speedX = random(velRange) * levels[level].velInt
		this.speedY = random(velRange) * levels[level].velInt
		this.colour = (col);
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
	clicked(px, py) {
		// calculate the distance between mouse and ball
		let d = dist(px, py, this.x, this.y);
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