/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */

/**========================================================================
 *                           Ball Class 
 *========================================================================**/
let velRange = [-10, -9, -8, -7, -6, 6, 7, 8, 9, 10]
let flag = false;
let misses = 0;
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
    /**========================================================================
     **                           Move Function
     *?   This moves the balls and handles basic collions with canvas
     *@param name type  
     *@param this.x int/float
     *@param this.y int/float
     *@param width int/float
     *@param height int/float
     *@param this.speedX int/float
     *@param this.speedY int/float
     *@return n/a
     *========================================================================**/
    move() {
        if (!this.paused) {
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
    /**========================================================================
     **                           Pause Balls
     *?   Pauses Balls incase of needing to pause game
     *@param name type  
     *@param this.paused bool
     *@param this.x float/int
     *@param this.y float/int
     *@return n/a
     *========================================================================**/
    pauseBalls() {
            this.paused = true;
            this.x = this.x
            this.y = this.y
        }
        /**========================================================================
         **                           Clicked
         *?   Checks if the ball has been clicked by the mouse
         *@param name type  
         *@param _px int/float  
         *@param _py int/float  
         *@param this.x int/float  
         *@param this.y int/float  
         *@param this.r int/float  
         *@return bool
         *========================================================================**/
    clicked(_px, _py) {
        // calculate the distance between mouse and ball
        let d = dist(_px, _py, this.x, this.y);
        // if the distance to the ball is less than the ball rad
        if (d < this.r) {
            // yes
            return true;
        } else {
            return false
        }
    };
    /**========================================================================
     **                           Show
     *?   Shows the balls once they have been made
     *@param name type  
     *@param this.x int/float  
     *@param this.y int/float  
     *@param this.r int/float  
     *@return n/a
     *========================================================================**/
    show() {
        stroke(0, 255, 0)
        fill(this.colour)
        ellipse(this.x, this.y, this.r * 2)
    }
}