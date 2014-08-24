/**
 * Created by kmontag on 8/23/14.
 */
(function($) {

    var firebase = new Firebase("https://tkmdc.firebaseio.com/");

    $(".alert").alert().hide();

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
