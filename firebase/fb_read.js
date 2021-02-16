/*
 * Copyright (c) 2021 Max Webb 
 * All rights reserved.
 */



function fb_initUserData(_userToken, _userObject) {
    var db = firebase.database().ref('users/' + _userToken)
    db.on('value', (snapshot) => {
      if (snapshot.val() == null) {
        // store data to firebase
          console.log("User's first time on site, recording infomation!")
          firebase.database().ref('users/' + _userToken).set({
            name: _userObject.displayName,
            email: _userObject.email,
            profile_picture: _userObject.photoURL,
            uid: _userToken,
            // need to write score so leaderboard works properly. 
            score: 0
        });
        
      } else {
        const userData = snapshot.val();
        console.log("User has logged in before, no need to write more data")
        // write data to local variables
          // now it needs to read data
          client = userData;
          console.log(client)
        // assign values to html.
          // this code block could be converted into a module in the future 
        //   document.getElementById('client_uid').innerHTML = client.uid;
          document.getElementById('client_displayName').innerHTML = client.name;
        //   document.getElementById('client_score').innerHTML = client.score;
          document.getElementById('client_prflImg').src = client.profile_picture;
          gm_start();
  
      }
    });
  }
  
  