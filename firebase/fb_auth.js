/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */

/**========================================================================
 *                           Auth Module
 *========================================================================**/
let google;
let facebook;
let provider;
let authStatus = false;
// fb_auth function for authenticating users!

/**========================================================================
 *                           AUTH Object
 *========================================================================**/
let auth = {
    /**==============================================
     **              Login Function
     *?   Handles Logining users
     *@param name type 
     *@param _provider selected auth method 
     *@return type (n/a)
     *=============================================**/
    login: function(_provider) {
        if (_provider == google) {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(function() {
                    provider = new firebase.auth.GoogleAuthProvider();
                    console.log("fb_auth | Starting Authentication process")
                    return firebase.auth().signInWithPopup(provider).then(function(result) {
                            var token = result.credential.accessToken;
                            let fb_result = result.user;
                            fb_initUserData(fb_result.uid, fb_result)
                            console.log("auth.login | Authentication Process Successful")
                            authStatus = true;
                        })
                        .catch(function(error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            console.warn("fb_auth | Error: " + errorMessage)
                            alert.error("We couldn't log you in, Error:" + error)

                        });
                })
        }
    },
    /**==============================================
     **              Profile Handler
     *?   Handles the Profile Button in the GUI
     *@param name type
     *@param authStatus bool  
     *@return n/a
     *=============================================**/
    profileHandler: function() {
        if (authStatus) {
            console.log("fb_profileHandler | Displaying User's profile")
            profilePage.show();
        } else if (!authStatus) {
            this.login(google)
        }
    }
}