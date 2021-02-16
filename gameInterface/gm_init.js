/*
 * Copyright (c) 2021 Max Webb 
 * All rights reserved.
 */

let viewPortHeight = $(window).height()
let viewPortWidth = $(window).width()
let canvas;
let Balls = [];
let messages = "";

// start p5 with setup()
    function setup(){
        
        // if you are in inspect you will need to reload page, don't see work around for now!
        canvas = createCanvas(viewPortWidth, viewPortHeight)
        canvas.position(0, 0)
        canvas.style('z-index', '-1')
        // only needs to be called once
        $(".landingPrompt").fadeIn()
        gm_generateBalls();
    }
// call draw()
    function draw(){
        background(100)
        gm_activateBalls();
        textAlign(CENTER, CENTER);
        textSize(30);
        fill(255);
        text(messages, width/2, height-40)
        text(score, width/2, height-40)
    }


// start Game
    function gm_start(){
        $('.landingPrompt').fadeOut();
        console.log("gm_start | Starting Game")
        Balls.length = 0;
        // start level 1 by calling gm_levelchagne() and passing the value of 1 to define level 1
        gm_levelchange(1);
    }
// generate balls

    function gm_generateBalls(_amount, _speed){
        for (let i = 0; i < _amount; i++) {
            let x = random(0, width)
            let y = random(0, height)
            let r = 20
            let s = _speed
            let c = {r: random(0,125), g: random(0,125), b: random(0,12)}
            let b = new Ball(x, y, r, c, s)
            Balls.push(b)
            console.log(Balls)
          }
    }

    // now move and show them

    function gm_activateBalls(){
        for (let i = 0; i < Balls.length; i++) {
            Balls[i].move()
            Balls[i].show()
          }
    }
    