/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
function html_append(){
    let clNameHTML = document.getElementById("clientName");
    let clScoreHTML = document.getElementById("clientScore");
    let clHighScoreHTML = document.getElementById("clientHighScore");
    let clAvatar = document.getElementById("clientAvatar");
    clNameHTML.innerHTML = client.name;
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