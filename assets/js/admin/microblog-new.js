/**
 * Created by kmontag on 8/23/14.
 */
(function($) {
    var firebase = new Firebase("https://tkmdc.firebaseio.com/");

    $(".alert").alert().hide();

    $("#microblog-new-form").on("submit", function(e) {
        e.preventDefault();

        firebase.child('microblog').push({
            entry: $("#microblog-post-input")[0].value
        }, function(error) {
            if (error == "null") {
                $("#microblog-error-alert").show();
            } else {
                $("#microblog-success-alert").show();
            }
        });
    });

})(jQuery);
