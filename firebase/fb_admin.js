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
        debug.handler("admin.userGroupsHandler | Performed " + _action, "info");
    },
    /**========================================================================
     **                           Read User Table
     *? Reads the /users path and returns all the users, it then performs a HTML append
     *@param name type  
     *@param name type  
     *@return type
     *========================================================================**/
    readUserTable: function() {
        $("#admin_userlist-table tbody").children().remove()
        let users = [];
        let userPath = firebase.database().ref("users")
        userPath.once('value').then(
            (_snapshot) => {
                _snapshot.forEach(function(childSnapshot) {
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
                debug.handler("admin.readUserTable | Successfully read through user table, appending user table", "info")
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
                    debug.handler("fb_admin.readUserTable  | Error: " + error, "error")
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
        debug.handler("admin.userRoles | Checking for user role", "info")
        let userRolesDB = firebase.database().ref("userRoles").child(_userToken)
        userRolesDB.get().then(function(snapshot) {
            if (snapshot.child('rank').val() == "admin") {
                debug.handler("admin.userRoles | User is admin, displaying button", "info")
                $('#admincenter-button').fadeIn();
                client.admin = true;
            } else {
                debug.handler("admin.userRoles | User is not admin", "warn")
            }
        }).catch(function(error) {
            debug.handler("admin.userRoles | Error checking for permissons", "error");
        });
    },

    /**========================================================================
     **                           User Card 
     *?  Collects selected users information and funnels to the UI Component handler
     *@param _uid unique token  
     *@return type
     *========================================================================**/
    userCard: function(_uid) {

        debug.handler("admin.userCard | Generating uer information for " + _uid, "info");
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
            debug.handler("admin.userCard | Error generating user card", "error");
        });
    },
    /**========================================================================
     **                           Action Handler
     *?  Handles actions made towards the selected user in the admin module
     *@param name type  
     *@param _userId unique identifer  
     *@param _action string 
     *@param _newInfo array 
     *@return n/a
     *========================================================================**/
    actionHandler: function(_userId, _action, _newInfo) {
        debug.handler("admin.actionHandler | Performing action of: " + _action, "info")
        if (_action == "delete") {
            // we dont want the user to be able to delete themselves
            firebase.database().ref("users/" + _userId).remove()
            debug.handler("admin.actionHandler | Successfully deleted user: " + _userId, "info");
            // update user table with new Information
            this.readUserTable()
        }
        if (_action == "updateUserInfo") {
            let newName = _newInfo[0]
            let score = parseInt(_newInfo[1])
            let highScore = parseInt(_newInfo[2])
            firebase.database().ref("users/" + _userId).update({
                name: newName,
                score: score,
                highScore: highScore
            }).catch(function(error) {
                alert.error("We couldn't update the users information", error)
            })
            debug.handler("admin.actionHandler | Successfully updated information for user: " + _userId, "info");
            // update user table with new Information
            this.readUserTable()
        }
    },
}