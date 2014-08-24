/**
 * Created by kmontag on 8/23/14.
 */
(function($) {
    var quotes_template_script = $("#quotes-template").html(),
        quotes_template = Handlebars.compile(quotes_template_script),
        firebase = new Firebase("https://tkmdc.firebaseio.com/"),
        page_loaded = false,
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

    $("#logout").on("click", function(e) {
        e.preventDefault();
        authClient.logout();
    });

    firebase.child("quotes").on("value", function(snapshot) {
        if (!page_loaded)
            var quotes = snapshot.val();

            for (q in quotes) {
                quotes[q]['id'] = q;
            }

            $("#quotes-list-container").append(quotes_template(quotes));

            $(".approve-quote").on("click", function(e) {
                if (!e.target.checked) {
                    firebase.child("quotes").child($(e.target).data("fbid"))
                        .update({ "approved": false }, function (error) {
                            if (error == "null") {
                                alert("error");
                            } else {
                                e.target.checked = false;
                            }
                        });
                }
                else {
                    firebase.child("quotes").child($(e.target).data("fbid"))
                        .update({ "approved": true }, function (error) {
                            if (error == "null") {
                                alert("error");
                            } else {
                                e.target.checked = true;
                            }
                        });
                }
            });

            page_loaded = true;
    });
})(jQuery);

