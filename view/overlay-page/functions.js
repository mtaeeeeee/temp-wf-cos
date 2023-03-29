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
    $(".close-payment-overlay-btn").off();

    //Reset selector
    $("select.payment-currency-selector").val([]);
    $("select.payment-currency-selector option[value='']").prop("selected", true);
    $("select.payment-currency-selector").off();
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
    //Rest buttons
    $(".vote-up").off();
    $(".vote-down").off();
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