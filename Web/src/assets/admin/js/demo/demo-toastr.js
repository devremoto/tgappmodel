$(function () {
    var i = -1;
    var toastCount = 0;
    var $toastlast;
    var getMessage = function () {
        var msg = 'This is a Toastr notification. Lorem ipsum dolor sit amet.';
        return msg;
    };

    var getMessageWithClearButton = function (msg) {
        msg = msg ? msg : 'Clear itself?';
        msg += '<br /><br /><button type="button" class="btn btn-white btn-block clear">Yes</button>';
        return msg;
    };


    $('#showsimple').click(function (){
        // Display a success toast, with a title
        toastr.success('Without any options','Simple notification!')
    });
    $('#showtoast').click(function () {
        var shortCutFunction = $("#toastTypeGroup input:radio:checked").val();
        var msg = $('#message').val();
        var title = $('#title').val() || '';
        var $showDuration = $('#showDuration');
        var $hideDuration = $('#hideDuration');
        var $timeOut = $('#timeOut');
        var $extendedTimeOut = $('#extendedTimeOut');
        var $hideEasing = $('#hideEasing');
        var $showEasing = $('#showEasing');
        var $hideMethod = $('#hideMethod');
        var $showMethod = $('#showMethod');
        var addClear = $('#addClear').prop('checked');
        var toastIndex = toastCount++;
        toastr.options = {
            closeButton: $('#closeButton').prop('checked'),
            debug: $('#debugInfo').prop('checked'),
            progressBar: $('#progressBar').prop('checked'),
            preventDuplicates: $('#preventDuplicates').prop('checked'),
            positionClass: $('#positionGroup input:radio:checked').val() || 'toast-top-right',
            onclick: null
        };
        if ($('#addBehaviorOnToastClick').prop('checked')) {
            toastr.options.onclick = function () {
                alert('JavaScript action after the Toast dissapears.');
            };
        }
        if ($showDuration.val().length) {
            toastr.options.showDuration = $showDuration.val();
        }
        if ($hideDuration.val().length) {
            toastr.options.hideDuration = $hideDuration.val();
        }
        if ($timeOut.val().length) {
            toastr.options.timeOut = $timeOut.val();
        }
        if ($extendedTimeOut.val().length) {
            toastr.options.extendedTimeOut = $extendedTimeOut.val();
        }
        if ($showEasing.val().length) {
            toastr.options.showEasing = $showEasing.val();
        }
        if ($hideEasing.val().length) {
            toastr.options.hideEasing = $hideEasing.val();
        }
        if ($showMethod.val().length) {
            toastr.options.showMethod = $showMethod.val();
        }
        if ($hideMethod.val().length) {
            toastr.options.hideMethod = $hideMethod.val();
        }
        if (addClear) {
            msg = getMessageWithClearButton(msg);
            toastr.options.tapToDismiss = false;
        }
        if (!msg) {
            msg = getMessage();
        }
        $("#toastrOptionsWrapper").removeClass('hidden');
        $("#toastrOptions").text("Command: toastr["
                + shortCutFunction
                + "](\""
                + msg
                + (title ? "\", \"" + title : '')
                + "\")\n\ntoastr.options = "
                + JSON.stringify(toastr.options, null, 2)
        );
        var $toast = toastr[shortCutFunction](msg, title);
        $toastlast = $toast;
        if ($toast.find('.clear').length) {
            $toast.delegate('.clear', 'click', function () {
                toastr.clear($toast, { force: true });
            });
        }
    });
    function getLastToast(){
        return $toastlast;
    }
    $('#clearlasttoast').click(function () {
        toastr.clear(getLastToast());
    });
    $('#cleartoasts').click(function () {
        toastr.clear();
    });
})
