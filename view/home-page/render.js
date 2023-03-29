$(document).ready(function(){
	
    //Cosplayer list
    let cosplayerList = [];

    $(".cosplayer-link").each(function(){
        cosplayerList.push($(this).next().find("img").attr("src").split('/').pop().split('_',1));
    });

    // Cosplayer photo replace
    $(".cosplayer-link").each(function(){
        let cosplayerID = $(this).find(".cosplayerID").attr("id");
        let cosplayerVote = searchVote(cosplayerID);

        $(this).find(".vote-count-number")
            .attr("id", cosplayerID)
            .empty().append(cosplayerVote);
        $(this).attr("style", 'background-image:url("'+$(this).next().find("img").attr("src")+'")');
        $(this).next().remove();
    });
});