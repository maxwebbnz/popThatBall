/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */

// Browser Related Variables:
    let viewPortHeight = $(window).height()
    let viewPortWidth = $(window).width()
// Game Variables:
    let canvas;
    // Balls set to an array
    let Balls = [];
    // Messages set to empty string
    let messages = "";
    // Empty timer
    let timer;
    // Check set to false
    let check = false;
    // Level Array
        const levels = [
        {
            identifer: 1,
            balls: 2,
            velInt: 0.5,
            timeLimit: 10,
        },
        {
            identifer: 2,
            balls: 3,
            velInt: 0.7,
            timeLimit: 10,
        },
        {
            identifer: 3,
            balls: 4,
            velInt: 0.8,
            timeLimit: 15,
        },
        {
            identifer: 4,
            balls: 6,
            velInt: 1,
            timeLimit: 15,
        },
        {
            identifer: 5,
            balls: 6,
            velInt: 1.1,
            timeLimit: 16,
        },
        {
            identifer: 6,
            balls: 7,
            velInt: 1.2,
            timeLimit: 17,
        },
        {
            identifer: 7,
            balls: 8,
            velInt: 1.6,
            timeLimit: 16,
        },
        {
            identifer: 8,
            balls: 9,
            velInt: 1.4,
            timeLimit: 17,
        },
        {
            identifer: 9,
            balls: 10,
            velInt: 1.8,
            timeLimit: 17,
        },
        {
            identifer: 10,
            balls: 20,
            velInt: 2,
            timeLimit: 25,
        },
    
    ]