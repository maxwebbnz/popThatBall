/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
// this module needs a handler to change levels
// the character of # will cause issues, num is fine for now.

let level = 1;
let timerVal;
let timerHTML = document.getElementById("timeHTMl")

let levelModule = {
    levelChange: function(_lvlnum, _lvlset) {
        if (!_lvlset) {
            level = level + 1
            client.currentLevel = level
            var lvl = levels[level - 1]
            var lvlIndentifer = lvl.identifer
            var lvlBallAmount = lvl.balls
            var lvlBallSpeed = lvl.speed
            timerVal = lvl.timeLimit
                // solution for now.
            document.getElementById('levelHTML').innerHTML = lvlIndentifer
            sound.play(clockTick, false)
            scoreModule.handler("setToZero")
            console.log("gm_level | Changing to level #" + lvlIndentifer + " with an amount of balls of " + lvlBallAmount + " with the speed of " + lvlBallSpeed)
            if (client.highScore < highScore) {
                fb_store.highScore(client.uid, highScore)
            }
            core.generateBalls(lvlBallAmount, lvlBallSpeed)
        } else if (_lvlset) {
            var lvl = levels[_lvlnum - 1]
            console.log(lvl)
            var lvlIndentifer = lvl.identifer
                // scoreModule.handler("setToZero")
            var lvlBallAmount = lvl.balls
            var lvlBallSpeed = lvl.velInt
            level = _lvlnum
            timerVal = lvl.timeLimit
            console.log("gm_level | Changing to level #" + lvlIndentifer + " with an amount of balls of " + lvlBallAmount + " with the speed of " + lvlBallSpeed)
            core.generateBalls(lvlBallAmount, lvlBallSpeed)
        }

    },
    levelReset: function() {
        // remove balls before resetting
        if (authStatus) {
            Balls.length = 0
            sound.play(clockTick, false)
            scoreModule.handler("setToZero")
            this.levelChange(level, true)
        } else {
            alert.warn("You cannot restart a level without being authed!")
            console.warn("levelModule.levelReset | Cannot restart a level without being authed!")
        }

    },
    timer: function() {
        if (timerVal > 0) {
            timerVal--;
            // ** THIS NEEDS IMPROVING
            document.getElementById("timeHTMl").innerHTML = timerVal;
            //   console.log(timerVal)
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