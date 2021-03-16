/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */


/**========================================================================
 **                            Leaderboard Module
 ** This handles outputting the leaderboard document into the webpage.
 *========================================================================**/

// Base object

let leaderBoardArray = [];

let leaderBoard = {
    /**========================================================================
     **                           Return Leaderboard Data
     *?  Finds the data in the database, and returns it to an object
     *@param name type  
     *@param name type  
     *@return n/a
     *========================================================================**/
    init: function(_levelNum) {
        let scores = []
        var leaderboard = firebase.database().ref("scoreBoard/level" + _levelNum).orderByChild("hits").limitToLast(100);;
        leaderboard.once('value').then(
            (_snapshot) => {
                _snapshot.forEach(function(childSnapshot) {
                    // console.log(childSnapshot.key)
                    scores.unshift(childSnapshot.child("hits"))
                        // console.log(childSnapshot.child("hits").val())
                    let userObject = {
                        "name": childSnapshot.child("name").val(),
                        "avatar": childSnapshot.child("avatar").val(),
                        "hits": childSnapshot.child('hits').val(),
                        "misses": childSnapshot.child('misses').val(),
                        "userToken": childSnapshot.key
                    }
                    leaderBoardArray.push(userObject)
                        // console.log(leaderBoardArray)
                })
                for (i = leaderBoardArray.length; i--;) {
                    let userAverage = leaderBoardArray[i].hits / leaderBoardArray[i].misses
                    this.appendTable(leaderBoardArray[i].avatar, leaderBoardArray[i].name, leaderBoardArray[i].hits, leaderBoardArray[i].misses, userAverage)
                        // console.log(leaderBoardArray[i].name)
                }
            });
    },
    appendTable: function(_userAvatar, _userName, _userHits, _userMisses, _userAverage) {
        var content = '';
        content += '<tr>';
        content += '<td><img src="' + _userAvatar + '" class="rounded-circle" width="20" height="20"></td>';
        content += '<td>' + _userName + '</td>';
        content += '<td>' + _userHits + '</td>';
        content += '<td>' + _userMisses + '</td>';
        content += '<td>' + _userAverage + '</td>';
        content += '</tr>';
        $('#scoreBoardTable').append(content);
    },
    handler: function(_lvlnum, _method) {
        if (_method == "close") {
            console.log("leaderboard.handler | Hiding leaderboard")
            document.getElementById("leaderBoardHTML").style.display = "none";
        } else if (_method == "changeLeaderboard") {
            console.log("leaderboard.handler | Changing to level " + _lvlnum)
                // removing content out of the array
            leaderBoardArray.length = 0;
            // then removing the current info on the page
            $("#scoreBoardTable tbody").children().remove()
            this.init(_lvlnum);
        } else {
            console.log("leaderboard.handler | Showing leaderboard for " + _lvlnum)
            document.getElementById("leaderBoardHTML").style.display = "block";
            this.init(_lvlnum);

        }

    }
}