/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */


let google;
let facebook;
let provider;
let authStatus = false;
// fb_auth function for authenticating users!

let auth = {
    login: function(_provider){
        if(_provider == google){
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function () {
                provider = new firebase.auth.GoogleAuthProvider();
                console.log("fb_auth | Starting Authentication process")
    
                return firebase.auth().signInWithPopup(provider).then(function (result) {
                    var token = result.credential.accessToken;
                    let fb_result = result.user;
                    fb_initUserData(fb_result.uid, fb_result)
                    console.log("auth.login | Authentication Process Successful")
                    authStatus = true;
                })
                    .catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log("fb_auth | Error: " + errorMessage)
                    });
            })
        }
    },
    profileHandler: function(){
        if(authStatus){
            console.log("fb_profileHandler | Displaying User's profile")
            profilePage.show();
        }else if(!authStatus){
            this.login(google)
        }
    }
}
function fb_auth(_provider){

}

function fb_profileHandler(){
 
}