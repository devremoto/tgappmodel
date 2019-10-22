$( document ).ready(function() {
    $('input.maxlength').maxlength({
        alwaysShow: true,
        warningClass: "label label-success",
        limitReachedClass: "label label-danger",
        separator: ' of ',
        preText: 'You have ',
        postText: ' chars remaining.',
        placement: 'centered-right'
    });
    
    $('.chosen-select').chosen({no_results_text: "Oops, nothing found!"});
});
