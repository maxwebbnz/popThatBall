/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
// this module needs a handler to change levels
    // the character of # will cause issues, num is fine for now.

let level = 0;

// lvl set is for when ethier the user needs to reset their level or the game needs to due to error or handling with issues.
function gm_levelchange(_lvlnum, _lvlset){
    if(!_lvlset){
        var lvl = levels[level + 1]
        level = level + 1
        var lvlIndentifer = lvl.identifer
        var lvlBallAmount = lvl.balls
        var lvlBallSpeed = lvl.speed
        console.log("gm_level | Changing to level #" + lvlIndentifer + " with an amount of balls of " + lvlBallAmount + " with the speed of " + lvlBallSpeed)
        gm_generateBalls(lvlBallAmount, lvlBallSpeed)
    }else if(_lvlset){
        var lvl = levels[_lvlnum - 1]
        var lvlIndentifer = lvl.identifer
        var lvlBallAmount = lvl.balls
        var lvlBallSpeed = lvl.velInt
        console.log("gm_level | Changing to level #" + lvlIndentifer + " with an amount of balls of " + lvlBallAmount + " with the speed of " + lvlBallSpeed)
        gm_generateBalls(lvlBallAmount, lvlBallSpeed)
    }
}

function gm_level(_levelidentifier, _ballnum, _ballint){
    // console.log(_levelidentifier, _ballnum, _ballint);  
    console.log("gm_level | Changing to level #" + _levelidentifier + " with an amount of balls of " + _ballnum + " with the speed of " + _ballint)
    // generate balls with info provided

}

function gm_levelReset(){
    // remove balls before resetting
    Balls.length = 0
    gm_levelchange(level, true)
}