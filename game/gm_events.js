/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
/**========================================================================
 **                            Events Module
 *========================================================================**/

let events = {
    /**========================================================================
     **                           Mouse Events
     *?  Listens for a range of mouse events that happen throughout the game
     *@param name type  
     *@param _listen string  
     *@return n/a
     *========================================================================**/
    canvas: function(_listen) {
        if (_listen = "mouseOut") {
            frameRate(1)
        }
        if (_listen = "mouseIn") {
            frameRate(60)
        }
    }
}