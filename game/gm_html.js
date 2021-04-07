/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */


let editorInputs;
let editorOpen = false;


/**================================================================================================
 *                                         Validation Module
 *================================================================================================**/
let validate = {
    /**========================================================================
     **                           Text Validation
     *?   Checks a string with the textRegex and tests it
     *@param name type  
     *@param textReg regex  
     *@param _str string  
     *@return bool
     *========================================================================**/
    text: function(_str) {
        if (textReg.test(_str)) {
            // If string parsed through matches the nameReg-ex
            return true
                // return true
        } else {
            // else if it does not match
            return false
                // return false
        }
    },
    /**========================================================================
     **                           Name Vaildation
     *?   Checks a string with the nameRegex and tests it
     *@param name type  
     *@param name type  
     *@return type
     *========================================================================**/
    nameSpecfic: function(str) {
        if (nameReg.test(str)) {
            // If string parsed through matches the nameReg-ex
            return true
                // return true
        } else {
            // else if it does not match
            return false
                // return false    
        }
    },
    /*
  Function Name: num
  Purpose: Vaildating numeric input
  */
    num: function(str) {
        // Num vaildation
        if (numReg.test(str)) {
            // If string parsed through matches the numReg-ex
            return true
                // return true
        } else {
            // else if does not match
            return false
                // return false
        }
    },
    /*
  Function Name: email
  Purpose: Vaildating email input
  */
    email: function(str) {
        if (emailReg.test(str)) {
            return true;
        } else {
            return false
        }
    }
}

function html_append() {
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
    clScoreHTML.innerHTML = Math.round((client.score + Number.EPSILON) * 100) / 100;
    clHighScoreHTML.innerHTML = client.highScore;
    clAvatar.src = client.profileURL;
    clLevel.innerHTML = client.currentLevel;
}

function html_updateGameState() {
    let gameStateHTML = document.getElementById("g_status")
    if (Balls.length != 0) {
        gameStateHTML.innerHTML = "Stop"
    } else {
        gameStateHTML.innerHTML = "Start"
    }

}