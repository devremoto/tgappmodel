                
$('#switchTimeline').click(function () {
    if ($('#timeline').hasClass('timeline-left')) {
        $('#swto').text('left');                        
    } else {
        $('#swto').text('center');
    }
    $('#timeline').toggleClass('timeline-left');
});
