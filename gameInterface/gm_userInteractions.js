/*
 * Copyright (c) 2021 Max Webb 
 * All rights reserved.
 */
// this doesn't need to be sorted now, as I am just developing the userInteraction with the actual game.
    // // tooltips to help user learn the game
    // var timer = 10;
    // // tool tip messages
    // let message1 = "Hello Max, welcome to popThatBall!";
    // let message2 = "Max, to get a point, go ahead and pop that bubble on your screen!"
    // let message3 = "Awesome going Max, you've earned your self a point!"
    // let message4 = "To complete the level, pop all the balls before the timer runs out!"

    // function gm_tooltips(_state){
    //     if(_state == 1){
    //         console.log("gm_tooltips | Parsed through value of ")
    //         // counter--;
    //         // console.log(counter)
    //         if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    //             timer --;
    //           }
    //           if (timer == 0) {
    //             console.log("je;;p")
    //         }
    //         // if(counter > 1){
    //         //     messages = message1
    //         // }else if(counter < 1){
    //         //     messages = message2
    //         // }
    //     }
    // }

// what happens when the mouse is pressed on the ball?

function gm_mousepressed(){

}

function mousePressed() {
    for (let i = Balls.length - 1; i >= 0; i--) {
      if (Balls[i].clicked(mouseX, mouseY)) {
        Balls.splice(i, 1);
      }
    }
  }