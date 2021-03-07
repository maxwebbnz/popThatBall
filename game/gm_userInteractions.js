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
      gm_playEffect(popSound, true)
      gm_scoreHandler();
    }
  }
}


// ball listener can go in here due to it reacting on what is happening inside the game;

// level changer to enable the game to change levels after the user pushes the space button.

// this seems to work but is this really efficent?


function gm_stop(){
  check = false
  timerVal = 0;
  messages = "Game Stopped!";
  // set score to 0;
  score = 0;
  Balls.length = 0;
  // update score for user in records
  fb_store.score(client.uid, score)
}

// listening for ball collisons
function gm_levelHandler() {
  if (Balls.length < 1) {
    check = false;
    gm_levelchange(0, false)
  }
}

// score handler

function gm_scoreHandler(){
  score = score + 1;
  document.getElementById("scoreHTML").innerHTML = score;
  if(highScore < score){
    highScore = score;
  }
  if(client.highScore < highScore){
    fb_store.highScore(client.uid, highScore)
  }
}
