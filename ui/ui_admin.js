/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
/**========================================================================
 *                           Admin Module
 *========================================================================**/
let rowId = 0
let adminUI = {
    /**========================================================================
     **                           Handler
     *?  Handles all the admin UI components inside this module
     *@param name type  
     *@param _action string  
     *@return type
     *========================================================================**/
    handler: function(_action) {
        if (_action == "show") {
            if (client.admin) {
                console.log("adminUI.handler | Opening admin center for client")
                $('#admin').fadeIn();
                admin.readUserTable()

            } else {
                alert.error("You cannot use the admin center mister!")
            }

        }
        if (_action == "hide") {
            $('#admin').fadeOut();
            $("#admin_userlist-table tbody").children().remove()


        }

    },

    /**========================================================================
     **                           Actions
     *? For handling all actions throughout the admin page
     *@param name type  
     *@param _action string  
     *@param _pageNum integer 
     *@return type
     *========================================================================**/
    action: function(_action, _pageNum) {
        if (_pageNum == 0) {
            if (_action == "deleteUser") {
                Swal.fire({
                    title: 'Are you sure you want to delete the user?',
                    showCancelButton: true,
                    confirmButtonText: `Remove`,
                    denyButtonText: `Don't remove`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        Swal.fire('Removed User!', '', 'success')
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
            }
            if (_action == "editUserInfo") {
                Swal.mixin({
                    input: 'text',
                    confirmButtonText: 'Next &rarr;',
                    showCancelButton: true,
                    progressSteps: ['1', '2', '3']
                }).queue([{
                        title: 'Display Name',
                        text: 'Please enter correct information'
                    },
                    'Score',
                    'High Score'
                ]).then((result) => {
                    if (result.value) {
                        const answers = JSON.stringify(result.value)
                        let newUserName = answers[0]
                        let score = answers[1]
                        let highScore = answers[2]
                        console.log(answers)
                        Swal.fire({
                            title: 'Users Information Saved!',
                            confirmButtonText: 'Lovely!'
                        })
                    }
                })
            }
        }
    },
    /**========================================================================
     **                           Append User List Table
     *?  This function collects data from the user data retrieved from the db and writes the table
     *@param _usersName type  
     *@param _usersGameName type  
     *@param _usersAvatar type  
     *@param _usersEmail type  
     *@param _usersScore type  
     *@param _usersHighScore type  
     *@param _usersphoneNum type  
     *@param _usersUid type  
     *@return type
     *========================================================================**/
    appendUserTable: function(_usersName, _usersGameName, _usersAvatar, _usersEmail, _usersScore, _usersHighScore, _usersPhoneNum, _usersUid) {
        var content = '';
        let usesrId = toString(_usersUid);
        console.log(usesrId)
        content += '<tr data-userId="' + _usersUid + '">';
        content += '<td><img src="' + _usersAvatar + '" class="rounded-circle" width="20" height="20"></td>';
        content += '<td>' + _usersName + '</td>';
        content += '<td>' + _usersEmail + '</td>';
        content += '<td>' + _usersScore + '</td>';
        content += '<td>' + _usersHighScore + '</td>';
        content += '<td> <button id="admin-selectButton" onclick="adminUI.selectButtonHandler(' + usesrId + ')">Select</button></td>';
        content += '</tr>';
        $('#admin_userlist-table').append(content);
    },
    /**========================================================================
     **                           User Card UI
     *?  Funnels from admin.userCard method, generates actions and values inside the selected user card
     *@param name type  
     *@param _selectedUser table of values  
     *@return n/a
     *========================================================================**/
    userCardUI: function(_selectedUser) {
        console.log("adminUI.userCardUI | Funneled " + _selectedUser.name + "'s information!")
            // create DOM references for HTML page
        let avatarHTML = document.getElementById('admin_selectedUserCard-avatar')
        let userNameHTML = document.getElementById('admin_selectedUserCard-username')
        let emailHTML = document.getElementById('admin_selectedUserCard-email')
        let scoreHTML = document.getElementById('admin_selectedUserCard-score')
        let deleteUserButtonHTML = document.getElementById('admin_selectedUserCard-deleteuser')
        let editUserButtonHTML = document.getElementById('admin_selectedUserCard-edituserinfo')

        avatarHTML.src = _selectedUser.avatar
        userNameHTML.innerHTML = _selectedUser.name
        emailHTML.innerHTML = _selectedUser.email
        scoreHTML.innerHTML = _selectedUser.score
    },
    /**========================================================================
     **                           Select User
     *?  Handles the selection of any user from the user list.
     *@param name type  
     *@param name type  
     *@return type
     *========================================================================**/
    selectButtonHandler: function(_uid) {
        console.log("adminUI.selectButtonHandler | Select button called, gotta dash!")
        admin.userCard(_uid)
    },
}