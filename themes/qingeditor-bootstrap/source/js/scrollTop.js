/**
 * Created by liushuai on 2017/1/22.
 */
$(window).scroll(function () {
    var scrollTop = $(document).scrollTop();
    var windowHeight = $(window).height();
    var showHeight = Math.max(1500, windowHeight * 2);
    if (scrollTop > showHeight) {
        showScrollTop();
    } else {
        $('#toTop').hide();
    }
});
function showScrollTop() {
    var toTop = '<a id="toTop" style="display: none;"><i class="glyphicon glyphicon-chevron-up"></i> </a>';
    if ($('#toTop').length === 0) {
        $(toTop).appendTo('body');
        $('#toTop').click(function () {
            $("html,body").animate({scrollTop: 0}, 1000);
        });
    }
    $('#toTop').show();
}