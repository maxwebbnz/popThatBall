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
    parseUserId: function(_userId, _userObject) {
        userId = _userId
        let userObject = _userObject
        this.show(userObject)
    },
    /**========================================================================
     **                           Show
     *?  Shows the registration module
     *@param name type  
     *@param registrationModule dom element
     *@return n/a
     *========================================================================**/
    show: function(_userObject) {
        $("#registrationModule").fadeIn();
        $("#registrationModule").show();

        //* Auto fill objects that we know

        document.getElementById('regFirstLastName').value = _userObject.displayName
        document.getElementById('regEmail').value = _userObject.email

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
        let emailVaild = false;
        let gameNameVaild = false;
        let phoneVaild = false;
        let subVaild = false;
        let cityVaild = false;
        let genderVaild = false;

        // References to DOM Objects
        let regFirstLastName = document.getElementById('regFirstLastName')
        let regEmail = document.getElementById('regEmail')
        let regGameNameField = document.getElementById('regDisplayName')
        let regPhoneField = document.getElementById('regPhoneNum')
        let regSuburbField = document.getElementById('regSuburb')
        let regCityField = document.getElementById('regCity')
        let regGenderField = document.getElementById('regGender')

        //* Validation for Registration Module 
        if (validate.nameSpecfic(regFirstLastName.value)) {
            userDetails.firstLastName = regFirstLastName.value;
            $('#registrationModule_form-firstLastName--error').hide();
            nameVaild = true
        } else {
            $('#registrationModule_form-firstLastName--error').show();
        }
        if (validate.email(regEmail.value)) {
            userDetails.email = regEmail.value;
            $('#registrationModule_form-email--error').hide();
            emailVaild = true
        } else {
            $('#registrationModule_form-email--error').show();
        }

        if (validate.text(regGameNameField.value)) {
            userDetails.gameName = regGameNameField.value
            $('#registrationModule_form-name--error').hide();
            gameNameVaild = true


        } else {
            $('#registrationModule_form-name--error').show();
        }
        if (validate.num(regPhoneField.value)) {
            userDetails.phoneNumber = regPhoneField.value
            $('#registrationModule_form-phonenum--error').hide();
            phoneVaild = true


        } else {
            $('#registrationModule_form-phonenum--error').show();
        }
        if (validate.text(regSuburbField.value)) {
            userDetails.suburb = regSuburbField.value
            $('#registrationModule_form-sub--error').hide();
            subVaild = true


        } else {
            $('#registrationModule_form-sub--error').show();
        }
        if (validate.text(regCityField.value)) {
            userDetails.city = regCityField.value
            $('#registrationModule_form-city--error').hide();
            cityVaild = true


        } else {
            $('#registrationModule_form-city--error').show();
        }


        if (nameVaild && emailVaild && gameNameVaild && phoneVaild && cityVaild && subVaild && phoneVaild) {
            userDetails.gender = regGenderField.value
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
            name: _data.firstLastName,
            email: _data.email,
            gameName: _data.gameName,
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