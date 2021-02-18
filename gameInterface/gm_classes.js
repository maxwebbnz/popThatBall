/*
 * Copyright (c) 2021 Max Webb 
 * All rights reserved.
 */

 // classes file.
let circleDirectionX = 1; // Left or Right
let circleDirectionY = 1; // Top to Bottom
let ballDia = 40
let score = 0;


// ball class
class Ball {
    constructor(x, y, r, col, speedX, speedY) {
      this.x = random(0, x);
      this.y = random(0, y);
      this.r = r;
      this.speedX = speedX;
      this.speedY = speedY;
      this.colour = (col.r, col.b, col.g);
    };
    move() {
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
        // checking that ball is actually coliding correctly
        if (this.x > width - this.r) {
            this.speedX *= -1;
            this.x = width - this.r;
            console.log(this.x)
          }else if(this.x < this.r){
                this.speedX *= -1;
                this.x = this.r;

          }
        if (this.y > height - this.r) {
            this.speedY *= -1;
            this.y = height - this.r;
        }else if(this.y < this.r){
                this.speedY *= -1;
                this.y = this.r;
          }
    };
    clicked(px, py) {
      let d = dist(px, py, this.x, this.y);
      // * the radius of the ball by 2 so it has a better click to score ratio.
      if (d < this.r*2) {
        score = score + 1;
        return true;
      } else {
        return false;
      }
    }
  
    show() {
      stroke(255)
      fill(this.colour)
      ellipse(this.x, this.y, this.r * 2)
      // ellipseMode(RADIUS)
    }
  }