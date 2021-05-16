/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */

/**========================================================================
 **                           Init Firebase
 *?  Setups firebase code for the program
 *@param name type  
 *@return n/a
 *========================================================================**/
function fb_init() {
    var firebaseConfig = {
        apiKey: "AIzaSyBUvUMLAUUGOslx5tuXRDRTZ8a0JwyakVc",
        authDomain: "popthatball-9e33e.firebaseapp.com",
        projectId: "popthatball-9e33e",
        storageBucket: "popthatball-9e33e.appspot.com",
        messagingSenderId: "746873167398",
        appId: "1:746873167398:web:d75a0c2e25961806ed50e7"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    debug.handler("fb_init | Connected to " + firebaseConfig.projectId + "'s Firebase Project", "info")
}