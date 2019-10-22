// Basic alert
document.querySelector('div.default button').onclick = function(){
    swal("Here's a message!");
};

// Bootstrap colors
document.querySelector('div.bootstrap button.btn-default').onclick = function() {
    bootstrapColor("default");
};
document.querySelector('div.bootstrap button.btn-primary').onclick = function() {
    bootstrapColor("primary");
};
document.querySelector('div.bootstrap button.btn-info').onclick = function() {
    bootstrapColor("info");
};
document.querySelector('div.bootstrap button.btn-success').onclick = function() {
    bootstrapColor("success");
};
document.querySelector('div.bootstrap button.btn-warning').onclick = function() {
    bootstrapColor("warning");
};
document.querySelector('div.bootstrap button.btn-danger').onclick = function() {
    bootstrapColor("danger");
};
document.querySelector('div.bootstrap button.btn-inverse').onclick = function() {
    bootstrapColor("inverse");
};
function bootstrapColor(style) {
    swal({
        title: (style.charAt(0).toUpperCase() + style.slice(1))+" bootstrap color!",
        text: (style.charAt(0).toUpperCase() + style.slice(1))+" bootstrap color style for SweetAlert!",
        confirmButtonText: "Cool!",
        customClass: "swal-"+style
    });
}

// Bootstrap full colors
document.querySelector('div.bootstrap-full button.btn-default').onclick = function() {
    bootstrapFullColor("default");
};
document.querySelector('div.bootstrap-full button.btn-primary').onclick = function() {
    bootstrapFullColor("primary");
};
document.querySelector('div.bootstrap-full button.btn-info').onclick = function() {
    bootstrapFullColor("info");
};
document.querySelector('div.bootstrap-full button.btn-success').onclick = function() {
    bootstrapFullColor("success");
};
document.querySelector('div.bootstrap-full button.btn-warning').onclick = function() {
    bootstrapFullColor("warning");
};
document.querySelector('div.bootstrap-full button.btn-danger').onclick = function() {
    bootstrapFullColor("danger");
};
document.querySelector('div.bootstrap-full button.btn-inverse').onclick = function() {
    bootstrapFullColor("inverse");
};
function bootstrapFullColor(style) {
    swal({
        title: (style.charAt(0).toUpperCase() + style.slice(1))+" bootstrap full color!",
        text: (style.charAt(0).toUpperCase() + style.slice(1))+" bootstrap full color style for SweetAlert!",
        confirmButtonText: "Cool!",
        customClass: "swal-"+style+" swal-full"
    });
}

// Theme color
document.querySelector('div.theme button').onclick = function() {
    swal({
        title: "Theme colors!",
        text: "Theme colors styled alerts for SweetAlert!",
        confirmButtonText: "Cool!"
    });
};

 // Theme full color
document.querySelector('div.theme-full button').onclick = function() {
    swal({
        title: "Theme full colors!",
        text: "Theme full colors styled alerts for SweetAlert!",
        confirmButtonText: "Cool!",
        customClass: "swal-full"
    });
};

// Auto close
document.querySelector('div.timer button').onclick = function(){
    swal({
        title: "Auto close alert!",
        text: "I will close in 2 seconds.",
        timer: 2000,
        showConfirmButton: false
    });
};

// Transparent alert
document.querySelector('div.transparent button').onclick = function() {
    swal({
        title: "Transparent alert!",
        text: "sparent alert style for SweetAlert!",
        confirmButtonText: "Cool!",
        customClass: "swal-transparent"
    });
};

// Success alert
document.querySelector('div.success button').onclick = function(){
    swal("Good job!", "You clicked the button!", "success");
};

// Warning with confirmation
document.querySelector('div.warning.confirm button').onclick = function(){
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55 !important',
        confirmButtonText: 'Yes, delete it!',
        closeOnConfirm: false
    },
    function(){
        swal("Deleted!", "Your imaginary file has been deleted!", "success");
    });
};

// Warning with cancel
document.querySelector('div.warning.cancel button').onclick = function(){
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55 !important',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
    function(isConfirm){
    if (isConfirm){
      swal("Deleted!", "Your imaginary file has been deleted!", "success");
    } else {
      swal("Cancelled", "Your imaginary file is safe :)", "error");
    }
    });
};

// HTML Message
document.querySelector('div.message-html button').onclick = function(){
    swal({
        title: "HTML <small>Title</small>!",
        text: 'A custom <span style="color:#F8BB86">html<span> message.',
        html: true
    });
};

// Input alert
document.querySelector('div.input button').onclick = function(){
    swal({
        title: "An input!",
        text: 'Write something interesting:',
        type: 'input',
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Write something"
    }, 
    function(inputValue){
        if (inputValue === false) return false;

        if (inputValue === "") {
            swal.showInputError("You need to write something!");
            return false;
        }

        swal("Nice!", 'You wrote: ' + inputValue, "success");

    });
};
    
    
