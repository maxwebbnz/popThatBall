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
                    debug.handler("fb_auth | Starting Authentication process", "info")
                    return firebase.auth().signInWithPopup(provider).then(function(result) {
                            var token = result.credential.accessToken;
                            let fb_result = result.user;
                            fb_initUserData(fb_result.uid, fb_result)
                            debug.handler("auth.login | Authentication Process Successful", "info")
                            authStatus = true;
                            alert.authSuccess();
                        })
                        .catch(function(error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            debug.handler("fb_auth | Error: " + errorMessage, "warn")
                            alert.error("We couldn't log you in, " + error)

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
            debug.handler("fb_profileHandler | Displaying User's profile", "info");
            profilePage.show();
        } else if (!authStatus) {
            this.login(google)
        }
    },
    /**========================================================================
     **                           Logout
     *?  Logs out the user no matter on their provider
     *@param name type 
     *@return type
     *========================================================================**/
    logout: function() {
        firebase.auth().signOut().then(() => {
            alert.success("You signed out!")
        }).catch((error) => {
            debug.handler("auth.logout | ", error)
            alert.warn("We couldn't log you out, please try again'")
        });
    },

}