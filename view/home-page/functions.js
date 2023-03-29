$(window).on('load', function() {

    function searchVote(cosplayerID){
        for (cosplayer of cosplayerState) {
            
            if(cosplayerID == cosplayer.id){
                return cosplayer.totalVoteCount;
            }
        }
        return 0;
    };
});