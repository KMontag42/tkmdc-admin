/**
 * Created by kmontag on 8/23/14.
 */
(function($) {

    var firebase = new Firebase("https://tkmdc.firebaseio.com/");

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
