/*
 * TopJs Framework (http://www.topjs.org/)
 *
 * @link      http://github.com/qcoreteam/topjs for the canonical source repository
 * @copyright Copyright (c) 2016-2017 QCoreTeam (http://www.qcoreteam.org)
 * @license   http://www.topjs.org/license/new-bsd New BSD License
 */
let pathFn = require('path');
let _ = require('lodash');
let url = require('url');
hexo.extend.helper.register('header_menu', function (id)
{
    let menu = this.site.data.menu;
    let result = '';
    let self = this;
    // TODO 暂时不处理语言
    let curVersion = this.config.cur_version;
    _.each(menu, function (path, title)
    {
        let url = self.url_for(path);
        if (path == "/docs/"){
            url += curVersion+"/";
        }
        result += '<li class="nav-item"><a class="nav-link" href="' + url + '" >'+title+'</a></li>';
    });
    return result;
});

hexo.extend.helper.register("load_css_for_current_layout", function ()
{
    let layout = this.page.layout;
    if (_.startsWith(layout, "about")) {
        return this.css("css/about.css");
    } else if (layout == "post") {
        return this.css("css/news-content.css");
    } else if (this.is_home() || "index" == layout) {
        return this.css("css/index.css");
    } else if ("blog" == this.page.category) {
        return this.css("css/blog.css");
    } else if ("devel" == this.page.category) {
        return this.css("css/news.css");
    } else if ("doc" == layout) {
        return this.css(["css/docs.css", "css/BootSideMenu.css"]);
    } else {
        return this.css(["css/jsdoc.css", "css/extra.css"]);
    }
});

hexo.extend.helper.register("about_categories", function (index)
{
    let map = {
        index : "关于我们",
        history: "发展历程",
        partner: "合作伙伴",
        contact: "联系我们"
    };
    let result = '';
    let name;
    let curCls = "";
    for (let key in map) {
        name = map[key];
        if (key == index) {
            curCls = "active"
        } else {
            curCls = "";
        }
        result += '<li><a href="' + this.url_for("about/"+key+'.html') + '" class="'+curCls+'">'+name+'</a></li>';
    }
    return result;
});

hexo.extend.helper.register('excerpt', function (post, length) {
    length = length || 200;
    let excerpt;
    if (post.excerpt) {
        excerpt = post.excerpt.replace(/\<[^\>]+\>/g, '');
    } else {
        excerpt = post.content.replace(/\<[^\>]+\>/g, '').substring(0, length);
    }
    return excerpt;
});

hexo.extend.helper.register("load_scripts_for_layout", function ()
{
    let scripts = [
        "js/jquery.min.js",
        "js/tether.min.js",
        "js/bootstrap.min.js",
        "js/common.js"
    ];
    let layout = this.page.layout;
    if ("index" == layout) {
        scripts = scripts.concat([
            "js/index.js"
        ]);
    }
    if ("doc" == layout) {
        scripts = scripts.concat(
            ["js/BootSideMenu.js", 
            "js/maodian.js",
            "js/docs.js"
            ]
        );
    } else if ('api' == this.page.category) {
        scripts = scripts.concat([
            "js/prettify/prettify.js",
            "js/prettify/lang-css.js",
            "js/linenumber.js",
            "js/maodian.js",
            "js/extra.js"
        ]);
    }
    return this.js(scripts)
});

hexo.extend.helper.register("generate_docs_sidebar_for_pc", function ()
{
    //根据版本号获取目录
    let curVersion = this.config.cur_version;
    let key = ("docs/"+curVersion+"/table").replace(/\./g, '');
    let table = this.site.data[key];
    let html = "";
    let articles;
    let chapter;
    let article;
    let curKey;
    let currentPath = this.page.path;
    let activeCls;
    let url;
    for (let i = 0; i < table.length; i++) {
        chapter = table[i];
        html += "<h4>"+chapter.name+"</h4>\n";
        articles = chapter.children || [];
        for (let j = 0; j < articles.length; j++) {
            article = articles[j];
            curKey = "docs/"+curVersion+'/'+chapter.key+'/'+article.key;
            if (_.startsWith(currentPath, curKey)) {
                activeCls = 'class="current"';
            } else {
                activeCls = "";
            }
            url = "/" + curKey+".html";
            html += '<a href="'+url+'" '+activeCls+'>'+article.name+"</a>\n";
        }
    }
    return html;
});

hexo.extend.helper.register("generate_docs_sidebar_site_menu_for_mobile", function ()
{
    //生成网站导航
    let html = '';
    let menu = this.site.data.menu;
    let self = this;
    let curVersion = this.config.cur_version;
    _.each(menu, function (path, title)
    {
        let url = self.url_for(path);
        if (path == "/docs/"){
            url += curVersion+"/";
        }
        html += '<a class="category" href="' + url + '" >'+title+'</a>';
    });
    return html;
});

