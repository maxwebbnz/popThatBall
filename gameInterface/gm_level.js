/*
 * Copyright (c) 2021 Max Webb 
 * All rights reserved.
 */
// this module needs a handler to change levels
    // the character of # will cause issues, num is fine for now.
function gm_levelchange(_lvlnum){
    if(_lvlnum == 1) {
        // start level with the identifier of 1, create 2 balls with the intensity with 5%
        gm_level(1, 2, 2)
        // gm_tooltips(1);
    }
}

function gm_level(_levelidentifier, _ballnum, _ballint){
    console.log(_levelidentifier, _ballnum, _ballint);  
    // generate balls with info provided
    gm_generateBalls(_ballnum, _ballint, _ballint)

}