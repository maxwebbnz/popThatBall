/*
 * Copyright (c) 2021 Max Webb 
 * All rights reserved.
 */

let circleDirectionX = 2; // Left or Right
let circleDirectionY = 1; // Top to Bottom
let ballDia = 40
let score = 0;
class Ball {
    constructor(x, y, r, col, speed) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.speed = speed;
      this.colour = (col.r, col.b, col.g);
    };
    move() {
        this.x = this.x + this.speed * random(0,circleDirectionX);
        this.y = this.y + this.speed * random(0,circleDirectionY);
        // checking that ball is actually coliding correctly
        if (this.x > width - ballDia) {
            circleDirectionX *= -1;
            this.x = width - ballDia;
          }else if(this.x < ballDia){
                circleDirectionX *= -1;
                this.x = ballDia;
          }
        if (this.y > height - ballDia) {
            circleDirectionY *= -1;
            this.y = height - ballDia;
        }else if(this.y < ballDia){
                circleDirectionY *= -1;
                this.y = ballDia;
          }
    };
    clicked(px, py) {
      let d = dist(px, py, this.x, this.y);
      // why does this fix it? please follow up with mr g.
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
      ellipseMode(RADIUS)
    }
  }