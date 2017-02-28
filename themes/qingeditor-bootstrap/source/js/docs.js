/**
 * Created by liushuai on 2017/1/21.
 */
var width = $('#slide').width();
$('#slide').css({
    "left": -(width + 2)
});

initCategory();
$('#slideClose').click(function (e) {
    e.stopPropagation();
    var width = $('#slide').width();
    var left = $('#slide').css('left');
    if (parseInt(left) === 0) {
        $('#slide').animate({
            "left": -(width + 2),
            "opacity": 0
        });
    } else {
        $('#slide').animate({
            "left": 0,
            "opacity": 1
        });
    }
});

$('.list-group-item').click(function (e) {
    if ($(this).next('.list-group').length === 0) {
        return;
    }
    $('#categoryList .list-group').not($(this).next('.list-group')).slideUp();
    $(this).next('.list-group').slideToggle();
});

$('#slide').click(function (e) {
    e.stopPropagation();
});

maoDian(10);

function initCategory() {
    var pathname = window.location.pathname;
    var page = pathname.split('/').pop();
    console.log('current category selected');
}
$(document).click(function () {
    var width = $('#slide').width();
    $('#slide').animate({
        "left": -(width + 2),
        "opacity": 0
    });
});