/**
 * Created by kmontag on 8/22/14.
 */
/********************************************************************************************************************************
 INDEX
 *********************************************************************************************************************************/
(function($) {

    $(".index-alert").alert().hide();
    $(".select-quote-container").hide();

    var firebase = new Firebase("https://tkmdc.firebaseio.com/");

    // get the most recent quote in the firebase collection
    firebase.child("quotes").on("value", function(snapshot) {
        var data = snapshot.val(),
            most_recent_entry = data[Object.keys(data)[Object.keys(data).length - 1]];

        $("#quote-of-the-week")[0].innerText = most_recent_entry["quote"];
        $("#quote-author")[0].innerText = most_recent_entry["author"];
        $("#quote-author-job")[0].innerText = most_recent_entry["author_job"];
    });

    firebase.child("quote-comments").on("value", function(snapshot) {
        var data = snapshot.val();

        console.log(Object.keys(data).length);

        var current_selected_quote = 1;

        for (var i = 0; i < Object.keys(data).length; i++) {
            var comment = data[Object.keys(data)[i]];
            if (comment["admin_selected"]) {
                $("#select-quote-" + current_selected_quote + "-text")[0].innerText = comment["quote"].toUpperCase();
                $("#select-quote-" + current_selected_quote + "-date")[0].innerText = comment["date"];
                $("#select-quote-" + current_selected_quote + "-comment")[0].innerText = comment["comment"];
                $("#select-quote-" + current_selected_quote).show();
                current_selected_quote++;
            } else {
            }
        }
    });

    // this is where the quote comments and sent up to firebase
    $("#submit-quote-comment-button").click(function(e) {
        // make sure the button doesn't fuck with us
        e.preventDefault();

        // connect to the firebase child for quote comments
        var quote_comment_ref = firebase.child("quote-comments");

        // get the contents of the quote
        var quote_text = $("#quote-of-the-week")[0].innerHTML;

        // get the comment
        var quote_comment = $("#quote-comment-textarea")[0].value;

        // the current time
        var current_time = new Date(),
            date_string = current_time.getMonth() + "/" + current_time.getDate() + "/" + current_time.getFullYear();
        // push the comment object to firebase
        /*
         * COMMENT
         * quote: string        -   the quote being commented on
         * date: Date           -   the date of the comment
         * comment: string      -   the comment itself
         */
        quote_comment_ref.push({
            quote: quote_text,
            date: date_string,
            comment: quote_comment,
            admin_selected: false
        }, function(error) {
            if (error == "null") {
                $("#quote-error-alert").fadeIn();
            } else {
                $("#quote-success-alert").fadeIn();
            }
        });
    });
})(jQuery);