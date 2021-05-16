/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */

let client;

/**========================================================================
 **                           Init User Data
 *?  Reads the users data from the database or stores new information into the database
 *@param _userToken user identifer  
 *@param _userObject table of user attrubites
 *@return n/a
 *========================================================================**/
function fb_initUserData(_userToken, _userObject) {
    var db = firebase.database().ref('users/' + _userToken)
    db.once('value', (snapshot) => {
        if (snapshot.val() == null) {
            // store data to firebase
            debug.handler("fb_initUserData | User's first time on site, recording infomation!", "info")
            firebase.database().ref('users/' + _userToken).set({
                name: _userObject.displayName,
                email: _userObject.email,
                profileURL: _userObject.photoURL,
                uid: _userToken,
                // in terms of postion in array
                currentLevel: 1,
                sound: true,
                debug: false,
            });
            let tokenParse = _userToken
            fb_gameData.init(_userToken)
            registration.parseUserId(tokenParse, _userObject)
            fb_initUserData(tokenParse)
        } else {
            const userData = snapshot.val();
            debug.handler("fb_initUserData | User has logged in before, no need to write more data", 'info')
            client = userData;
            fb_gameData.fetch(client.uid)
            soundOn = client.sound
            debugOn = client.debug
            let uid = client.uid
            debug.handler("fb_initUserData | User Data Table below.", 'info')
            admin.userRoles(uid)
            html_game.update(client);
        }
    });
}