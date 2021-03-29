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
     *@param _pageNum integer  
     *@return type
     *========================================================================**/
    handler: function(_action, _pageNum) {
        if (_action == "show") {
            console.log("Admin Admin Admin Admin on the wall")
            $('#admin').fadeIn();
        }
        if (_action == "hide") {
            $('#admin').fadeOut();

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
        content += '<tr>';
        content += '<td><img src="' + _usersAvatar + '" class="rounded-circle" width="20" height="20"></td>';
        content += '<td>' + _usersName + '</td>';
        content += '<td>' + _usersEmail + '</td>';
        content += '<td>' + _usersScore + '</td>';
        content += '<td>' + _usersHighScore + '</td>';
        content += '</tr>';
    },
}