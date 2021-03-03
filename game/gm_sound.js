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

function gm_soundInit(){
    soundFormats("mp3", "wav");
    popSound = loadSound("assets/sounds/popsound")
    clockTick = loadSound("assets/sounds/clockTick")
    failSound = loadSound("assets/sounds/failSound")
}

// sound player handler
// parse through sound effect name and whether or not the function needs to play or stop
function gm_playEffect(_soundEffect, _play){
    // if sound needs playing
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