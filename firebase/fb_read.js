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
            console.log(_userObject)
            debug.handler("fb_initUserData | User's first time on site, recording infomation!", "info")
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
                sound: true,
                debug: false,
                hits: 0,
                misses: 0,
            });
            let tokenParse = _userToken
            registration.parseUserId(tokenParse)
            fb_initUserData(tokenParse)
        } else {
            const userData = snapshot.val();
            debug.handler("fb_initUserData | User has logged in before, no need to write more data", 'info')
            client = userData;
            hits = client.hits
            misses = client.misses
            score = Math.round((client.score + Number.EPSILON) * 100) / 100
            soundOn = client.sound
            debugOn = client.debug
            let uid = client.uid
            debug.handler("fb_initUserData | User Data Table below.", 'info')
            admin.userRoles(uid)
            html_append();

        }
    });
}