/**
 * Created by liushuai on 2017/1/23.
 */
function maoDian(height) {
    $('a[href^="#"]').click(function () {
        var id = $(this).attr('href');
        id = id.replace(/^#/, '');
        if (document.getElementById(id) === null) {
            return;
        }
        var offset = document.getElementById(id).offsetTop;
        $("html,body").animate({scrollTop: offset - height}, 500);
    });
}