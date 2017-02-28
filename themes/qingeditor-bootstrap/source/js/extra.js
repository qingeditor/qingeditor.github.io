/**
 * Created by liushuai on 2017/1/15.
 */
var pathname = window.location.pathname;
var page = pathname.split('/').pop();
var pageSelector = 'a[href="' + page + '"]';
function init() {
    if ($(pageSelector).parents('.members').length) {
        $(pageSelector).parents('.members').show();
        generateClassMethonPara();
    } else if ($(pageSelector).siblings('.members').length) {
        $(pageSelector).siblings('.members').show();

    }
    $(pageSelector).addClass('current');
}

function generateClassMethonPara() {
    $list = '<ul class="members" style="display: block;">';
    $.each($('section h4.name'), function (i,n) {
        text = $(n).text().split(' ')[1].split('(')[0];
        $list += '<li data-type="member" class="entry-type-class"><a href="#' + $(n).attr('id') + '" class="current">' + text + '</a></li>'
    });

    $(pageSelector).after($list);
}
init();
maoDian(70);