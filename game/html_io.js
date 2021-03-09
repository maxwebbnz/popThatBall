/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */


let editorInputs;
let editorOpen = false;

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

function html_triggerProfilePage(){
    $('#profileModal').modal('show');
    let eventButton = document.getElementById('eventFunction')
    eventButton.innerHTML = "Edit";
    // changing values again
    let clNameHTML = document.getElementById("editorClientName");
    let clAvatar = document.getElementById("editorClientAvatar");
    let clEmail = document.getElementById("editorClientEmail");
    clNameHTML.innerHTML = client.name;
    clAvatar.src = client.profileURL;
    clEmail.innerHTML = client.email;
}

let html_profilePage = {
    showEditor: function(_hide){
       let inputName = document.getElementById('editor.clientName')
       let inputEmail = document.getElementById('editor.clientEmail')
       let editProfilePicture = document.getElementById('editor.clientAvatar')
       let inputProfilePicture = document.getElementById('editor.clientAvatarInput')
       editorInputs = [inputName, inputEmail, inputProfilePicture, editProfilePicture]
       editorOpen = true;
       document.getElementById('eventFunction').innerHTML = "Save Changes";
       document.getElementById('eventFunction').onclick = this.saveProfileData;
    
       for (let i = 0; i < editorInputs.length; i++) {
        editorInputs[i].style.display = "block";
      }
      if(_hide){
        for (let i = 0; i < editorInputs.length; i++) {
            editorInputs[i].style.display = "none";
          } 
      }
    },
    saveProfileData: function(){
        console.log("html_profilePage | Updated User data in table")
        firebase.database().ref('users/' + client.uid + "/").update({
            name: editorInputs[0].value,
            email: editorInputs[1].value,
            profileURL: editorInputs[2].value,
          });
        //   then update locally for the remainder of the session
        client.name = editorInputs[0]
        client.email = editorInputs[1]
        client.profileURL = editorInputs[2]
    }
}