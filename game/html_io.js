/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
function html_append(){
    let clNameHTML = document.getElementById("clientName");
    let clScoreHTML = document.getElementById("scoreHTML");
    let clHighScoreHTML = document.getElementById("highScoreHTML");
    let clAvatar = document.getElementById("clientAvatar");
    clNameHTML.innerHTML = client.name;
    clScoreHTML.innerHTML = client.score;
    clHighScoreHTML.innerHTML = client.highScore;
    clAvatar.src = client.profileURL;
}

function html_updateGameState(){
    let gameStateHTML = document.getElementById("gameStatus-HTML")
    if(Balls.length != 0){
        gameStateHTML.innerHTML = "Stop"
    }else{
        gameStateHTML.innerHTML = "Start"
    }
}