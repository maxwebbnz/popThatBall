/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
let scoreModule = {
    handler: function(_action) {
        if (_action == "add") {
            score = score + 1;
            document.getElementById("scoreHTML").innerHTML = score;
            fb_store.score(client.uid, score)
            if (highScore < score) {
                highScore = score;
                document.getElementById("highScoreHTML").innerHTML = highScore;
            }

        }
        // creating a listener to listen to the score variable being updated:
        else if (_action == "setToZero") {
            score = 0;
            fb_store.score(client.uid, score)
            document.getElementById("scoreHTML").innerHTML = score;
        }
    }
}