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
// User Variables
// Base user score
let score = 0;
// Base high score
let highScore = 0;
// Level Array
const levels = [{
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

// regex's 
const textReg = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
// numReg only passes numbers, nothing else + characters
const numReg = /^\d+$/;
// designed to check for emails
const emailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
// this checks for white space, and a proper email address!
const nameReg = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;