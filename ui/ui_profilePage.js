/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */

let profilePage = {
    /**========================================================================
     **                           Show Profile Page
     *?  Displays the UI Component Profile page
     *@param name type  
     *@return n/a
     *========================================================================**/
    show: function() {
        $("#pp").modal("show");
        let eventButton = document.getElementById("eventFunction");
        eventButton.innerHTML = "Edit";
        // changing values again
        let clNameHTML = document.getElementById("pp_name");
        let clAvatar = document.getElementById("pp_avatar");
        let clEmail = document.getElementById("pp_email");
        clNameHTML.innerHTML = client.name;
        clAvatar.src = client.profileURL;
        clEmail.innerHTML = client.email;
    },
    /**========================================================================
     **                           Show Editor
     *?  Displays the editor in the module
     *@param name type  
     *@param _hide method transleted by a string  
     *@return n/a
     *========================================================================**/
    showEditor: function(_hide) {
        let inputName = document.getElementById("pp_input-name");
        let inputEmail = document.getElementById("pp_input-email");
        editorInputs = [inputName, inputEmail];
        editorOpen = true;

        for (let i = 0; i < editorInputs.length; i++) {
            editorInputs[i].style.display = "block";
        }
        document.getElementById("eventFunction").innerHTML = "Save Changes";

        $(editorInputs[0]).bind("change paste keyup", function() {
            if (validate.nameSpecfic($(this).val())) {
                document.getElementById("errorMessage_name").style.display = "none";
                $("#eventDetermined").prop("disabled", false);
                $("#eventDetermined").click(function() {
                    profilePage.saveProfileData();
                });
            } else {
                $("#eventDetermined").prop("disabled", true);
                document.getElementById("errorMessage_name").style.display = "block";
                document.getElementById("eventFunction").onclick = "";
            }
        });
        $(editorInputs[1]).bind("change paste keyup", function() {
            if (validate.email($(this).val())) {
                document.getElementById("errorMessage_email").style.display = "none";
                $("#eventDetermined").prop("disabled", false);
                $("#eventDetermined").click(function() {
                    profilePage.saveProfileData();
                });
            } else {
                document.getElementById("errorMessage_email").style.display = "block";
                $("#eventDetermined").prop("disabled", true);
            }
        });
        if (_hide) {
            for (let i = 0; i < editorInputs.length; i++) {
                editorInputs[i].style.display = "none";
            }
        }
        for (let i = 0; i < editorInputs.length; i++) {
            editorInputs[i].style.display = "block";
        }
        if (_hide) {
            for (let i = 0; i < editorInputs.length; i++) {
                editorInputs[i].style.display = "none";
            }
        }
    },
    /**========================================================================
     **                           Save Profile Data
     *?  Saves and updates the user's information insde the DB
     *@param name typ
     *@param name type  
     *@return type
     *========================================================================**/
    saveProfileData: function() {
        debug.handler("html_profilePage | Updated User data in table", 'info');
        fb_store.userInformation(client.uid, editorInputs[0].value, editorInputs[1].value)
            //  then update locally for the remainder of the session
        client.name = editorInputs[0].value;
        client.email = editorInputs[1].value;
        alert.success("Saved new user data!")
        html_game.update();
        // hide modal and reset information
        for (let i = 0; i < editorInputs.length; i++) {
            editorInputs[i].style.display = "none";
        }
        $("#pp").modal("hide");
    },
};