hexo.extend.helper.register("generate_docs_sidebar_doc_list_for_mobile", function ()
{
    
    //根据版本号获取目录
    let curVersion = this.config.cur_version;
    let key = ("docs/"+curVersion+"/table").replace(/\./g, '');
    let table = this.site.data[key];
    let html = "";
    let articles;
    let chapter;
    let article;
    let curKey;
    let currentPath = this.page.path;
    let activeCls;
    let url;
    for (let i = 0; i < table.length; i++) {
        chapter = table[i];
        html += "<h6>"+chapter.name+"</h6>\n";
        articles = chapter.children || [];
        for (let j = 0; j < articles.length; j++) {
            article = articles[j];
            curKey = "docs/"+curVersion+'/'+chapter.key+'/'+article.key;
            if (_.startsWith(currentPath, curKey)) {
                activeCls = 'class="current"';
            } else {
                activeCls = "";
            }
            url = "/" + curKey+".html";
            html += '<a href="'+url+'" '+activeCls+'>'+article.name+"</a>\n";
        }
    }
    return html;
});

hexo.extend.helper.register('bootstrap_paginator', function (options) {
        options = options || {};

        var current = options.current || this.page.current || 0;
        var total = options.total || this.page.total || 1;
        var endSize = options.hasOwnProperty('end_size') ? +options.end_size : 1;
        var midSize = options.hasOwnProperty('mid_size') ? +options.mid_size : 2;
        var space = options.hasOwnProperty('space') ? options.space : '&hellip;';
        var base = options.base || this.page.base || '';
        var format = options.format || this.config.pagination_dir + '/%d/';
        var prevText = options.prev_text || 'Prev';
        var nextText = options.next_text || 'Next';
        var prevNext = options.hasOwnProperty('prev_next') ? options.prev_next : true;
        var transform = options.transform;
        var self = this;
        var result = '';
        var i;

        if (!current || total == 1) return '';

        var currentPage = '<li class="page-item"><a class="page-link current" href="#">' + (transform ? transform(current) : current) + '</a></li>';

        function link(i) {
            return self.url_for(i === 1 ? base : base + format.replace('%d', i));
        }

        function pageLink(i) {
            return '<li class="page-item"><a class="page-link" href="' + link(i) + '">' + (transform ? transform(i) : i) + '</a></li>';
        }

        result += '<nav aria-label="Page navigation" style="text-align: center"><ul class="pagination">';
        // Display the link to the previous page
        if (prevNext && current > 1) {
            result += '<li class="page-item"><a class="page-link" href="' + link(current - 1) + '" aria-label="Previous"> ' +
                '<span aria-hidden="true">«</span><span class="sr-only">' + prevText + '</span> </a> </li>';
        }

        if (options.show_all) {
            // Display pages on the left side of the current page
            for (i = 1; i < current; i++) {
                result += pageLink(i);
            }

            // Display the current page
            result += currentPage;

            // Display pages on the right side of the current page
            for (i = current + 1; i <= total; i++) {
                result += pageLink(i);
            }
        } else {
            // It's too complicated. May need refactor.
            var leftEnd = current <= endSize ? current - 1 : endSize;
            var rightEnd = total - current <= endSize ? current + 1 : total - endSize + 1;
            var leftMid = current - midSize <= endSize ? current - midSize + endSize : current - midSize;
            var rightMid = current + midSize + endSize > total ? current + midSize - endSize : current + midSize;
            var spaceHtml = '<span class="space">' + space + '</span>';

            // Display pages on the left edge
            for (i = 1; i <= leftEnd; i++) {
                result += pageLink(i);
            }

            // Display spaces between edges and middle pages
            if (space && current - endSize - midSize > 1) {
                result += spaceHtml;
            }

            // Display left middle pages
            if (leftMid > leftEnd) {
                for (i = leftMid; i < current; i++) {
                    result += pageLink(i);
                }
            }

            // Display the current page
            result += currentPage;

            // Display right middle pages
            if (rightMid < rightEnd) {
                for (i = current + 1; i <= rightMid; i++) {
                    result += pageLink(i);
                }
            }

            // Display spaces between edges and middle pages
            if (space && total - endSize - midSize > current) {
                result += spaceHtml;
            }

            // Dispaly pages on the right edge
            for (i = rightEnd; i <= total; i++) {
                result += pageLink(i);
            }
        }

        // Display the link to the next page
        if (prevNext && current < total) {
            result += '<li class="page-item"><a class="page-link" href="' + link(current + 1) + '" aria-label="Next">' +
                '<span aria-hidden="true">»</span><span class="sr-only">' + nextText + '</span> </a></li>'
        }

        result += '</ul></nav>';
        return result;
    }
);

