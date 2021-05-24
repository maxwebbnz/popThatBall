/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
/**========================================================================
 *                           Admin Module
 *========================================================================**/
let rowId = 0
let adminUserTableElement = document.getElementById('admin')
let adminOpen = false;
let selectedUserId
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
                debug.handler("adminUI.handler | Opening admin center for " + client.name, 'info')
                $('#admin').fadeIn();
                admin.readUserTable()
                adminOpen = true

            } else {
                alert.error("You do not have vaild permisson to open the admin center!!")
                debug.handler("adminUI.handler | Not allowing admin center for client", 'warn')

            }

        }
        if (_action == "hide") {
            $('#admin').fadeOut();
            $("#admin_userlist-table tbody").children().remove()
            adminOpen = false
        }
    },

    /**========================================================================
     **                           Actions
     *? For handling all actions throughout the admin page
     *@param name type  
     *@param _action string  
     *@param _pageNum integer 
     *@return n/a
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
                        if (selectedUserId == client.uid) {
                            alert.error("You cannot delete yourself!", 002)

                        } else {
                            admin.actionHandler(selectedUserId, "delete");
                            Swal.fire('Removed User!', '', 'success')
                        }
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
                        if (validate.nameSpecfic(result.value[0]) && validate.num(result.value[1]) && validate.num(result.value[1])) {
                            admin.actionHandler(selectedUserId, "updateUserInfo", result.value)
                            Swal.fire({
                                title: 'Users Information Saved!',
                                confirmButtonText: 'Lovely!'
                            })
                        } else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Error!',
                                text: "Information was incorrectly entered",

                            })
                        }
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
        content += '<tr data-userId="' + _usersUid + '">';
        content += '<td><img src="' + _usersAvatar + '" class="rounded-circle" width="20" height="20"></td>';
        content += '<td>' + _usersName + '</td>';
        content += '<td>' + _usersEmail + '</td>';
        content += '<td>' + _usersScore + '</td>';
        content += '<td>' + _usersHighScore + '</td>';
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
        debug.handler("adminUI.userCardUI | Funneled " + _selectedUser.name + "'s information!", 'info');
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
    tableRowClickListener: function() {
        $('tr').click(function() {
            let selectedData = $(this).attr("data-userId")
            selectedUserId = $(this).attr("data-userId")
            admin.userCard(selectedData);
        });
    },
}