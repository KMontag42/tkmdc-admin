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
                window.location = "index.html"
            }
        });

    $(".alert").alert().hide();

    $("#logout").on("click", function(e) {
        e.preventDefault();
        authClient.logout();
    });

    $("#microblog-new-form").on("submit", function(e) {
        e.preventDefault();

        firebase.child('microblog').push({
            entry: $("#microblog-post-input")[0].value,
            date: Date.now()
        }, function(error) {
            if (error == "null") {
                $("#microblog-error-alert").show();
            } else {
                $("#microblog-success-alert").show();
            }
        });
    });

})(jQuery);
