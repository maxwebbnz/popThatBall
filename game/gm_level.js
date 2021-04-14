/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
// this module needs a handler to change levels
// the character of # will cause issues, num is fine for now.

let level = 1;
let timerVal;
let timerHTML = document.getElementById("g_time")

let levelModule = {
    /**========================================================================
     **                           Level Change Handler
     *? Handles changing the level inside the game and running storing commands
     *@param _lvlnum the level number that the program needs to change too  
     *@param _lvlset a bool to indicate if the program wants to change the level 
     *@return type
     *========================================================================**/
    levelChange: function(_lvlnum, _lvlset) {
        if (!_lvlset) {
            level = level + 1
            client.currentLevel = level
            var lvl = levels[level - 1]
                // stop errors before they happen
            if (typeof lvl == 'undefined') {
                alert.gameFinished("You have completed the game! Well done, want to reset your progress")
            } else {
                var lvlIndentifer = lvl.identifer
                var lvlBallAmount = lvl.balls
                var lvlBallSpeed = lvl.velInt
                timerVal = lvl.timeLimit
                document.getElementById('g_level').innerHTML = lvlIndentifer
                sound.play(clockTick, false)
                scoreModule.handler("setToZero")
                debug.handler("gm_level | Changing to level #" + lvlIndentifer + " with an amount of balls of " + lvlBallAmount + " with the speed of " + lvlBallSpeed, 'info')
                if (client.highScore < highScore) {
                    fb_store.highScore(client.uid, highScore)
                }
                core.generateBalls(lvlBallAmount, lvlBallSpeed)
            }
        } else if (_lvlset) {
            var lvl = levels[_lvlnum - 1]
            var lvlIndentifer = lvl.identifer
            var lvlBallAmount = lvl.balls
            var lvlBallSpeed = lvl.velInt
            level = _lvlnum
            timerVal = lvl.timeLimit
            debug.handler("gm_level | Changing to level #" + lvlIndentifer + " with an amount of balls of " + lvlBallAmount + " with the speed of " + lvlBallSpeed, 'info')
            core.generateBalls(lvlBallAmount, lvlBallSpeed)
        }

    },
    /**========================================================================
     **                           Level Reset
     *?  Handles Reseting the level/game
     *@param name type  
     *@return n/a
     *========================================================================**/
    levelReset: function() {
        // remove balls before resetting
        if (authStatus) {
            Balls.length = 0
            sound.play(clockTick, false)
            scoreModule.handler("setToZero")
            this.levelChange(level, true)
        } else {
            alert.warn("You cannot restart a level without being authed!")
            debug.handler("levelModule.levelReset | Cannot restart a level without being authed!", 'warn')
        }

    },
    /**========================================================================
     **                           Timer 
     *?  Runs the timer and manages events once the counter gets to zero.
     *@param name type  
     *@param name type  
     *@return type
     *========================================================================**/
    timer: function() {
        if (timerVal > 0) {
            timerVal--;
            // !! THIS NEEDS IMPROVING
            document.getElementById("g_time").innerHTML = timerVal;
        }
        if (timerVal > 10) {
            messages = "Timer 0:" + timerVal;
        }
        if (timerVal == 5) {
            // play clocktick effect
            sound.play(clockTick, true)
        }
        if (timerVal < 10 && timerVal > 0) {
            messages = "Timer: " + timerVal;
        }
        if (timerVal == 0 && !gameStopped) {
            messages = "You couldn't beat the timer! Resetting level!"
                // play failsound
            sound.play(failSound, true)
                // stop clockTick effect
            sound.play(clockTick, false)
                // set score to 0
                // scoreModule.handler("setToZero")
            levelModule.levelReset()
        } else if (timerVal == 0 && gameStopped) {
            sound.play(clockTick, false)
        }
    },
    handler: function() {
        if (Balls.length < 1) {
            check = false;
            leaderBoard.storeLeaderBoardData(client.uid, { name: client.name, avatar: client.profileURL, hits: hits, misses: misses, score: score }, level)
            levelModule.levelChange(0, false)
        }
    }
}