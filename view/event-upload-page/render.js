$(window).on('load', function() {

    $(".event-select-item").each(function(){
        $(".event-selection").append("<option value='" + $(this).text() + "'>" + $(this).text() + "</option>");
    });
});