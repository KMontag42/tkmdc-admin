/**
 * Created by kmontag on 8/23/14.
 */
(function($) {
    var blog_entry_template_script = $("#edit-blog-entry-template").html(),
        blog_entry_template = Handlebars.compile(blog_entry_template_script),
        firebase = new Firebase("https://tkmdc.firebaseio.com/"),
        entry_id = location.search.split("id=")[1],
        page_loaded = false;

    $(".alert").hide();

    firebase.child("blog").child(entry_id).on("value", function(snapshot) {

        if (!page_loaded) {

            var blog_entries = snapshot.val();

            for (q in blog_entries) {
                blog_entries[q]['id'] = q;
                blog_entries[q]['project'] = blog_entries[q]['category'] == 'project';
                blog_entries[q]['programming'] = blog_entries[q]['category'] == 'programming';
                blog_entries[q]['article'] = blog_entries[q]['category'] == 'article';
            }

            $("#edit-blog-entry-container").append(blog_entry_template(blog_entries));

            $("#edit-blog-entry-form").on("submit", function(e) {
                e.preventDefault();

                firebase.child("blog").child(entry_id).update({
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


            page_loaded = true;
        }
    });
})(jQuery);
