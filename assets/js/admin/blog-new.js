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

    $("#new-blog-entry-form").on("submit", function(e) {
        e.preventDefault();

        firebase.child("blog").push({
            title: $("#blog-title")[0].value,
            image_url: $("#blog-image-url")[0].value,
            entry: $("#blog-entry-textarea")[0].value,
            tags: $("#blog-tags")[0].value,
            category: $("#blog-category-select")[0].value,
            published: false
        }, function(error) {
            if (error == "null") {
                $("#blog-error-alert").alert();
            } else {
                $("#blog-success-alert").alert();
            }
        });
    });

})(jQuery);
