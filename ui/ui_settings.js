/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
/**========================================================================
 *                           Settings Module
 *========================================================================**/

let userSettings = {
    /**========================================================================
     **                           UI Component
     *?  The UI Component is used for controlling the viewing of the settings component
     *@param name type  
     *@param name type  
     *@return type
     *========================================================================**/
    uiComponent: function(_action) {
        if (_action == "show") {
            if (authStatus) {
                $("#settings_modal").modal("show");
                // check boxes that need Checking
                if (soundOn) {
                    document.getElementById("settings_modal-sound").checked = true
                } else {
                    document.getElementById("settings_modal-sound").checked = false
                }
                if (debugOn) {
                    document.getElementById("settings_modal-debug").checked = true

                } else {
                    document.getElementById("settings_modal-debug").checked = false

                }

            } else {
                alert.warn("You cannot change your settings until your logged in!")
            }

        }
        if (_action == "hide") {
            $("#settings_modal").modal("hide");

        }
    },
    /**========================================================================
     **                           Action Handler
     *?  Handles updating users preferences
     *@param name type  
     *@return type
     *========================================================================**/
    action: function() {
        let soundInput = document.getElementById("settings_modal-sound");
        let debugInput = document.getElementById("settings_modal-debug");

        if (soundInput.checked == true) {
            soundOn = true
        } else if (soundInput.checked == false) {
            soundOn = false
        }

        if (debugInput.checked == true) {
            debugOn = true;
        } else if (debugInput.checked == false) {
            debugOn = false;
        }

        firebase.database().ref('users/' + client.uid).update({
            sound: soundInput.checked,
            debug: debugInput.checked
        }).catch(function(err) {
            alert.error("Couldn't store users preferences, please try again later.");
            debug.handler("settings | Couldn't store users preferences: " + err, 'error')
        })
        alert.success("Updated users preferences")
        debug.handler("userSettings | Updating user preferences", 'info');
        this.uiComponent("hide")
    }
}