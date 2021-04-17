/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */

/**========================================================================
 *                           Registration Module
 *          This will handle all stuff registration, including data handling
 *========================================================================**/
let userId;
let userDetails = {};

let registration = {
    /**========================================================================
     **                           Parse User ID
     *?  This gets the ball rolling on this chain of events, this takes the user
     *? token from the auth handler and parse it through to store rego data.
     *@param name type  
     *@param _userId unique id  
     *@param userId unique id  
     *@return n/a
     *========================================================================**/
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
        $("#registrationModule").fadeIn();
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
        let nameVaild = false;
        let phoneVaild = false;
        let subVaild = false;
        let cityVaild = false;
        let genderVaild = false;

        if (validate.nameSpecfic(document.getElementById('regDisplayName').value)) {
            userDetails.displayName = document.getElementById('regDisplayName').value
            $('#registrationModule_form-name--error').hide();
            nameVaild = true

        } else {
            $('#registrationModule_form-name--error').show();
        }
        if (validate.num(document.getElementById('regPhoneNum').value)) {
            userDetails.phoneNumber = document.getElementById('regPhoneNum').value
            $('#registrationModule_form-phonenum--error').hide();
            phoneVaild = true


        } else {
            $('#registrationModule_form-phonenum--error').show();
        }
        if (validate.text(document.getElementById('regSuburb').value)) {
            userDetails.suburb = document.getElementById('regSuburb').value
            $('#registrationModule_form-sub--error').hide();
            subVaild = true


        } else {
            $('#registrationModule_form-sub--error').show();
        }
        if (validate.text(document.getElementById('regCity').value)) {
            userDetails.city = document.getElementById('regCity').value
            $('#registrationModule_form-city--error').hide();
            cityVaild = true


        } else {
            $('#registrationModule_form-city--error').show();
        }


        if (nameVaild && phoneVaild && cityVaild && subVaild && phoneVaild) {
            userDetails.gender = document.getElementById('regGender').value
            this.storeUserData(userDetails)
        }
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
        $("#registrationModule").fadeOut();
        // $("#registrationModule").hide();

    }
}