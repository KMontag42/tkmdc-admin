/**
 * Created by kmontag on 8/23/14.
 */
(function($) {

    var firebase = new Firebase("https://tkmdc.firebaseio.com/"),
        authClient = new FirebaseSimpleLogin(firebase, function(error, user) {
            if (error) {
                // an error occurred while attempting login
                console.log(error);
            } else if (user) {
                // user authenticated with Firebase
                console.log("User ID: " + user.uid + ", Provider: " + user.provider);
                if (user.uid != "github:1686738") {
                    window.location = "index.html"
                }
            } else {
                // user is logged out
            }
        });

    $(".quote-form-alert").alert().hide();

    $("#quote-form").on("submit", function(e) {
        e.preventDefault();

        firebase.child("quotes").push({
            author: $("#quote-author-input")[0].value,
            author_job: $("#quote-position-input")[0].value,
            quote: $("#quote-input")[0].value
        }, function(error) {
            if (error == "null") {
                $("#quote-error-alert").alert();
            } else {
                $("#quote-success-alert").alert();
            }
        });
    });
})(jQuery);
