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
            speed: 5,
        },
        {
            identifer: 2,
            balls: 3,
            speed: 6,
        },
        {
            identifer: 3,
            balls: 4,
            speed: 7,
        },
        {
            identifer: 4,
            balls: 6,
            speed: 9,
        },
        {
            identifer: 5,
            balls: 6,
            speed: 9,
        },
        {
            identifer: 6,
            balls: 7,
            speed: 10,
        },
        {
            identifer: 7,
            balls: 8,
            speed: 11,
        },
        {
            identifer: 8,
            balls: 9,
            speed: 12,
        },
        {
            identifer: 9,
            balls: 10,
            speed: 13,
        },
        {
            identifer: 10,
            balls: 20,
            speed: 14,
        },
    
    ]