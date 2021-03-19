/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
let scoreModule = {
    handler: function(_action) {
        if (_action == "add") {
            hits = hits + 1;
            score = hits - misses
            document.getElementById("hitsHTML").innerHTML = hits;
            document.getElementById("scoreHTML").innerHTML = score;
            fb_store.score(client.uid, hits, misses)
            if (highScore < hits) {
                highScore = hits;
                document.getElementById("highScoreHTML").innerHTML = highScore;
            }

        }
        // creating a listener to listen to the score variable being updated:
        else if (_action == "setToZero") {
            hits = 0;
            misses = 0;
            // fb_store.score(client.uid, hits, misses)
            document.getElementById("hitsHTML").innerHTML = hits;
            document.getElementById("missesHTML").innerHTML = misses;
        } else if (_action == "missed") {
            misses = misses + 1;
            document.getElementById("missesHTML").innerHTML = misses;

        }
    }
}