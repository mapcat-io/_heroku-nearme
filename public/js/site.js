// homepage main button click handler

// $( "#primaryCta" ).on( "click", function() {
//   console.log( $( this ).text() );
// });

function postContactToGoogle() {
    console.log("button is clicked");
    var email = $('#Email').val();

        $.ajax({
            url: "https://docs.google.com/forms/d/1r-WaPM4Qb4C_u4RR-IM_wtUNO514Q-i9cIToXQ4Pn2E/formResponse",
            data: { "entry_1599441494": email },
            type: "POST",
            dataType: "xml",
            statusCode: {
                0: function () {
                    window.location.replace("/");
                },
                200: function () {
                    window.location.replace("/");
                }
            }
        });
}
