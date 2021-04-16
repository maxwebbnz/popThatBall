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
    score: function(_id, _valInput1, _valInput2, _valInput3) {
        firebase.database().ref('users/' + _id + "/").update({
            hits: _valInput1,
            misses: _valInput2,
            score: _valInput3,
        }, (error) => {
            if (error) {
                debug.handler("fb_store (hits) | Error: " + error, 'warn')
                alert.error("We couldn't save some data, Error:" + error)
            } else {
                debug.handler("fb_store (hits) | Stored data for " + _id + " with the value of " + _valInput1 + " " + _valInput2, 'info')
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
                debug.handler("fb_store (highScore) | Error: " + error, error)
                alert.error("We couldn't save some data, Error:" + error)
            } else {
                debug.handler("fb_store (highScore) | Stored data for " + _id + " with the value of " + _valInput, 'info')

            }
        });
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
                debug.handler("fb_store (level) | Error: " + error, 'error')
                alert.error("We couldn't save some data, Error:" + error)
            } else {
                debug.handler("fb_store (level) | Stored data for " + _id + " with the value of " + _valInput, 'info')

            }
        });
    },
    /**========================================================================
     **                           Reset User Game Data
     *?  Handles the resetting and storing of new game data for clients
     *@param uid unique identifer  
     *@return n/a
     *========================================================================**/
    resetUserData: function(_id) {
        debug.handler('fb_store.resetUserData | Resetting ' + _id + "'s game data")
        firebase.database().ref('users/' + _id + "/").update({
            currentLevel: 1,
            score: 0,
            hits: 0,
            misses: 0,
        }, (error) => {
            if (error) {
                debug.handler("fb_store.resetUserData | Error: " + error, 'error')
                alert.error("We couldn't reset some of your data :(, Error:" + error)
            } else {
                debug.handler("fb_store (fb_store.resetUserData) | Reset data for " + _id)

            }
        });
    }
}