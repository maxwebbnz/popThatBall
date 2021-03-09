/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */


let editorInputs;
let editorOpen = false;



let validate = {
    text: function (str) {
      if (textReg.test(str)) {
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
  Function Name: nameSpecfc
  Purpose: Vaildating name input
  */
    nameSpecfic: function (str) {
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
    num: function (str) {
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
    email: function (str) {
      if (emailReg.test(str)) {
        return true;
      } else {
        return false
      }
    }
  }
  
function html_append(){
    let clNameHTML = document.getElementById("clientName");
    let clScoreHTML = document.getElementById("scoreHTML");
    let clHighScoreHTML = document.getElementById("highScoreHTML");
    let clAvatar = document.getElementById("clientAvatar");
    let clLevel = document.getElementById("levelHTML");
    clNameHTML.innerHTML = client.name;
    clScoreHTML.innerHTML = client.score;
    clHighScoreHTML.innerHTML = client.highScore;
    clAvatar.src = client.profileURL;
    clLevel.innerHTML = client.currentLevel;
}

function html_updateGameState(){
    let gameStateHTML = document.getElementById("gameStatus-HTML")
    if(Balls.length != 0){
        gameStateHTML.innerHTML = "Stop"
    }else{
        gameStateHTML.innerHTML = "Start"
    }
    
} 
