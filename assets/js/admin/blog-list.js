/**
 * Created by kmontag on 8/23/14.
 */
(function($) {
    var blog_entry_template_script = $("#blog-template").html(),
        blog_entry_template = Handlebars.compile(blog_entry_template_script),
        firebase = new Firebase("https://tkmdc.firebaseio.com/"),
        page_loaded = false;

    firebase.child("blog").on("value", function(snapshot) {

        if (!page_loaded) {
            var blog_entries = snapshot.val();

            for (q in blog_entries) {
                blog_entries[q]['id'] = q;
            }

            $("#blog-entry-list").append(blog_entry_template(blog_entries));

            $(".publish-blog-entry").on("click", function(e) {
                if (!e.target.checked) {
                    firebase.child("blog").child($(e.target).data("fbid"))
                        .update({ "published": false }, function (error) {
                            if (error == "null") {
                                alert("error");
                            } else {
                                e.target.checked = false;
                            }
                        });
                }
                else {
                    firebase.child("blog").child($(e.target).data("fbid"))
                        .update({ "published": true }, function (error) {
                            if (error == "null") {
                                alert("error");
                            } else {
                                e.target.checked = true;
                            }
                        });
                }
            });

            $(".delete-blog-entry").on("click", function(e) {
                e.preventDefault();
                firebase.child("blog").child($(e.target).data('fbid')).remove(function(error) {
                    if (error == 'null') {

                    } else {
                        $(e.target).parent().parent().parent().remove();
                    }
                });
            });

            page_loaded = true;
        }

    });

})(jQuery);
