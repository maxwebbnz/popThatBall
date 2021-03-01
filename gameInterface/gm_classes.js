/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */


let circleDirectionX = 1; // Left or Right
let circleDirectionY = 1; // Top to Bottom
let score = 0;

let velRange = [-10,-9,-8,-7,-6,6,7,8,9,10]
// let negRange = [6,7,8,9,10,11,12]

let init = true;
// ball class
class Ball {
	constructor(x, y, r, col) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.speedX = random(velRange) * levels[level].velInt
		// again with Y direction
		this.speedY = random(velRange) * levels[level].velInt
		// checker if the ball is in the center
		// this.center = true
		this.colour = (col);
	};
	move() {

			this.x = this.x + this.speedX;
			this.y = this.y + this.speedY;

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
	clicked(px, py) {
		let d = dist(px, py, this.x, this.y);
		// * the radius of the ball by 2 so it has a better click to score ratio.
		if (d < this.r) {
			return true;
		} else if (d >= this.r) {
			return false;
		}
	};
	show() {
		stroke(0,255,0)
		fill(this.colour)
		ellipse(this.x, this.y, this.r * 2)
		// ellipseMode(RADIUS)
	}
}