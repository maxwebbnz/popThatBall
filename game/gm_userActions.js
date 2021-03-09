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
      sound.play(popSound, true)
      scoreModule.handler("add");
    }
  }
}


// ball listener can go in here due to it reacting on what is happening inside the game;

// level changer to enable the game to change levels after the user pushes the space button.

// this seems to work but is this really efficent?

let userAction = {
  stop: function(){
    check = false
    timerVal = 0;
    messages = "Game Stopped!";
    Balls.length = 0;
    fb_store.level(client.uid, level)
  },
}
