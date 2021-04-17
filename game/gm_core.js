/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */

let levelnum = "";
// need to check if game is stopped or started for gm_gameHandler function
let gameStopped = false;
let gameStarted = false;
let sideNavWidth = 400
let frmRate = 60;
let levelModuleTimerRate = 1000;
let timerInterval;
/**========================================================================
 *                           Core Module
 *========================================================================**/
let core = {
    /**========================================================================
     **                           Start
     *?   Handles starting the game
     *@param name type  
     *@param Balls array  
     *@param levelModule module  
     *@return n/a
     *========================================================================**/
    start: function() {
        $('.landingPrompt').fadeOut();
        debug.handler("core.start | Starting Game", 'info')
        Balls.length = 0;
        // start level 1 by calling gm_levelchagne() and passing the value of 1 to define level 1
        levelModule.levelChange(client.currentLevel, true);
        // start ball listener to listen to events 
    },
    /**========================================================================
     **                           Generate Balls
     *?   Generates balls before showing them later on
     *@param name type  
     *@param x int/float  
     *@param y int/float  
     *@param r int/float  
     *@param c array  
     *@param x class  
     *@return n/a
     *========================================================================**/
    generateBalls: function(_amount) {
        for (let i = 0; i < _amount; i++) {
            let x = width / 2;
            let y = height / 2;
            let r = 50;
            let c = [random(0, 255), random(0, 255), random(0, 255)]
            let b = new Ball(x, y, r, c)
            Balls.push(b)
        }
    },
    /**========================================================================
     **                           Show Balls
     *?   Displays balls after being generated
     *@param name type  
     *@param Balls array  
     *@return n/a
     *========================================================================**/
    showBalls: function() {
        for (let i = 0; i < Balls.length; i++) {
            Balls[i].move()
            Balls[i].show()
        }
    },
    /**========================================================================
     **                           Game Handler
     *?   Handling dication if the game has started or not, and changing the start/stop button 
     *? accordingly
     *@param name type  
     *@param gameStarted bool  
     *@param gameStopped bool  
     *@param userAction module  
     *@return n/a
     *========================================================================**/
    gameHandler: function() {
        // if the game hasn't started
        if (authStatus) {
            if (!gameStarted) {
                // start the game
                this.start();
                // change the variable
                gameStarted = true;
                // log
                debug.handler("gm_gameHandler | Starting Game due to game needing starting", 'info')
                    // else if the game has started
            } else if (gameStarted) {
                // set gameStopped to true
                gameStopped = true;
                // reset gameStarted variable
                gameStarted = false;
                // stop the game
                userAction.stop()
                    // logp
                debug.handler("gm_gameHandler | Stopping Game", 'info')
            }
        } else {
            alert.warn("You can't start the game without being logged in")
        }
    }
}

/**========================================================================
 **                           Setup
 *?   p5.js lib uses this to do all the stuff that needs to be
 *? only ran once.
 *@param name type  
 *@param canvas p5 module variable  
 *@param core module 
 *@param sound module 
 *@param levelModule module 
 *@return n/a
 *========================================================================**/
function setup() {
    $("#registrationModule").hide();
    // on page load configure firebase
    fb_init()
    frameRate(6)
        // make the canvas not go under/over the navbar (400 is the width of the navbar)
    canvas = createCanvas(viewPortWidth - 400, viewPortHeight)
    canvas.parent("#canvas")
    canvas.position(0, 0)
    canvas.style('z-index', '-1')
    $(".landingPrompt").fadeIn()
    core.generateBalls();
    canvas.mouseOut(mouseIsOffCanvas)
    canvas.mouseOver(mouseIsOnCanvas)
    canvas.mouseClicked(userAction.mouseClickedOnCanvas)
        // load sound config
    sound.init()
    timerInterval = setInterval(levelModule.timer, levelModuleTimerRate);
    // being able to use gm_messageHandler as a timer
    landingPage.show();
}

/**========================================================================
 **                           Draw
 *?   p5.js lib uses this to do things at a interval (processing made it 60s)
 *@param name type  
 *@param core module  
 *@param check bool  
 *@param levelModule module  
 *@return n/a
 *========================================================================**/
function draw() {
    background(100)
    core.showBalls();
    fill(255);
    // needs to be checked everytime draw is ran.
    html_game.gameStateHandler();
    if (check) {
        levelModule.handler();
    }
    if (adminOpen) {
        adminUI.tableRowClickListener();
    }

}

/**========================================================================
 **                           Mouse is Off Canvas
 *?  This function is used to listen for CANVAS and mouse movements, it handles 'stopping the game
 *@param name type  
 *@return n.a
 *========================================================================**/
function mouseIsOffCanvas() {
    // change framerate
    frameRate(1)
    if (gameStarted) {
        $(".alert").fadeIn()
    }
}
/**========================================================================
 **                           Mouse is On Canvas
 *?  This function is used to listen for CANVAS and mouse movements, it handles 'starting the game
 *@param name type  
 *@return n.a
 *========================================================================**/
function mouseIsOnCanvas() {
    frameRate(60)
    $(".alert").fadeOut()

}

function windowResized() {
    resizeCanvas(windowWidth - 400, windowHeight);
}

/**========================================================================
 **                           landing page handler
 *?  Generates balls for effect during landing page displayment,
 *@param name type  
 *@param name type  
 *@return type
 *========================================================================**/