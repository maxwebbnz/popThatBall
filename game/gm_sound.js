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

/**========================================================================
 *                           Sound Module
 *  For playing all things sound!
 *========================================================================**/
let sound = {
    /**========================================================================
     **                           Init 
     *?  This function setups all sound formats and files used in the game
     *@param name type  
     *@param popSound p5js sound file
     *@param clockTick p5js sound file
     *@param failSound p5js sound file
     *@return n/a
     *========================================================================**/
    init: function() {
        soundFormats("mp3", "wav");
        popSound = loadSound("assets/sounds/popsound")
        clockTick = loadSound("assets/sounds/clockTick")
        failSound = loadSound("assets/sounds/failSound")
    },
    /**========================================================================
     **                           Play
     *?  Handles playing sounds in the game
     *@param name type  
     *@param _soundEffect input  
     *@param _play bool  
     *@return type
     *========================================================================**/
    play: function(_soundEffect, _play) {
        if (_play) {
            // play sound effect
            _soundEffect.play();
            // log effet
            console.log("gm_playEffect | " + _soundEffect + " has been played")
                // else if sound needs stopping
        } else if (!_play) {
            // stop selected effect
            _soundEffect.stop();
        }
    }
}