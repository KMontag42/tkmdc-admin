/**
 * Created by kmontag on 8/23/14.
 */
(function($) {
    var comment_template_script = $("#comment-template").html(),
        comment_template = Handlebars.compile(comment_template_script),
        firebase = new Firebase("https://tkmdc.firebaseio.com/"),
        page_loaded = false;
    
    firebase.child("quote-comments").on("value", function(snapshot) {
        
        if (!page_loaded) {
            var comments = snapshot.val();

            for (q in comments) {
                comments[q]['id'] = q;
            }

            $("#comment-list-container").append(comment_template(comments));

            $(".publish-comment").on("click", function(e) {
                if (!e.target.checked) {
                    firebase.child("quote-comments").child($(e.target).data("fbid"))
                        .update({ "admin_selected": false }, function (error) {
                            if (error == "null") {
                                alert("error");
                            } else {
                                e.target.checked = false;
                            }
                        });
                }
                else {
                    firebase.child("quote-comments").child($(e.target).data("fbid"))
                        .update({ "admin_selected": true }, function (error) {
                            if (error == "null") {
                                alert("error");
                            } else {
                                e.target.checked = true;
                            }
                        });
                }
            });

            page_loaded = true;
        }
        
    });
    
})(jQuery);
