/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */


/**========================================================================
 **                            Leaderboard Module
 ** This handles outputting the leaderboard document into the webpage.
 *========================================================================**/

// Base object
let leaderboardName;
let leaderboardScore;
let leaderboard = {
    /**========================================================================
     **                           Return Leaderboard Data
     *?  Finds the data in the database, and returns it to an object
     *@param name type  
     *@param name type  
     *@return n/a
     *========================================================================**/
    init: function() {
        var leaderboard = firebase.database().ref('scoreboard/')
        leaderboard.ref.once('value', (_data) => {
            _data.forEach((_childSnapshot) => {
                var content = '';
                leaderboardName = _childSnapshot.key;
                leaderboardScore = _childSnapshot.val();
                content += '<tr>';
                content += '<td>' + leaderboardName + '</td>';
                content += '<td>' + leaderboardScore + '</td>';
                content += '</tr>';
                $('#scoreBoard').append(content);
                console.log("leaderboard.init() | Appended and retrieved scoreboard.")
            });
        });
    },
}