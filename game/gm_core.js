/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */

let levelnum = "";
// need to check if game is stopped or started for gm_gameHandler function
let gameStopped = false;
let gameStarted = false;

let core = {
    start: function(){
        $('.landingPrompt').fadeOut();
        console.log("core.start | Starting Game")
        Balls.length = 0;
        // start level 1 by calling gm_levelchagne() and passing the value of 1 to define level 1
        levelModule.levelChange(client.currentLevel,true);
       // start ball listener to listen to events 
    },
    generateBalls: function(_amount){
        for (let i = 0; i < _amount; i++) {
            let x = width/2;
            let y = height/2;
            let r = 50;
            let c = [ random(0,255),  random(0,255),  random(0,255)]
            let b = new Ball(x, y, r, c)
            Balls.push(b)
          }
    },
    showBalls: function(){
        for (let i = 0; i < Balls.length; i++) {

            Balls[i].move()
            Balls[i].show()
          }
    },
    gameHandler: function(){
             // if the game hasn't started
             if(!gameStarted){
                // start the game
                this.start();
                // change the variable
                gameStarted = true;
                // log
                console.log("gm_gameHandler | Starting Game due to game needing starting")
            // else if the game has started
            }else if(gameStarted){
                // set gameStopped to true
                gameStopped = true;
                // reset gameStarted variable
                gameStarted = false;
                // stop the game
                userAction.stop()
                // logp
                console.log("gm_gameHandler | Stopping Game")
            }
    }
}

// start p5 with setup()
    function setup(){
        // on page load configure firebase
        fb_init()
        // make the canvas not go under/over the navbar (400 is the width of the navbar)
        canvas = createCanvas(viewPortWidth - 400, viewPortHeight)
        canvas.position(0, 0)
        canvas.style('z-index', '-1')
        $(".landingPrompt").fadeIn()
        core.generateBalls(); 
        // load sound config
        sound.init()
        setInterval(levelModule.timer, 1000);
        // being able to use gm_messageHandler as a timer
    }
// call draw()
    function draw(){
        background(100)
        core.showBalls();
        textAlign(CENTER, CENTER);
        textSize(30);
        fill(255);
        // needs to be checked everytime draw is ran.
        html_updateGameState();
        if(check){
            levelModule.handler();
        }
    }

