/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */

let profilePage = {
    show: function() {
        $("#profileModal").modal("show");
        let eventButton = document.getElementById("eventFunction");
        eventButton.innerHTML = "Edit";
        // changing values again
        let clNameHTML = document.getElementById("editorClientName");
        let clAvatar = document.getElementById("editorClientAvatar");
        let clEmail = document.getElementById("editorClientEmail");
        clNameHTML.innerHTML = client.name;
        clAvatar.src = client.profileURL;
        clEmail.innerHTML = client.email;
    },
    showEditor: function(_hide) {
        let inputName = document.getElementById("editor.clientName");
        let inputEmail = document.getElementById("editor.clientEmail");
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
    saveProfileData: function() {
        console.log("html_profilePage | Updated User data in table");
        firebase
            .database().ref("users/" + client.uid + "/")
            .update({
                name: editorInputs[0].value,
                email: editorInputs[1].value,
            });
        //   then update locally for the remainder of the session
        client.name = editorInputs[0].value;
        client.email = editorInputs[1].value;
        alert.success("Saved new user data!")
        html_append();
        // hide modal and reset information
        for (let i = 0; i < editorInputs.length; i++) {
            editorInputs[i].style.display = "none";
        }
        $("#profileModal").modal("hide");
    },
};