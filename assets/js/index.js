/**
 * Created by kmontag on 8/22/14.
 */
/********************************************************************************************************************************
 INDEX
 *********************************************************************************************************************************/
(function($) {

    $(".alert").alert().hide();

    var myRef = new Firebase("https://tkmdc.firebaseio.com"),
        authClient = new FirebaseSimpleLogin(myRef, function(error, user) {
        if (error) {
            // an error occurred while attempting login
            $("#login-error-alert").show();
        } else if (user) {
            // user authenticated with Firebase
            console.log("User ID: " + user.uid + ", Provider: " + user.provider);
            if (user.uid === "github:1686738") {
                window.location = "dashboard.html"
            } else {
                $("#login-warning-alert").show();
                $("#login-form-hide").hide();
            }
        } else {
            // user is logged out
            $("#login-success-alert").show();
            $("#login-form-hide").show();
        }
    });

    $("#login-form").on("submit", function(e) {
        e.preventDefault();

        authClient.login("github", {
            email: $("#username")[0].value,
            password: $("#password")[0].value
        });
    });

    $("#logout").on("click", function(e) {

    });

})(jQuery);