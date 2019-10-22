/* Drag and drop pending events */
$('#pending-events div.pending-event').each(function() {
    $(this).data('event', {
        title: $(this).text().trim(),
        stick: true
    });
    $(this).draggable({
        zIndex: 99999999,
        revertDuration: 0,
        revert: true
    });
});

/* Fullcalendar initialization */
$(document).ready(function() {

    var today = new Date();
    var todayD = today.getDate();
    var todayM = today.getMonth();
    var todayY = today.getFullYear();

    $('#calendar').fullCalendar({
        header: {
            left:   "today prev, next",
            center: "title",
            right:  "month, agendaWeek, agendaDay"
        },
        editable: true,
        selectable: true,
        selectHelper:true,
        select: function(start, end) {
            var title = prompt('Event Title:');
            var eventData;
            if (title) {
                eventData = {
                    title: title,
                    start: start,
                    end: end
                };
                $('#calendar').fullCalendar('renderEvent', eventData, true);
                $('#calendar-today').fullCalendar('renderEvent', eventData, true);
            }
            $('#calendar').fullCalendar('unselect');
            $('#calendar-today').fullCalendar('unselect');
        },
        droppable: true,
        drop: function() {
            $(this).remove();
            var nEvents = $('#pending-events div.pending-event').length;
            if (nEvents<=0) {
                nEvents = "No";
                $('#pending-events-container').remove();
            }
            $('#pending-counter').html(nEvents);
        },
        events: [
            {
                title: 'All Day Event',
                start: new Date(todayY, todayM, todayD-1),
                allDay: true
            },
            {
                title: 'Long Event',
                start: new Date(todayY, todayM, todayD),
                end: new Date(todayY, todayM, todayD+2),
                allDay: true
            },
            {
                title: 'Repeating Event',
                start: new Date(todayY, todayM, todayD+3)
            },
            {
                title: 'Lorem ipsum Event',
                start: new Date(todayY, todayM, todayD-3)
            },
            {
                title: 'Repeating Event',
                start: new Date(todayY, todayM, todayD+5)
            },
            {
                title: 'Conference',
                start: new Date(todayY, todayM, todayD+6),
                end: new Date(todayY, todayM, todayD+9),
                allDay: true
            },
            {
                title: 'Client travel',
                start: new Date(todayY, todayM, todayD-6),
                end: new Date(todayY, todayM, todayD-9),
                allDay: true
            },
            {
                title: 'Meeting',
                start: new Date(todayY, todayM, todayD, 10, 30, 00),
                end: new Date(todayY, todayM, todayD, 11, 30, 00)
            },
            {
                title: 'Meeting',
                start: new Date(todayY, todayM, todayD-4, 09, 00, 00),
                end: new Date(todayY, todayM, todayD-4, 11, 00, 00)
            },
            {
                title: 'Conference',
                start: new Date(todayY, todayM, todayD+15),
                end: new Date(todayY, todayM, todayD+18),
                allDay: true
            },
            {
                title: 'All Day Event',
                start: new Date(todayY, todayM, todayD+12),
                allDay: true
            },
            {
                title: 'Produto presentation',
                start: new Date(todayY, todayM, todayD+18, 15, 30, 00),
                end: new Date(todayY, todayM, todayD+18, 17, 30, 00)
            },
            {
                title: 'Produto presentation',
                start: new Date(todayY, todayM, todayD-18, 15, 30, 00),
                end: new Date(todayY, todayM, todayD-18, 17, 30, 00)
            },
            {
                title: 'Director presentation',
                start: new Date(todayY, todayM, todayD+22, 12, 30, 00),
                end: new Date(todayY, todayM, todayD+22, 13, 30, 00)
            },
            {
                title: 'Director presentation',
                start: new Date(todayY, todayM, todayD-22, 12, 30, 00),
                end: new Date(todayY, todayM, todayD-22, 13, 30, 00)
            },
            {
                title: 'Produto Meeting',
                start: new Date(todayY, todayM, todayD, 15, 30, 00),
                end: new Date(todayY, todayM, todayD, 17, 30, 00)
            }
        ]
    });

    $('#calendar-today').fullCalendar({
        header: {
            left:   false,
            center: false,
            right:  false
        },
        defaultView: 'basicDay',
        events: [
            {
                title: 'Long Event',
                start: new Date(todayY, todayM, todayD),
                end: new Date(todayY, todayM, todayD+2),
                allDay: true
            },
            {
                title: 'Meeting',
                start: new Date(todayY, todayM, todayD, 10, 30, 00),
                end: new Date(todayY, todayM, todayD, 11, 30, 00)
            },
            {
                title: 'Produto Meeting',
                start: new Date(todayY, todayM, todayD, 15, 30, 00),
                end: new Date(todayY, todayM, todayD, 17, 30, 00)
            }
        ]
    });
    $('#calendar-today .fc-toolbar').remove();
});
                     
