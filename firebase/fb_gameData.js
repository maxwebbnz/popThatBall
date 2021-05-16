/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
/**========================================================================
 *                           Game Data Module
 *========================================================================**/

let fb_gameData = {
    fetch: function(_uid) {
        console.log()
        if (game == popThatBall) {
            let scorePath = firebase.database().ref("scores/" + _uid + '/popThatBall')
                // fetch hits
            scorePath.get().then(function(snapshot) {
                hits = snapshot.child("hits").val();

            }).catch(function(error) {
                debug.handler("fb_gameData (fetch) | Error fetching data, error code" + error, "error");
            });
            // fetch misses
            scorePath.get().then(function(snapshot) {
                misses = snapshot.child("misses").val();

            }).catch(function(error) {
                debug.handler("fb_gameData (fetch) | Error fetching data, error code" + error, "error");
            });
            scorePath.get().then(function(snapshot) {
                client.score = snapshot.child("score").val();

            }).catch(function(error) {
                debug.handler("fb_gameData (fetch) | Error fetching data, error code" + error, "error");
            });
        }
    },
    init: function(_uid) {
        console.log(_uid)
        if (game == popThatBall) {
            console.log(_uid)
            let scorePath = firebase.database().ref("scores/" + _uid + '/popThatBall/')
            scorePath.update({
                hits: 0,
                misses: 0,
                score: 0,
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