/*
 * Copyright (c) 2021 Max Webb 
 * All rights reserved.
 */
// tooltips to help user learn the game
var timer = 10;
// tool tip messages
let message1 = "Hello Max, welcome to popThatBall!";
let message2 = "Max, to get a point, go ahead and pop that bubble on your screen!"
let message3 = "Awesome going Max, you've earned your self a point!"
let message4 = "To complete the level, pop all the balls before the timer runs out!"

function gm_tooltips(_state){
    if(_state == 1){
        console.log("gm_tooltips | Parsed through value 1")
        // counter--;
        // console.log(counter)
        if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
            timer --;
          }
          if (timer == 0) {
            console.log("je;;p")
        }
        // if(counter > 1){
        //     messages = message1
        // }else if(counter < 1){
        //     messages = message2
        // }
    }
}