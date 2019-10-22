$(document).ready(function() {     
    $('#xe-firstname').editable({
        mode: 'inline', 
        validate: function validate(value) {
           if ($.trim(value) == '') return 'This field is required';
       }
    });
    $('#xe-sex').editable({
        mode: 'inline', 
        prepend: 'not selected',
        source: [{ value: 1, text: 'Male' }, { value: 2, text: 'Female' }],
        display: function display(value, sourceData) {
            var colors = { '': 'gray', 1: 'green', 2: 'blue' },
                elem = $.grep(sourceData, function (o) {
                return o.value == value;
            });

            if (elem.length) {
                $(this).text(elem[0].text).css('color', colors[value]);
            } else {
                $(this).empty();
            }
        }
    });
    $('#xe-group').editable({mode: 'inline', showbuttons: false});
    $('#xe-error-loading').editable({mode: 'popup'});
    $('#xe-fruits').editable({mode: 'popup', limit: 3,
      source: 
        [{ value: 1, text: 'banana' }, 
         { value: 2, text: 'peach' }, 
         { value: 3, text: 'apple' }, 
         { value: 4, text: 'watermelon' },
         { value: 5, text: 'orange' }]
    });
    $('#xe-comments').editable({
        mode: 'popup', 
      showbuttons: 'bottom'
    });

});