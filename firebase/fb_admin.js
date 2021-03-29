/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
/**========================================================================
 **                            Admin Firebase Module
 *========================================================================**/

let admin = {
    /**========================================================================
     **                           User Groups Handler
     *?  Handles retreiving user information from the database and performing on desired action
     *@param name type  
     *@param _action string  
     *@param _uid unique identifer  
     *@return n/a
     *========================================================================**/
    userGroupsHandler: function(_action, _uid) {
        console.log("admin.userGroupsHandler | Performed " + _action);
    },
    /**========================================================================
     **                           Read User Table
     *? Reads the /users path and returns all the users, it then performs a HTML append
     *@param name type  
     *@param name type  
     *@return type
     *========================================================================**/
    readUserTable: function() {
        let users = [];
        let userPath = firebase.database().ref("users")
        userPath.once('value').then(
            (_snapshot) => {
                _snapshot.forEach(function(childSnapshot) {
                    // console.log(childSnapshot.val())
                    let retrievedUser = {
                        "name": childSnapshot.child("name").val(),
                        "gameName": childSnapshot.child("gameName").val(),
                        "avatar": childSnapshot.child("profileURL").val(),
                        "email": childSnapshot.child('email').val(),
                        "score": childSnapshot.child('score').val(),
                        "highScore": childSnapshot.child('highScore').val(),
                        "phoneNum": childSnapshot.child('phoneNum').val(),
                        "uid": childSnapshot.key
                    }
                    users.push(retrievedUser);
                })
                for (i = users.length; i--;) {
                    adminUI.appendUserTable(
                        users[i].name,
                        users[i].gameName,
                        users[i].avatar,
                        users[i].email,
                        users[i].score,
                        users[i].highScore,
                        users[i].phoneNum,
                        users[i].uid
                    )
                }
            });
    }
}