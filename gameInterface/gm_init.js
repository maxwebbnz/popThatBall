/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */

// let viewPortHeight = $(window).height()
// let viewPortWidth = $(window).width()
// let canvas;
// let Balls = [];
messages = "";
let levelnum = "";
// let timer;
// let check = false;

// start p5 with setup()
    function setup(){
        // if you are in inspect you will need to reload page, don't see work around for now!
        canvas = createCanvas(viewPortWidth, viewPortHeight)
        canvas.position(0, 0)
        canvas.style('z-index', '-1')
        // frameRate(10)
        // frameRate(1);
        // only needs to be called once
        $(".landingPrompt").fadeIn()
        gm_generateBalls(); 
        // appened html
        html_append();
        setInterval(gm_timer, 1000);
    }
// call draw()
    function draw(){
        background(100)
        gm_activateBalls();
        textAlign(CENTER, CENTER);
        textSize(30);
        fill(255);
        text(messages, width/2, height-140)
        text(levelnum, width/2, height-140)
        text(score, width/2, height-40)
        // text(miss, width/2, height-140)
        if(check){
            gm_levelHandler();
        }
    }


// start Game
    function gm_start(){
        $('.landingPrompt').fadeOut();
        console.log("gm_start | Starting Game")
        Balls.length = 0;
        // start level 1 by calling gm_levelchagne() and passing the value of 1 to define level 1
        gm_levelchange(1,true);
       // start ball listener to listen to events 
    }
// generate balls

    function gm_generateBalls(_amount){
        for (let i = 0; i < _amount; i++) {
            let x = width/2;
            let y = height/2;
            let r = 50;
            let c = [ random(0,255),  random(0,255),  random(0,255)]
            let b = new Ball(x, y, r, c)
            Balls.push(b)
          }
          console.table(Balls)
    }

    // now move and show them

    function gm_activateBalls(){
        for (let i = 0; i < Balls.length; i++) {

            Balls[i].move()
            Balls[i].show()
          }
    }
    
