/**
 * Created by kmontag on 8/22/14.
 */
/********************************************************************************************************************************
 INDEX
 *********************************************************************************************************************************/
(function($) {

    var myRef = new Firebase("https://tkmdc.firebaseio.com"),
        authClient = new FirebaseSimpleLogin(myRef, function(error, user) {
        if (error) {
            // an error occurred while attempting login
            console.log(error);
        } else if (user) {
            // user authenticated with Firebase
            console.log("User ID: " + user.uid + ", Provider: " + user.provider);
            if (user.uid === "github:1686738") {
                window.location = "dashboard.html"
            }
        } else {
            // user is logged out
        }
    });

    $("#login-button").on("click", function(e) {
        authClient.login("github", {
            email: $("#username")[0].value,
            password: $("#password")[0].value
        });
    });

})(jQuery);