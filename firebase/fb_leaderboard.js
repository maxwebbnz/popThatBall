/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */


/**========================================================================
 **                            Leaderboard Module
 ** This handles outputting the leaderboard document into the webpage.
 *========================================================================**/

// This is for storing all currently displayed leaderboard infomation
let storedLeaderBoardInfo = [];

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
                        "userAverage": childSnapshot.child('score').val(),
                        "userToken": childSnapshot.key
                    }
                    storedLeaderBoardInfo.push(userObject)
                        // console.log(storedLeaderBoardInfo)
                })
                for (i = storedLeaderBoardInfo.length; i--;) {
                    this.appendTable(storedLeaderBoardInfo[i].avatar, storedLeaderBoardInfo[i].name, storedLeaderBoardInfo[i].hits, storedLeaderBoardInfo[i].misses, storedLeaderBoardInfo[i].userAverage)
                        // console.log(storedLeaderBoardInfo[i].name)
                }
            });
    },
    /**========================================================================
     **                           Append Table
     *?  Writes data from the leaderboard into the HTML Table on the page
     *@param _userAvatar an image  
     *@param _userName string
     *@param _userHits intger
     *@param _userMisses intger
     *@param _userAverage float
     *@return n/a
     *========================================================================**/
    appendTable: function(_userAvatar, _userName, _userHits, _userMisses, _userAverage) {
        var content = '';
        content += '<tr>';
        content += '<td><img src="' + _userAvatar + '" class="rounded-circle" width="20" height="20"></td>';
        content += '<td>' + _userName + '</td>';
        content += '<td>' + _userHits + '</td>';
        content += '<td>' + _userMisses + '</td>';
        content += '<td>' + _userAverage + '</td>';
        content += '</tr>';
        $('#ldbrd_scoreboard-table').append(content);
    },
    /**========================================================================
     **                           Handler
     *?  This handles all of the 'handling' or directing of the module
     *@param name type  
     *@param _lvlnum intger  
     *@param _method string  
     *@return n/a
     *========================================================================**/
    handler: function(_lvlnum, _method) {
        if (authStatus) {
            if (_method == "close") {
                console.log("leaderboard.handler | Hiding leaderboard")
                $("#ldbrd").fadeOut();
                $('.navbar-nav li').remove();
            } else if (_method == true) {
                console.log("leaderboard.handler | Changing to level " + _lvlnum)
                    // removing content out of the array
                storedLeaderBoardInfo.length = 0;
                // then removing the current info on the page
                $("#ldbrd_scoreboard-table tbody").children().remove()
                this.init(_lvlnum);
            } else {
                console.log("leaderboard.handler | Showing leaderboard for " + _lvlnum)
                $("#ldbrd").fadeIn();
                this.init(_lvlnum);
                this.generateNavBarLinks();
            }
        } else {
            alert.warn("You can't see the leaderboard without being logged in!")
        }
    },
    /**========================================================================
     **                           Store Leaderboard Data
     *?  Stores leaderboard data once user has completed a level.
     *@param name type  
     *@param name type  
     *@return n/a
     *========================================================================**/
    storeLeaderBoardData: function(_id, _tableofval, _currentLevel) {
        // console.log(_id + _valInput)
        firebase.database().ref('scoreBoard/level' + _currentLevel + "/" + _id).update({
            name: _tableofval.name,
            avatar: _tableofval.avatar,
            hits: _tableofval.hits,
            misses: _tableofval.misses,
            score: _tableofval.score,
        }, (error) => {
            if (error) {
                console.warn("leaderboard.storeLeaderBoardData | Error: " + error)
                alert.error("We couldn't show some stuff on the leaderboard, Error:" + error)

            } else {
                console.log("leaderboard.storeLeaderBoardData | Stored data leaderboard data for " + _id + " in level " + _currentLevel)
            }
        });
    },

    /**========================================================================
     **                           Generate Navbar Links
     *?  Generates navigation bar links with corropsondense to how many levels there are
     *@param name type  
     *@param name type  
     *@return n/a
     *========================================================================**/
    /*                        <li class="nav-item">
    <
    a class = "nav-link active"
    aria - current = "page"
    href = "#"
    onclick = "leaderBoard.handler(1, 'changeLeaderboard')" > Level 1 < /a> <
    /li>
    */
    generateNavBarLinks: function() {
        // append navigation bar class
        for (var i = 0; i < levels.length; i++) {
            console.log("leaderBoard.generateNavBarLinks | Generated navigation links")
            var content = '';
            content += '<li class="nav-item">';
            content += '<a class="nav-link active leaderboardLevel' + levels[i].identifer + '"aria-current="page" href="#"';
            content += "onclick='leaderBoard.handler(" + levels[i].identifer + ", true)'>";
            content += "Level " + levels[i].identifer;
            $('.navbar-nav').append(content);
        }


    }
}