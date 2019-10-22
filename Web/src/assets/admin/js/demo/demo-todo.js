$(document).ready(function() {
    
    $elements = 0;
    
    appendTask('#todolist', 'Create new template', false);
    appendTask('#todolist', 'Reply user emails', false);
    appendTask('#todolist', 'Check server status', false);
    appendTask('#todolist', 'Lorem ipsum dolor sit amet', false);
    appendTask('#todolist', 'Morbi non luctus nulla', false);
    
    appendTask('#oldtodolist', 'Lorem ipsum dolor sit amet', false);
    appendTask('#oldtodolist', 'Morbi non luctus nulla', true);
    appendTask('#oldtodolist', 'Duis a blandit justo', true);
    appendTask('#oldtodolist', 'LorVestibulum sit amet eleifend sem', false);
    appendTask('#oldtodolist', 'Pellentesque habitant morbi tristique', false);
    
    $('#todonew').keypress(function(e) {
        if (e.which === 13) {
            $('.destroy').off('click');
            $('.toggle').off('click');
            appendTask('#todolist', $(this).val(), false);
        }
        todoToggle();
        todoRemove();
    });
    
    $('#addtask').click(function() {
        appendTask('#todolist', $('#todonew').val(), false);
    });
    
    updateCount();
    todoToggle();
    todoRemove();
});

function appendTask(element, value, checked) {
    if (value!='') {
        var newTodo = 
            "<li>" +
                "<label class='option block'>"+
                    "<input type='checkbox' class='toggle' "+(checked?'checked':'')+">"+
                    "<span class='checkbox checkbox-thin'></span>"+
                    "<label "+(checked?'data="done" class="done"':'')+">"+value+"</label>"+
                    "<a class='destroy'></a>"+
                "</label>"+
            "</li>";
        $('#todonew').val('');
        $elements++;
        $(element).append(newTodo);
        updateCount();
    }
}
    
function todoRemove() {
    $('.destroy').on('click', function(e) {
        currentElement = $(this).closest('li');
        currentElement.remove();
        $elements--;
        updateCount();
    });
}

function todoToggle() {
    $('.toggle').on('click', function(e) {
          var currentElementLabel = $(this).closest('li').find('label');
          if (currentElementLabel.attr('data') == 'done') {
              currentElementLabel.attr('data', '');
              currentElementLabel.removeClass('done');
          } else {
              currentElementLabel.attr('data', 'done');
              currentElementLabel.addClass('done');
          }
    });
}
    
function updateCount() {
    $('#todocount').html($elements);
}
    
$.fn.isBound = function(type, fn) {
    var data = this.data('events')[type];
    if (data === undefined || data.length === 0) {
        return false;
    }
    return (-1 !== $.inArray(fn, data));
};

// Add sortable functionality to the tasks
$(function() {
    $(".sortable").sortable({
        items: "li:not(.header)"
    });
});
        