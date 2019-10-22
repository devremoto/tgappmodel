var $image = $('.cropperImage > img');
$image.cropper({
  aspectRatio: 16 / 9,
  preview: ".img-preview"
});

var $inputImage = $("#cropperInputImage");

if (window.FileReader) {
    $inputImage.change(function() {
        var fileReader = new FileReader(),
        files = this.files,
        file;

        if (!files.length) {
            return;
        }
        file = files[0];
        if (/^image\/\w+$/.test(file.type)) {
            fileReader.readAsDataURL(file);
            fileReader.onload = function () {
                $inputImage.val("");
                $image.cropper("reset", true).cropper("replace", this.result);
            };
        } else {
            showMessage("Please choose an image format...");
        }
    });
} else {
    $inputImage.addClass("hide");
}

$("#zoomIn").click(function() {
$image.cropper("zoom", 0.1);
});

$("#zoomOut").click(function() {
$image.cropper("zoom", -0.1);
});

$("#rotateLeft").click(function() {
$image.cropper("rotate", 45);
});

$("#rotateRight").click(function() {
$image.cropper("rotate", -45);
});