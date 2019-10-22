$(function() {
    $('#basic-minicolors').minicolors();
    $('#inline-minicolors').minicolors({
        inline: true
    });
    $('#hidden-minicolors').minicolors({
        hide: true
    });
    $('#brightness-minicolors').minicolors({
        control: 'brightness'
    });
    $('#saturation-minicolors').minicolors({
        control: 'saturation'
    });
    $('#wheel-minicolors').minicolors({
        control: 'wheel'
    });
    $('#opacity-minicolors').minicolors({
        opacity: true
    });
});
