/*
 * Copyright (c) 2021 Max Webb 
 * All rights reserved.
 */

let viewPortHeight = $(window).height()
let viewPortWidth = $(window).width()
let canvas;
let Balls = [];

// start p5 with setup()
    function setup(){
        
        // if you are in inspect you will need to reload page, don't see work around for now!
        canvas = createCanvas(viewPortWidth, viewPortHeight)
        canvas.position(0, 0)
        canvas.style('z-index', '-1')
        // only needs to be called once
        $(".landingPrompt").fadeIn()
        gm_generateBalls();
        fb_init();
    }
// call draw()
    function draw(){
        background(100)
        gm_activateBalls();
    }


// start Game
    function gm_start(){
        $('.landingPrompt').fadeOut();
        console.log("gm_start | Starting Game")
        Balls.length = 0;
        $('#dashboard').fadeIn();
    }
// generate balls

    function gm_generateBalls(){
        for (let i = 0; i < 20; i++) {
            let x = random(0, width/2)
            let y = random(0, height-40)
            let r = 20
            let c = {r: random(0,125), g: random(0,125), b: random(0,12)}
            let b = new Ball(x, y, r, c)
            Balls.push(b)
          }
    }

    // now move and show them

    function gm_activateBalls(){
        for (let i = 0; i < Balls.length; i++) {
            Balls[i].move()
            Balls[i].show()
          }
    }