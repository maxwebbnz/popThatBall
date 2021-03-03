/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
function html_append(){
    return true
    // let clNameHTML = document.getElementById("clientName");
    // let clScoreHTML = document.getElementById("clientScore");
    // let clHighScoreHTML = document.getElementById("clientHighScore");
    // clNameHTML.innerHTML = client.name;
    // clHighScoreHTML.innerHTML = client.highScore;
}

function html_updateGameState(){
    let gameStateHTML = document.getElementById("gameStatus-HTML")
    if(Balls.length != 0){
        gameStateHTML.innerHTML = "Stop"
    }else{
        gameStateHTML.innerHTML = "Start"
    }
}