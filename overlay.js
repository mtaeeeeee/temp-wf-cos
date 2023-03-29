$(document).ready(function () {

    //Global state variables
    var votingState = {
        "photoID": "",
        "voteCount": 0,
        "currencyTicker": ""
    }

    //Temporary payment exchange rate
    var exchangeRate = {
        "$MANGA": 1000,
        "DADASH": 50,
        "INUKO": 20
    }

    function showPaymentOverlay() {

        //exchange rate
        let theRate = 0;

        //Unhide payment overlay
        $(".payment-overlay").removeClass("hidden");

        //Update vote count with state
        $(".payment-vote-count").empty().append(votingState["voteCount"]);

        //Enable close payment button
        $(".close-payment-overlay-btn").click(function () {
            closePaymentOverlay();
        });

        //Payment currency selector
        $("select.payment-currency-selector").change(function () {

            votingState["currencyTicker"] = $(this).children("option:selected").val();

            if (votingState["currencyTicker"] in exchangeRate) {
                $(".payment-token-currency").empty().append(votingState["currencyTicker"]);
                theRate = exchangeRate[votingState["currencyTicker"]];

                $(".payment-token-count").empty().append(parseInt($(".payment-vote-count").text()) * theRate);
            }
        });

    }

    function resetPaymentOverlay() {
        //Reset payment overlay
        $(".payment-vote-count").empty().append("0");
        $(".payment-token-count").empty().append("0");
        $(".payment-token-currency").empty().append("XXX");

        //Reset selector
        $("select.payment-currency-selector").val([]);
        $("select.payment-currency-selector option[value='']").prop("selected", true);
    }

    function closePaymentOverlay() {

        //Reset the payment overlay
        resetPaymentOverlay();

        //Hide payment overlay
        $(".payment-overlay").addClass("hidden");
    }

    function voting(refPhotoID) {
        //Reset votingState
        votingState["photoID"] = refPhotoID;
        votingState["voteCount"] = 0;

        //Clean up on startup
        votePlus(votingState["voteCount"]);
        $(".vote-btn-counter").empty().append(votingState["voteCount"]);

        $(".vote-up").click(function () {
            votingState["voteCount"]++;
            $(".vote-btn-counter").empty().append(votingState["voteCount"]);
            votePlus(votingState["voteCount"]);
        });

        $(".vote-down").click(function () {
            if (votingState["voteCount"] > 0) {
                votingState["voteCount"]--;
            }
            $(".vote-btn-counter").empty().append(votingState["voteCount"]);
            votePlus(votingState["voteCount"]);
        });
    }

    function votePlus(counterValue) {
        if (counterValue > 0) {
            $(".vote-plus-text").empty().append('+ ' + counterValue.toString());
        } else {
            $(".vote-plus-text").empty();
        }
    }

    function resetVotingState() {
        votingState = {
            "photoID": "",
            "voteCount": 0
        }
    }


    function resetPhotoOverlay() {
        //Reset photo
        $(".photo-vote-img").attr("src", "https://uploads-ssl.webflow.com/6279c7595e56e5a596e3bafb/641d3b66f0752c6b5261f79f_18586-editing-magic.gif");
        //Reset counter
        $(".photo-vote-count").attr("class", "photo-vote-count");
        $(".photo-vote-count").empty().append("0");
    }

    function closePhotoOverlay() {

        //Reset photo overlay
        resetPhotoOverlay();

        //Hide overlay
        $("#photo-overlay").addClass("hidden");

        //Reset voting state
        resetVotingState();
    }

    function pictureResize(expectedSize, pictureUrl) {

        //Only allow 500, 800, 1080 (if original exceeds this size) & original
        //method -p-500.ext -p-800.ext

        let tempUrl = pictureUrl.split(".");
        let ext = tempUrl.pop();

        return tempUrl.join(".").concat("-p-" + expectedSize.toString() + "." + ext);
    }

    function pictureOriginalSize(pictureUrl) {

        //Remove size
        let tempUrl = pictureUrl.split(".");
        let ext = tempUrl.pop();
        tempUrl = tempUrl.join(".").split("-p-");
        tempUrl.pop();

        return tempUrl.join().concat("." + ext);

    }

    function getPictureVoteCount(refCosplayerID, refPhotoID){
        if (refPhotoID in cosplayerPhotoState[refCosplayerID].photos){
            return cosplayerPhotoState[refCosplayerID].photos[refPhotoID].voteCount;
        }
        return 0;
    }

    //Insert cosplayer id into profile count
    $(".profile-vote-count-number")
        .addClass("cosplayerID-" + $(".cosplayerID").attr("id"))
        .empty().append(cosplayerPhotoState[$(".cosplayerID").attr("id")].totalVoteCount);

    //Clear all content from the grid
    $(".cosplayer-latest").empty();

    //Search all cosplayer images and create pool img
    $(".cosplayer-temp-img").each(function () {

        let photoID = $(this).attr("src").split('/').pop().split('_', 1).join();

        $(".cosplayer-latest").append(`
            <a href="#" class="cosplayer-link w-inline-block openPhotoOverlay" style="background-image:url('` + pictureResize(500, $(this).attr("src")) + `')" id="` + $(this).attr("src").split('/').pop().split('_', 1) + `">
                <div class="cosplay-link-inner-block">
                    <div class="vote-count-block">
                        <img src="https://uploads-ssl.webflow.com/6279c7595e56e5a596e3bafb/641d37ed93f70c7e6625413e_clapping.png" loading="lazy" alt="" class="vote-count-img">
                        <div class="vote-count-number photoID-` + photoID + `">` + getPictureVoteCount($(".cosplayerID").attr("id"), photoID) + `</div>
                    </div>
                </div>
            </a>
        `);
        $(this).attr("src")
        $(this).remove();
    });

    // Remove all the temp list
    $("body").find(".cosplayer-temp-list").remove();

    //Open photo
    $(".openPhotoOverlay").click(function () {
        //Unhide photo overlay layer
        $("#photo-overlay").removeClass("hidden");
        //Replace default image with idol img in photo overlay
        let tempOriginalPicUrl = pictureOriginalSize($(this).attr("style").slice(22, -2));
        $(".photo-column").children("img").attr("src", tempOriginalPicUrl).attr("loading","lazy").attr("alt","").attr("sizes","(max-width: 767px) 96vw, (max-width: 991px) 541px, 700px").attr("srcset", pictureResize(500,tempOriginalPicUrl) + " 500w, " + pictureResize(800,tempOriginalPicUrl) + " 800w, " + tempOriginalPicUrl);
        //Replace count number with idol img vote count
        $(".photo-vote-count").empty().append($(this).find(".vote-count-number").text());
        //Start voting overlay
        voting($(this).find(".vote-count-number").attr("class").split(" ")[1]);
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