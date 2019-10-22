// Initialize Gridstack.js
$(function () {
    var options = {
        cell_height: 80,
        vertical_margin: 10,
        width: 12,
        draggable: {
            handle: '.panel-heading'
        }
    };
    $('.grid-stack').gridstack(options);
});
