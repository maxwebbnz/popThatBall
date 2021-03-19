/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */


/**========================================================================
 *                           Firebase Storing Module
 *   For storing most game stuff to the database
 *========================================================================**/
let fb_store = {
    /**========================================================================
     **                           Score Storing
     *?  Stores score to database
     *@param name type  
     *@param _id path name
     *@param _valInput input
     *@param error callback
     *@return n/a
     *========================================================================**/
    score: function(_id, _valInput1, _valInput2) {
        // console.log(_id + _valInput)
        firebase.database().ref('users/' + _id + "/").update({
            hits: _valInput1,
            misses: _valInput2,
            score: _valInput1 / _valInput2,
        }, (error) => {
            if (error) {
                console.warn("fb_store (hits) | Error: " + error)
                alert.error("We couldn't save some data, Error:" + error)
            } else {
                console.log("fb_store (hits) | Stored data for " + _id + " with the value of " + _valInput1 + " " + _valInput2)
            }
        });
    },
    /**========================================================================
     **                           High Score Storing
     *?  Stores high score to database
     *@param name type  
     *@param _id path name
     *@param _valInput input
     *@param error callback
     *@return n/a
     *========================================================================**/
    highScore: function(_id, _valInput) {
        firebase.database().ref('users/' + _id + "/").update({
            highScore: _valInput,
        }, (error) => {
            if (error) {
                console.warn("fb_store (highScore) | Error: " + error)
                alert.error("We couldn't save some data, Error:" + error)
            } else {
                console.log("fb_store (highScore) | Stored data for " + _id + " with the value of " + _valInput)

            }
        });
        console.log("fb_store | Stored data for " + _id + " with the value of " + _valInput)
    },
    /**========================================================================
     **                           Level Storing
     *?  Stores users current level to database
     *@param name type  
     *@param _id path name
     *@param _valInput input
     *@param error callback
     *@return n/a
     *========================================================================**/
    level: function(_id, _valInput) {
        firebase.database().ref('users/' + _id + "/").update({
            currentLevel: _valInput,
        }, (error) => {
            if (error) {
                console.warn("fb_store (level) | Error: " + error)
                alert.error("We couldn't save some data, Error:" + error)
            } else {
                console.log("fb_store (level) | Stored data for " + _id + " with the value of " + _valInput)

            }
        });
    }
}