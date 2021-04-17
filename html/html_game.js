/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
/**========================================================================
 *                           HTML Game Module
 *========================================================================**/

/**
 *  Why have this module?
 *  1) It keeps with the idealogy of my file directory
 *  2) It keeps HTML code away from the game content
 *  3) It is tidy and can be easily 'objectived'
 *  
 *  
 *  
 *  MW
 **/

let html_game = {
    /**========================================================================
     **                           Update HTML 
     *?  This updates all HTML components that have relevance to the user and the game
     *@param name type  
     *@param cl.... a DOM reference to the HTML document.  
     *@return type
     *========================================================================**/
    update: function() {
        let clNameHTML = document.getElementById("p_name");
        let clHitsHTML = document.getElementById("p_hits");
        let clMissesHTML = document.getElementById("p_misses");
        let clScoreHTML = document.getElementById("p_score");
        let clHighScoreHTML = document.getElementById("p_highscore");
        let clAvatar = document.getElementById("p_avatar");
        let clLevel = document.getElementById("g_level");
        clNameHTML.innerHTML = client.name;
        clHitsHTML.innerHTML = client.hits;
        clMissesHTML.innerHTML = client.misses;
        // double check rounding errors that may of been made upon storage to firebase/
        clScoreHTML.innerHTML = Math.round((client.score + Number.EPSILON) * 100) / 100;
        clHighScoreHTML.innerHTML = client.highScore;
        clAvatar.src = client.profileURL;
        clLevel.innerHTML = client.currentLevel;
    },
    /**========================================================================
     **                           Game State Manager/Handler
     *?  Handles the UI component for the Start/Stop button inside the navigation
     *@param _gameStateHTML a DOM reference to the HTMl document  
     *@return n/a
     *========================================================================**/
    gameStateHandler: function(_gameStateHTML) {
        let gameStateHTML = document.getElementById("g_status")
        if (Balls.length != 0) {
            gameStateHTML.innerHTML = "Stop"
        } else {
            gameStateHTML.innerHTML = "Start"
        }
    },
}