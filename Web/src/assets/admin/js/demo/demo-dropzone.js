$(function() {
    Dropzone.options.dropZone = {
      addRemoveLinks: true,
      dictDefaultMessage: '<div class="dropzone-dict">\
                                <span class="fa-stack fa-5x">\
                                    <i class="fa fa-circle-thin fa-stack-2x"></i>\
                                    <i class="fa fa-cloud-upload fa-stack-1x"></i>\
                                </span>\
                                <br/> \
                                <span class="fs-20"><b>Drop Files</b> to upload</span> <br /> \
                                <span class="fs-14">(or click here)</span> \
                            </div>',
      dictResponseError: 'Server not Configured'
    };
});