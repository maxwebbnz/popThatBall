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
        console.log("Reading")
        let users = [];
        let userPath = firebase.database().ref("users")
        userPath.once('value').then(
            (_snapshot) => {
                _snapshot.forEach(function(childSnapshot) {
                    console.log(childSnapshot.val())
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
            }, (error) => {
                if (error) {
                    console.warn("fb_admin.readUserTable  | Error: " + error)
                    alert.error("We couldn't show you data for admins! " + error)
                }
            });
    },
    /**========================================================================
     **                           User Roles
     *?  Handles user roles when a user authenicates into the game.
     *@param _action action the function needs to perform.
     *@param _userToken user's unique identifer
     *@return n/a
     *========================================================================**/
    userRoles: function(_userToken) {
        console.log("admin.userRoles | Checking for user role")
        let userRolesDB = firebase.database().ref("userRoles").child(_userToken)
        userRolesDB.get().then(function(snapshot) {
            console.log(snapshot.child('rank').val())
            if (snapshot.child('rank').val() == "admin") {
                console.log("admin.userRoles | User is admin, displaying button")
                $('#admincenter-button').fadeIn();
                client.admin = true;
            } else {
                console.log("admin.userRoles | User is not admin")
            }
        }).catch(function(error) {
            console.error(error);
        });
    },

    /**========================================================================
     **                           User Card 
     *?  Collects selected users information and funnels to the UI Component handler
     *@param _uid unique token  
     *@return type
     *========================================================================**/
    userCard: function(_uid) {

        console.log("admin.userCard | Generating uer information for " + _uid);
        let selectedUserInfo = {};
        let userPath = firebase.database().ref("users/" + _uid)
        userPath.get().then(function(snapshot) {
            selectedUserInfo = {
                name: snapshot.child('name').val(),
                email: snapshot.child('email').val(),
                avatar: snapshot.child('profileURL').val(),
                score: snapshot.child('score').val(),
            }
            adminUI.userCardUI(selectedUserInfo)
        }).catch(function(error) {
            console.error(error);
        });
    }
}