$(window).on('load', function() {

    //Set vote count
    $(".event-entry-vote-count").empty().append(cosplayerEntryState[$(".event-entry-picture-img").attr("src").split("_",1).join().split("/").pop()].voteCount);

    //Open photo
    $(".event-entry-picture-img").click(function () {
        //Unhide photo overlay layer
        $("#photo-overlay").removeClass("hidden");
        //Replace default image with idol img in photo overlay
        $(".photo-column").children("img").attr("src", $(this).attr("src")).attr("srcset", $(this).attr("srcset")).attr("loading","lazy");
        //Replace count number with idol img vote count
        $(".photo-vote-count").empty().append(cosplayerEntryState[$(this).attr("src").split("_",1).join().split("/").pop()].voteCount);
        //Start voting overlay
        voting(cosplayerEntryState[$(".event-entry-picture-img").attr("src").split("_",1).join().split("/").pop()]);
    });

    //Enable overlay close
    $(".close-photo-overlay-btn").click(function () {
        closePhotoOverlay();
    });

    //Open payment overlay
    $(".vote-now-btn").click(function () {
        showPaymentOverlay();
    });


});