/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */

/**========================================================================
 *                           Registration Module
 *          This will handle all stuff registration, including data handling
 *========================================================================**/
let userId;
let registration = {
    parseUserId: function(_userId) {
        userId = _userId
        this.show()
    },
    /**========================================================================
     **                           Show
     *?  Shows the registration module
     *@param name type  
     *@param registrationModule dom element
     *@return n/a
     *========================================================================**/
    show: function() {
        $("#registrationModule").slideToggle("slow");
        $("#registrationModule").show();

    },
    /**========================================================================
     **                           Collect User Input
     *?  Collects user input from forum
     *@param name type  
     *@param userDetails table 
     *@param displayName table 
     *@param phoneNumber string 
     *@param suburb intger 
     *@param city string 
     *@param gender string 
     *@return n/a
     *========================================================================**/
    collectUserInput: function() {
        let userDetails = {};
        userDetails.displayName = document.getElementById('regDisplayName').value
        userDetails.phoneNumber = document.getElementById('regPhoneNum').value
        userDetails.suburb = document.getElementById('regSuburb').value
        userDetails.city = document.getElementById('regCity').value
        userDetails.gender = document.getElementById('regGender').value

        console.table(userDetails)

        this.storeUserData(userDetails)
    },
    /**========================================================================
     **                           Store User Data
     *?  Stores registration data to users document, and hides module
     *@param name type  
     *@param db database reference
     *@param userId unique id
     *@return n/a
     *========================================================================**/
    storeUserData: function(_data) {
        var db = firebase.database().ref('users/' + userId)
        firebase.database().ref('users/' + userId).update({
            gameName: _data.displayName,
            phoneNum: _data.phoneNumber,
            suburb: _data.suburb,
            city: _data.city,
            gender: _data.gender,
        });
        // finished registration, concluding.
        $("#registrationModule").slideToggle("slow");
        // $("#registrationModule").hide();

    }
}