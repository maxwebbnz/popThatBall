/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
// this module needs a handler to change levels
    // the character of # will cause issues, num is fine for now.

let level = 1;
let timerVal;
let timerHTML = document.getElementById("timeHTMl")

// lvl set is for when ethier the user needs to reset their level or the game needs to due to error or handling with issues.
function gm_levelchange(_lvlnum, _lvlset){
    if(!_lvlset){
        level = level + 1
        client.currentLevel = level
        var lvl = levels[level - 1]
        var lvlIndentifer = lvl.identifer
        var lvlBallAmount = lvl.balls
        var lvlBallSpeed = lvl.speed
        timerVal = lvl.timeLimit
        // solution for now.
        html_append();
        gm_playEffect(clockTick, false)
        console.log(timerVal)
        console.log("gm_level | Changing to level #" + lvlIndentifer + " with an amount of balls of " + lvlBallAmount + " with the speed of " + lvlBallSpeed)
        console.table(levels[level])
        gm_generateBalls(lvlBallAmount, lvlBallSpeed)
    }else if(_lvlset){
        var lvl = levels[_lvlnum - 1]
        console.log(lvl)
        var lvlIndentifer = lvl.identifer
        var lvlBallAmount = lvl.balls
        var lvlBallSpeed = lvl.velInt
        level = _lvlnum
        timerVal = lvl.timeLimit
        console.log("gm_level | Changing to level #" + lvlIndentifer + " with an amount of balls of " + lvlBallAmount + " with the speed of " + lvlBallSpeed)
        gm_generateBalls(lvlBallAmount, lvlBallSpeed)
    }
}


function gm_levelReset(){
    // remove balls before resetting
    Balls.length = 0
    gm_playEffect(clockTick, false)
    gm_levelchange(level, true)
}

// timer for handling level changes


function gm_timer() {
    if (timerVal > 0) {
      timerVal--;
      // ** THIS NEEDS IMPROVING
      document.getElementById("timeHTMl").innerHTML = timerVal;
    //   console.log(timerVal)
    }
    if (timerVal > 10) {
        messages = "Timer 0:" + timerVal;
      }
      if(timerVal == 5){
        // play clocktick effect
        gm_playEffect(clockTick, true)
      }
    if (timerVal < 10 && timerVal > 0) {
        messages = "Timer: " + timerVal;
      }
      if (timerVal == 0 && !gameStopped) {
        messages = "You couldn't beat the timer! Resetting level!"
        // play failsound
        gm_playEffect(failSound, true)
        // stop clockTick effect
        gm_playEffect(clockTick, false)
        // set score to 0
        gm_scoreHandler("setToZero")
        gm_levelReset()
      }else if(timerVal == 0 && gameStopped){
        gm_playEffect(clockTick, false)
      }
    }
