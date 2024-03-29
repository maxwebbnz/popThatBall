/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */



/**========================================================================
 **                           Mouse Pressed
 *?   p5.js lib event function runs when mouse is pressed
 *@param name type  
 *@param check bool  
 *@param Balls module  
 *@param sound module  
 *@param scoreModule module  
 *@return n/a
 *========================================================================**/
function mousePressed() {

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
     *@return n/a
     *========================================================================**/
    stop: function() {
        check = false
        timerVal = 0;
        Balls.length = 0;
        fb_store.level(client.uid, level)
    },
    mouseClickedOnCanvas: function() {
        if (gameStarted) {
            let hitBall = false;
            for (let i = Balls.length - 1; i >= 0; i--) {
                check = true;
                if (Balls[i].clicked(mouseX, mouseY)) {
                    Balls.splice(i, 1);
                    sound.play(popSound, true)
                    scoreModule.handler("add");
                    hitBall = true;
                }

            }
            if (!hitBall) {
                scoreModule.handler("missed")
                    // misses = misses + 1
            }
        }
    }
}