/**
 * Created by Kyle on 9/7/2014.
 */
(function($) {

    var todo_template_script = $("#todo-items-template").html(),
        todo_template = Handlebars.compile(todo_template_script),
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

    firebase.child("todo").on("value", function(snapshot) {

        if (!page_loaded) {
            var todo_items = snapshot.val();

            for (q in todo_items) {
                todo_items[q]["id"] = q;
            }

            $("#todo-items").append(todo_template(todo_items));

            $(".complete-todo-item").on("click", function(e) {
                if ($(e.target).parent().hasClass("completed")) {
                    firebase.child("todo").child($(e.target).data("fbid")).update({
                        completed: false
                    }, function(error) {
                        if (error == "null") {

                        } else {
                            $(e.target).parent().parent().parent().children(".todo-item").removeClass("completed");
                            $(".complete-todo-item > [data-fbid=" + $(e.target).data("fbid") + "]").parent().removeClass("completed");
                        }
                    });
                } else {
                    firebase.child("todo").child($(e.target).data("fbid")).update({
                        completed: true
                    }, function(error) {
                        if (error == "null") {

                        } else {
                            $(e.target).parent().parent().parent().children(".todo-item").addClass("completed");
                            $(".complete-todo-item > [data-fbid=" + $(e.target).data("fbid") + "]").parent().addClass("completed");
                        }
                    });
                }

            });

            $(".delete-todo-item").on("click", function(e) {
                firebase.child("todo").child($(e.target).data("fbid")).remove(function(error) {
                    if (error == "null") {

                    } else {
                        $(e.target).parent().parent().parent().remove();
                    }
                });
            });

            page_loaded = true;
        }
    });

    $("#new-todo").on("submit", function(e) {
        e.preventDefault();

        console.log("hello");

        firebase.child("todo").push({
            item: $("#new-todo-input").val()
        }, function(error) {
            // callback
        });
    });

})(jQuery);