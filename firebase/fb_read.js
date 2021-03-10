/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */

let client;

function fb_initUserData(_userToken, _userObject) {
    var db = firebase.database().ref('users/' + _userToken)
    db.once('value', (snapshot) => {
        if (snapshot.val() == null) {
            // store data to firebase
            console.log("fb_initUserData | User's first time on site, recording infomation!")
            firebase.database().ref('users/' + _userToken).set({
                name: _userObject.displayName,
                email: _userObject.email,
                profileURL: _userObject.photoURL,
                uid: _userToken,
                // need to write score so leaderboard works properly. 
                score: 0,
                highScore: 0,
                // in terms of postion in array
                currentLevel: 1,
            });
            let tokenParse = _userToken
            registration.parseUserId(tokenParse)
            fb_initUserData(tokenParse)
        } else {
            const userData = snapshot.val();
            console.log("User has logged in before, no need to write more data")
                // write data to local variables
                // now it needs to read data
            client = userData;
            // set game variables to userData
            score = client.score
            highScore = client.highScore
            console.log(client)
                // assign new html infomation
            html_append();

        }
    });
}