/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */

// let flagged = false;
// let misses = 0
let missed = false;

/**========================================================================
 **                           Mouse Pressed
 *?   p5.js lib event function runs when mouse is pressed
 *@param name type  
 *@param check bool  
 *@param Balls module  
 *@param sound module  
 *@param scoreModule module  
 *@return type
 *========================================================================**/
function mousePressed() {
    for (let i = Balls.length - 1; i >= 0; i--) {
        check = true;
        if (Balls[i].clicked(mouseX, mouseY)) {
            Balls.splice(i, 1);
            sound.play(popSound, true)
            scoreModule.handler("add");
        } else if (!Balls[i].clicked(mouseX, mouseY)) {
            missed = true;
        }
    }
    if (missed == true) {
        console.log("missed ball")
        missed = false;
    }
}


/**================================================================================================
 *                                         User Action Module
 *================================================================================================**/
let userAction = {
    /**========================================================================
     **                           Stop 
     *?   Stops the Game upon user action
     *@param name type  
     *@param check bool  
     *@param timerVal int  
     *@param Balls array
     *@param fb_store firebase module 
     *@return type
     *========================================================================**/
    stop: function() {
        check = false
        timerVal = 0;
        Balls.length = 0;
        fb_store.level(client.uid, level)
    },
}