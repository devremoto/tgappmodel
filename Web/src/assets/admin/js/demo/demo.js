 $( document ).ready(function() {
     
    $('#demo-settings-toggler').click(function () {
        $('#demo-settings').toggleClass('open');
        return false;
    });

    /* ****************** */
    /*   Right notifier   */
    /* ****************** */
    // Set the notification bar sticky to the top of the page
    $(window).scroll(function(){
        if ($(window).scrollTop() > 0) {
            $('#right-notifier').addClass('right-notifier-sticky');
        } else {
            $('#right-notifier').removeClass('right-notifier-sticky');
        }
    });
    // Initialize slimscroll
    $('.right-notifier-content').slimScroll({
        height: '100%',
        railOpacity: 0.4,
        wheelStep: 12
    });
    // Right notifier toggler
    $('#right-notifier-toggler').click(function(){
        $('#right-notifier').toggleClass('right-notifier-open');
    });
    $('#right-notifier-toggler-2').click(function(){
        if (!$('#right-notifier').hasClass('right-notifier-open')) {
            $('#right-notifier').addClass('right-notifier-open');
        }
    });
    $('#right-notifier-toggler-3').click(function(){
        if (!$('#right-notifier').hasClass('right-notifier-open')) {
            $('#right-notifier').addClass('right-notifier-open');
        }
    });
     $('#profile-toggler').click(function(){
        $('#right-notifier').removeClass('right-notifier-open');
    });
     
     /* ************************** */
     /* Sidebar NAV layout control */ 
     /* ************************** */
    // Fix container navbar (demo only)
    $('.container-navbar-fixer-nav').click(function() {
        $('#wrapper').toggleClass('container-navbar-fixed');
        $(this).toggleClass('bold');
    });
    // Fix container footer (demo only)
    $('.container-footer-fixer-nav').click(function() {
        $('#wrapper').toggleClass('container-footer-fixed');
        $('#wrapper').removeClass('boxed');
        $(this).toggleClass('bold');
    });
    // Sidebar collapser (demo only)
    $('.sidebar-collapser-nav').click(function () {
        $("#wrapper").toggleClass("mini-sidebar");
        $(this).toggleClass('bold');
    });
    // Box the page (demo only)
    $('.boxed-selector-nav').click(function () {
        $("#wrapper").toggleClass("boxed");
        $('#wrapper').removeClass('container-footer-fixed');
        $(this).toggleClass('bold');
    });
    // Sidebar fixed (demo only)
    $('.sidebar-fixed-nav').click(function () {
         $("#wrapper").toggleClass("fixed-sidebar");
        $(this).toggleClass('bold');
    });
     
    /* **************************** */
    /* Demo settings layout control */ 
    /* **************************** */
    // Fix container navbar (demo only)
    $('.container-navbar-fixer').click(function() {
        $('#wrapper').toggleClass('container-navbar-fixed');
    });
    // Fix container footer (demo only)
    $('.container-footer-fixer').click(function() {
        $('#wrapper').toggleClass('container-footer-fixed');
        $('#wrapper').removeClass('boxed');
        if ($('.boxed-selector').hasClass('checked')) {
            $('.boxed-selector').removeClass("checked");
        }
    });
    // Sidebar collapser (demo only)
    $('.sidebar-collapser').click(function () {
        $("#wrapper").toggleClass("mini-sidebar");
    });
    // Box the page (demo only)
    $('.boxed-selector').click(function () {
        $("#wrapper").toggleClass("boxed");
        $('#wrapper').removeClass('container-footer-fixed');
        if ($('.container-footer-fixer').hasClass('checked')) {
            $('.container-footer-fixer').removeClass("checked");
        }
    });
    // Sidebar fixed (demo only)
    $('.sidebar-fixed').click(function () {
         $("#wrapper").toggleClass("fixed-sidebar");
        if ($("#wrapper").hasClass("fixed-sidebar") && 
            !$("#wrapper").hasClass("mini-sidebar")) {
            $('.sidebar-wrapper').slimScroll({
                width: '200px',
                height: '100%',
                railOpacity: 0.3,
                wheelStep: 12
            });
            $('.sidebar-wrapper').css('min-height', '');
        } else {
            $('.sidebar-wrapper').slimscroll({destroy: true});
            $('.sidebar-wrapper').attr('style', '');
        }
        if (!$("#wrapper").hasClass("fixed-sidebar")) {
            resizeWrapper();
        }
    });
     
    // Theme change (demo only)
    $('.theme-selector').click(function () {
        $('body').attr('data-theme', $(this).attr('theme'));
    });
     
    // Background change (demo only)
    $('.background-selector').click(function () {
        $('#sidebar-wrapper').attr('data-background', $(this).attr('background'));
    });

    // Sidebar minimizer control (demo only)
    $('.sidebar-minimalizer').click(function () {
        var element = $('#onoff-collapse-sidebar');
        element.toggleClass("checked");
    });
     
});

function changeModal(element, newColor) {
    var colors = ['default', 'primary', 'info', 'success', 'warning', 'danger', 'inverse'];
    for (var index in colors) {
        $(element).removeClass('modal-'+colors[index]);
    }
    $(element).addClass('modal-'+newColor);
}