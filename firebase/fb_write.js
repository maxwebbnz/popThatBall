/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
let storeIdLocation;
let postionInDb;


// var database = firebase.database();
// storing data.


let fb_store = {
    data: function(_id, _valInput){
    // console.log(_id + _valInput)
    firebase.database().ref('users/' + _id + "/").update({
        score: _valInput,
      });
      console.log("fb_store | Stored data for " + _id + " with the value of " + _valInput)
    }
}