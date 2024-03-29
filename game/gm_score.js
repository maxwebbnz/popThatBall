/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */

/**========================================================================
 *                           Score module
 *========================================================================**/
let scoreModule = {
    /**========================================================================
     **                           Score Handler
     *?  Handles ALL score functions, events and actions
     *@param _action method transleted by a string  
     *@return n/a
     *========================================================================**/
    handler: function(_action) {
        if (_action == "add") {
            hits = hits + 1;
            scoreNotRounded = hits - misses
            score = Math.round(scoreNotRounded)
            document.getElementById("p_hits").innerHTML = hits;
            document.getElementById("p_score").innerHTML = score;
            fb_store.score(client.uid, hits, misses, score)
            if (highScore < hits) {
                highScore = hits;
                document.getElementById("p_highscore").innerHTML = highScore;
            }
        }
        // creating a listener to listen to the score variable being updated:
        else if (_action == "setToZero") {
            hits = 0;
            misses = 0;
            // fb_store.score(client.uid, hits, misses)
            document.getElementById("p_hits").innerHTML = hits;
            document.getElementById("p_misses").innerHTML = misses;
        } else if (_action == "missed") {
            misses = misses + 1;
            document.getElementById("p_misses").innerHTML = misses;

        }
    }
}