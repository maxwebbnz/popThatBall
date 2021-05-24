/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
/**========================================================================
 *                           Game Data Module
 *========================================================================**/

let fb_gameData = {
    fetch: function(_uid) {
        if (game == popThatBall) {
            let scorePath = firebase.database().ref("scores/" + _uid + '/popThatBall')
                // fetch hits
            scorePath.get().then(function(snapshot) {
                hits = snapshot.child("hits").val();
                let clHitsHTML = document.getElementById("p_hits");
                clHitsHTML.innerHTML = hits;

            }).catch(function(error) {
                debug.handler("fb_gameData (fetch) | Error fetching data, error code" + error, "error");
            });
            // fetch misses
            scorePath.get().then(function(snapshot) {
                misses = snapshot.child("misses").val();
                let clMissesHTML = document.getElementById("p_misses");
                clMissesHTML.innerHTML = misses;

            }).catch(function(error) {
                debug.handler("fb_gameData (fetch) | Error fetching data, error code" + error, "error");
            });
            scorePath.get().then(function(snapshot) {
                client.score = snapshot.child("score").val();
                // fix for data taking to long to read from fb, solution is below:
                let clScoreHTML = document.getElementById("p_score");
                clScoreHTML.innerHTML = client.score;

            }).catch(function(error) {
                debug.handler("fb_gameData (fetch) | Error fetching data, error code" + error, "error");
            });
            scorePath.get().then(function(snapshot) {
                client.highScore = snapshot.child("highScore").val();
                // fix for data taking to long to read from fb, solution is below:
                let clHighScoreHTML = document.getElementById("p_highscore");
                clHighScoreHTML.innerHTML = client.highScore;

            }).catch(function(error) {
                debug.handler("fb_gameData (fetch) | Error fetching data, error code" + error, "error");
            });
        }
    },
    init: function(_uid) {
        if (game == popThatBall) {
            let scorePath = firebase.database().ref("scores/" + _uid + '/popThatBall/')
            scorePath.update({
                hits: 0,
                misses: 0,
                score: 0,
                highScore: 0
            }, (error) => {
                if (error) {
                    debug.handler("fb_gameData (init) | Error: " + error, 'warn')
                    alert.error("We couldn't save some data, Error:" + error)
                } else {
                    debug.handler("fb_gameData (init) | Set up users score", 'info')
                }
            });
            hits = 0
            misses = 0
            score = 0
        }
    }
}