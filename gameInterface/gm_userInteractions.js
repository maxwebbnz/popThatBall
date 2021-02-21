/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */


// what happens when the mouse is pressed on the ball?


function mousePressed() {
  for (let i = Balls.length - 1; i >= 0; i--) {
    check = true;
    if (Balls[i].clicked(mouseX, mouseY)) {
      Balls.splice(i, 1);
      score = score + 1;
      if (score > client.highScore) {
        // update html values.
        client.highScore = score;
        html_append()
        // display a message
        messages = "New high score!"
      }
    }
  }
}


// ball listener can go in here due to it reacting on what is happening inside the game;

// level changer to enable the game to change levels after the user pushes the space button.

// this seems to work but is this really efficent?
function gm_levelHandler() {
  if (Balls.length < 1) {
    check = false;
    gm_levelchange(0, false)
  }
}