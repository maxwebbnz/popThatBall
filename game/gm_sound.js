/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
// Sound handling module

// base definitons for sound effects

let popSound;
let failSound;
let winSound;
let loadingSound;
let clockTick;

let sound = {
    init: function(){
        soundFormats("mp3", "wav");
        popSound = loadSound("assets/sounds/popsound")
        clockTick = loadSound("assets/sounds/clockTick")
        failSound = loadSound("assets/sounds/failSound")
    },
    play: function(_soundEffect, _play){
    if(_play){
        // play sound effect
        _soundEffect.play();
        // log effet
        console.log("gm_playEffect | " + _soundEffect + " has been played")
        // else if sound needs stopping
    } else if (!_play){
        // stop selected effect
        _soundEffect.stop();
    }
    }
}
