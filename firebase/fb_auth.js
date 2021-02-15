

let google;
let facebook;
let provider;
let fb_user;

// fb_auth function for authenticating users!

function fb_auth(_provider){
    if(_provider == google){
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function () {
            provider = new firebase.auth.GoogleAuthProvider();
            console.log("fb_auth | Starting Authentication process")

            return firebase.auth().signInWithPopup(provider).then(function (result) {
                var token = result.credential.accessToken;
                fb_user = result.user;
                console.log(token)
                console.log(fb_user)
                fb_initUserData(fb_user.uid, fb_user)
            })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage)
                });
        })
    }
}