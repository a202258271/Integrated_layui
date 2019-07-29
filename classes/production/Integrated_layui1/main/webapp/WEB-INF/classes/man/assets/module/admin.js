/** EasyWeb iframe v3.1.0 data:2019-01-17 */

layui.define(['layer'], function (exports) {
    var $ = layui.jquery;
    var layer = layui.layer;
    var bodyDOM = '.layui-layout-admin>.layui-body';
    var tabDOM = bodyDOM + '>.layui-tab';
    var sideDOM = '.layui-layout-admin>.layui-side>.layui-side-scroll';
    var headerDOM = '.layui-layout-admin>.layui-header';
    var tabFilter = 'admin-pagetabs';
    var navFilter = 'admin-side-nav';

    var admin = {
        defaultTheme: 'admin',  // é»˜è®¤ä¸»é¢˜
        tableName: 'easyweb',  // å­˜å‚¨è¡¨å
        // è®¾ç½®ä¾§æ æŠ˜å 
        flexible: function (expand) {
            var isExapnd = $('.layui-layout-admin').hasClass('admin-nav-mini');
            if (isExapnd == !expand) {
                return;
            }
            if (expand) {
                $('.layui-layout-admin').removeClass('admin-nav-mini');
            } else {
                $('.layui-layout-admin').addClass('admin-nav-mini');
            }
            admin.removeNavHover();
        },
        // è®¾ç½®å¯¼èˆªæ é€‰ä¸­
        activeNav: function (url) {
            if (!url) {
                url = window.location.pathname;
                var us = url.split('/');
                url = us[us.length - 1];
            }
            if (url && url != '') {
                $(sideDOM + '>.layui-nav .layui-nav-item .layui-nav-child dd').removeClass('layui-this');
                $(sideDOM + '>.layui-nav .layui-nav-item').removeClass('layui-this');
                var $a = $(sideDOM + '>.layui-nav a[lay-href="' + url + '"]');
                if ($a && $a.length > 0) {
                    if ($(sideDOM + '>.layui-nav').attr('lay-accordion') == 'true') {
                        $(sideDOM + '>.layui-nav .layui-nav-item').removeClass('layui-nav-itemed');
                    }
                    $a.parent().addClass('layui-this');  // é€‰ä¸­å½“å‰
                    $a.parent('dd').parents('.layui-nav-child').parent().addClass('layui-nav-itemed');  // å±•å¼€æ‰€æœ‰çˆ¶çº§
                    // é€‚é…å¤šç³»ç»Ÿæ¨¡å¼
                    $('ul[lay-filter="' + navFilter + '"]').addClass('layui-hide');
                    var $aUl = $a.parents('.layui-nav');
                    $aUl.removeClass('layui-hide');
                    $(headerDOM + '>.layui-nav>.layui-nav-item').removeClass('layui-this');
                    $(headerDOM + '>.layui-nav>.layui-nav-item>a[nav-bind="' + $aUl.attr('nav-id') + '"]').parent().addClass('layui-this');
                } else {
                    // console.warn(url + ' is not in left side');
                }
            } else {
                console.warn('active url not be null');
            }
        },
        // å³ä¾§å¼¹å‡º
        popupRight: function (param) {
            if (param.title == undefined) {
                param.title = false;
                param.closeBtn = false;
            }
            if (param.anim == undefined) {
                param.anim = 2;
            }
            if (param.fixed == undefined) {
                param.fixed = true;
            }
            param.isOutAnim = false;
            param.offset = 'r';
            param.shadeClose = true;
            param.area = '336px';
            param.skin = 'layui-layer-adminRight';
            param.move = false;
            return admin.open(param);
        },
        // å°è£…layer.open
        open: function (param) {
            if (!param.area) {
                param.area = (param.type == 2) ? ['360px', '300px'] : '360px';
            }
            if (!param.skin) {
                param.skin = 'layui-layer-admin';
            }
            if (!param.offset) {
                param.offset = '35px';
            }
            if (param.fixed == undefined) {
                param.fixed = false;
            }
            param.resize = param.resize != undefined ? param.resize : false;
            param.shade = param.shade != undefined ? param.shade : .1;
            var eCallBack = param.end;
            param.end = function () {
                layer.closeAll('tips');
                eCallBack && eCallBack();
            };
            return layer.open(param);
        },
        // å°è£…ajaxè¯·æ±‚ï¼Œè¿”å›žæ•°æ®ç±»åž‹ä¸ºjson
        req: function (url, data, success, method) {
            admin.ajax({
                url: url,
                data: data,
                type: method,
                dataType: 'json',
                success: success
            });
        },
        // å°è£…ajaxè¯·æ±‚
        ajax: function (param) {
            var successCallback = param.success;
            param.success = function (result, status, xhr) {
                // åˆ¤æ–­ç™»å½•è¿‡æœŸå’Œæ²¡æœ‰æƒé™
                var jsonRs;
                if ('json' == param.dataType.toLowerCase()) {
                    jsonRs = result;
                } else {
                    jsonRs = admin.parseJSON(result);
                }
                if (jsonRs && admin.ajaxSuccessBefore(jsonRs) == false) {
                    return;
                }
                successCallback(result, status, xhr);
            };
            param.error = function (xhr) {
                param.success({code: xhr.status, msg: xhr.statusText});
            };
            param.beforeSend = function (xhr) {
                var headers = admin.getAjaxHeaders();
                for (var i = 0; i < headers.length; i++) {
                    xhr.setRequestHeader(headers[i].name, headers[i].value);
                }
            };
            $.ajax(param);
        },
        // ajaxé¢„å¤„ç†
        ajaxSuccessBefore: function (res) {
            if (res.code == 401) {
                layer.msg(res.msg, {icon: 2, time: 1500}, function () {
                    // location.replace('./login');
                }, 1000);
                return false;
            }
        },
        // ajaxç»Ÿä¸€ä¼ é€’header
        getAjaxHeaders: function () {
            var headers = new Array();
            // headers.push({name: 'token', value: 'xxx'});
            return headers;
        },
        // åˆ¤æ–­æ˜¯å¦ä¸ºjson
        parseJSON: function (str) {
            if (typeof str == 'string') {
                try {
                    var obj = JSON.parse(str);
                    if (typeof obj == 'object' && obj) {
                        return obj;
                    }
                } catch (e) {
                    console.warn(e);
                }
            }
        },
        // æ˜¾ç¤ºåŠ è½½åŠ¨ç”»
        showLoading: function (elem) {
            if (!elem) {
                elem = 'body';
            }
            $(elem).addClass('page-no-scroll');
            $(elem).append('<div class="page-loading"><div class="rubik-loader"></div></div>');
        },
        // ç§»é™¤åŠ è½½åŠ¨ç”»
        removeLoading: function (elem) {
            if (!elem) {
                elem = 'body';
            }
            $(elem).children('.page-loading').remove();
            $(elem).removeClass('page-no-scroll');
        },
        // ç¼“å­˜ä¸´æ—¶æ•°æ®
        putTempData: function (key, value) {
            if (value != undefined && value != null) {
                layui.sessionData('tempData', {key: key, value: value});
            } else {
                layui.sessionData('tempData', {key: key, remove: true});
            }
        },
        // èŽ·å–ç¼“å­˜ä¸´æ—¶æ•°æ®
        getTempData: function (key) {
            return layui.sessionData('tempData')[key];
        },
        // æ»‘åŠ¨é€‰é¡¹å¡
        rollPage: function (d) {
            var $tabTitle = $(tabDOM + '>.layui-tab-title');
            var left = $tabTitle.scrollLeft();
            if ('left' === d) {
                $tabTitle.animate({'scrollLeft': left - 120}, 100);
            } else if ('auto' === d) {
                var autoLeft = 0;
                $tabTitle.children("li").each(function () {
                    if ($(this).hasClass('layui-this')) {
                        return false;
                    } else {
                        autoLeft += $(this).outerWidth();
                    }
                });
                $tabTitle.animate({'scrollLeft': autoLeft - 120}, 100);
            } else {
                $tabTitle.animate({'scrollLeft': left + 120}, 100);
            }
        },
        // åˆ·æ–°å½“å‰tab
        refresh: function (url) {
            var $iframe;
            if (!url) {
                $iframe = $(tabDOM + '>.layui-tab-content>.layui-tab-item.layui-show>.admin-iframe');
                if (!$iframe || $iframe.length <= 0) {
                    $iframe = $(bodyDOM + '>.admin-iframe');
                }
            } else {
                $iframe = $(tabDOM + '>.layui-tab-content>.layui-tab-item>.admin-iframe[lay-id="' + url + '"]');
                if (!$iframe || $iframe.length <= 0) {
                    $iframe = $(bodyDOM + '>.admin-iframe');
                }
            }
            if ($iframe && $iframe[0]) {
                $iframe[0].contentWindow.location.reload(true);
            } else {
                console.warn(url + ' is not found');
            }
        },
        // å…³é—­å½“å‰é€‰é¡¹å¡
        closeThisTabs: function (url) {
            admin.closeTabOperNav();
            var $title = $(tabDOM + '>.layui-tab-title');
            if (!url) {
                if ($title.find('li').first().hasClass('layui-this')) {
                    layer.msg('ä¸»é¡µä¸èƒ½å…³é—­', {icon: 2});
                    return;
                }
                $title.find('li.layui-this').find(".layui-tab-close").trigger("click");
            } else {
                if (url == $title.find('li').first().attr('lay-id')) {
                    layer.msg('ä¸»é¡µä¸èƒ½å…³é—­', {icon: 2});
                    return;
                }
                $title.find('li[lay-id="' + url + '"]').find(".layui-tab-close").trigger("click");
            }
        },
        // å…³é—­å…¶ä»–é€‰é¡¹å¡
        closeOtherTabs: function (url) {
            if (!url) {
                $(tabDOM + '>.layui-tab-title li:gt(0):not(.layui-this)').find('.layui-tab-close').trigger('click');
            } else {
                $(tabDOM + '>.layui-tab-title li:gt(0)').each(function () {
                    if (url != $(this).attr('lay-id')) {
                        $(this).find('.layui-tab-close').trigger('click');
                    }
                });
            }
            admin.closeTabOperNav();
        },
        // å…³é—­æ‰€æœ‰é€‰é¡¹å¡
        closeAllTabs: function () {
            $(tabDOM + '>.layui-tab-title li:gt(0)').find('.layui-tab-close').trigger('click');
            $(tabDOM + '>.layui-tab-title li:eq(0)').trigger('click');
            admin.closeTabOperNav();
        },
        // å…³é—­é€‰é¡¹å¡æ“ä½œèœå•
        closeTabOperNav: function () {
            $('.layui-icon-down .layui-nav .layui-nav-child').removeClass('layui-show');
        },
        // è®¾ç½®ä¸»é¢˜
        changeTheme: function (theme) {
            if (theme) {
                layui.data(admin.tableName, {key: 'theme', value: theme});
                if ('admin' == theme) {
                    theme = undefined;
                }
            } else {
                layui.data(admin.tableName, {key: 'theme', remove: true});
            }
            admin.removeTheme(top);
            !theme || top.layui.link(admin.getThemeDir() + theme + '.css', theme);
            var ifs = top.window.frames;
            for (var i = 0; i < ifs.length; i++) {
                var tif = ifs[i];
                try {
                    admin.removeTheme(tif);
                } catch (e) {
                }
                if (theme && tif.layui) {
                    tif.layui.link(admin.getThemeDir() + theme + '.css', theme);
                }
            }
        },
        // ç§»é™¤ä¸»é¢˜
        removeTheme: function (w) {
            if (!w) {
                w = window;
            }
            if (w.layui) {
                var themeId = 'layuicss-theme';
                w.layui.jquery('link[id^="' + themeId + '"]').remove();
            }
        },
        // èŽ·å–ä¸»é¢˜ç›®å½•
        getThemeDir: function () {
            return layui.cache.base + 'theme/';
        },
        // å…³é—­iframeæ‰€åœ¨çš„layerå¼¹çª—
        closeThisDialog: function () {
            parent.layer.close(parent.layer.getFrameIndex(window.name));
        },
        // å…³é—­æ‰€åœ¨çš„å¼¹çª—
        closeDialog: function (elem) {
            var id = $(elem).parents('.layui-layer').attr('id').substring(11);
            layer.close(id);
        },
        // è®©å½“å‰çš„iframå¼¹å±‚è‡ªé€‚åº”é«˜åº¦
        iframeAuto: function () {
            parent.layer.iframeAuto(parent.layer.getFrameIndex(window.name));
        },
        // èŽ·å–æµè§ˆå™¨é«˜åº¦
        getPageHeight: function () {
            return document.documentElement.clientHeight || document.body.clientHeight;
        },
        // èŽ·å–æµè§ˆå™¨å®½åº¦
        getPageWidth: function () {
            return document.documentElement.clientWidth || document.body.clientWidth;
        },
        // å…³é—­å¯¼èˆªèœå•æŠ˜å æ‚¬æµ®æ•ˆæžœ
        removeNavHover: function () {
            $('.admin-nav-hover>.layui-nav-child').css({
                'top': 'auto',
                'max-height': 'none',
                'overflow': 'auto'
            });
            $('.admin-nav-hover').removeClass('admin-nav-hover');
        },
        // è‡ªåŠ¨è®¡ç®—å¯¼èˆªèœå•æ‚¬æµ®çš„æ ·å¼
        setNavHoverCss: function ($that) {
            var $nav = $('.admin-nav-hover>.layui-nav-child');
            if ($that && $nav.length > 0) {
                var isOver = ($that.offset().top + $nav.outerHeight()) > window.innerHeight;  // æ˜¯å¦æº¢å‡ºå±å¹•
                if (isOver) {
                    var newTop = $that.offset().top - $nav.outerHeight() + $that.outerHeight();
                    if (newTop < 50) {
                        var pageHeight = admin.getPageHeight();
                        if ($that.offset().top < pageHeight / 2) {
                            $nav.css({
                                'top': '50px',
                                'max-height': pageHeight - 50 + 'px',
                                'overflow': 'auto'
                            });
                        } else {
                            $nav.css({
                                'top': $that.offset().top,
                                'max-height': pageHeight - $that.offset().top,
                                'overflow': 'auto'
                            });
                        }
                    } else {
                        $nav.css('top', newTop);
                    }
                } else {
                    $nav.css('top', $that.offset().top);
                }
                isHover = true;
            }
        }
    };

    // ewAdminæä¾›çš„äº‹ä»¶
    admin.events = {
        // æŠ˜å ä¾§å¯¼èˆª
        flexible: function (e) {
            var expand = $('.layui-layout-admin').hasClass('admin-nav-mini');
            admin.flexible(expand);
        },
        // åˆ·æ–°ä¸»ä½“éƒ¨åˆ†
        refresh: function () {
            admin.refresh();
        },
        //åŽé€€
        back: function () {
            history.back();
        },
        // è®¾ç½®ä¸»é¢˜
        theme: function () {
            var url = $(this).attr('data-url');
            admin.popupRight({
                type: 2,
                content: url ? url : 'page/tpl/tpl-theme.html'
            });
        },
        // æ‰“å¼€ä¾¿ç­¾
        note: function () {
            var url = $(this).attr('data-url');
            admin.popupRight({
                id: 'layer-note',
                title: 'ä¾¿ç­¾',
                type: 2,
                closeBtn: false,
                content: url ? url : 'page/tpl/tpl-note.html'
            });
        },
        // æ‰“å¼€æ¶ˆæ¯
        message: function () {
            var url = $(this).attr('data-url');
            admin.popupRight({
                type: 2,
                content: url ? url : 'page/tpl/tpl-message.html'
            });
        },
        // æ‰“å¼€ä¿®æ”¹å¯†ç å¼¹çª—
        psw: function () {
            var url = $(this).attr('data-url');
            admin.open({
                id: 'pswForm',
                type: 2,
                title: 'ä¿®æ”¹å¯†ç ',
                shade: 0,
                content: url ? url : 'page/tpl/tpl-password.html'
            });
        },
        // é€€å‡ºç™»å½•
        logout: function () {
            var url = $(this).attr('data-url');
            layer.confirm('ç¡®å®šè¦é€€å‡ºç™»å½•å—ï¼Ÿ', {
                title: 'æ¸©é¦¨æç¤º',
                skin: 'layui-layer-admin'
            }, function () {
                location.replace(url ? url : '/');
            });
        },
        // å…¨å±
        fullScreen: function (e) {
            var ac = 'layui-icon-screen-full', ic = 'layui-icon-screen-restore';
            var ti = $(this).find('i');

            var isFullscreen = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || false;
            if (isFullscreen) {
                var efs = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
                if (efs) {
                    efs.call(document);
                } else if (window.ActiveXObject) {
                    var ws = new ActiveXObject('WScript.Shell');
                    ws && ws.SendKeys('{F11}');
                }
                ti.addClass(ac).removeClass(ic);
            } else {
                var el = document.documentElement;
                var rfs = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
                if (rfs) {
                    rfs.call(el);
                } else if (window.ActiveXObject) {
                    var ws = new ActiveXObject('WScript.Shell');
                    ws && ws.SendKeys('{F11}');
                }
                ti.addClass(ic).removeClass(ac);
            }
        },
        // å·¦æ»‘åŠ¨tab
        leftPage: function () {
            admin.rollPage("left");
        },
        // å³æ»‘åŠ¨tab
        rightPage: function () {
            admin.rollPage();
        },
        // å…³é—­å½“å‰é€‰é¡¹å¡
        closeThisTabs: function () {
            admin.closeThisTabs();
        },
        // å…³é—­å…¶ä»–é€‰é¡¹å¡
        closeOtherTabs: function () {
            admin.closeOtherTabs();
        },
        // å…³é—­æ‰€æœ‰é€‰é¡¹å¡
        closeAllTabs: function () {
            admin.closeAllTabs();
        },
        // å…³é—­å½“å‰iframeå¼¹çª—
        closeDialog: function () {
            admin.closeThisDialog();
        },
        // å…³é—­å½“å‰iframeå¼¹çª—
        closePageDialog: function () {
            admin.closeDialog(this);
        }
    };

    // æ‰€æœ‰ew-event
    $('body').on('click', '*[ew-event]', function () {
        var event = $(this).attr('ew-event');
        var te = admin.events[event];
        te && te.call(this, $(this));
    });

    // ç§»åŠ¨è®¾å¤‡é®ç½©å±‚ç‚¹å‡»äº‹ä»¶
    $('.site-mobile-shade').click(function () {
        admin.flexible(true);
    });

    // ä¾§å¯¼èˆªæŠ˜å çŠ¶æ€ä¸‹é¼ æ ‡ç»è¿‡æ˜¾ç¤ºæç¤º
    var isHover = false;
    $('body').on('mouseenter', '.layui-layout-admin.admin-nav-mini .layui-side .layui-nav .layui-nav-item>a', function () {
        if (admin.getPageWidth() > 750) {
            var $that = $(this);
            $('.admin-nav-hover>.layui-nav-child').css('top', 'auto');
            $('.admin-nav-hover').removeClass('admin-nav-hover');
            $that.parent().addClass('admin-nav-hover');
            var $nav = $('.admin-nav-hover>.layui-nav-child');
            if ($nav.length > 0) {
                admin.setNavHoverCss($that);
            } else {
                var tipText = $that.find('cite').text();
                var bgColor = $('.layui-layout-admin .layui-side').css('background-color');
                bgColor = (bgColor == 'rgb(255, 255, 255)' ? '#009688' : bgColor);
                layer.tips(tipText, $that, {tips: [2, bgColor], time: -1});
            }
        }
    }).on('mouseleave', '.layui-layout-admin.admin-nav-mini .layui-side .layui-nav .layui-nav-item>a', function () {
        layer.closeAll('tips');
    });

    // é¼ æ ‡ç¦»å¼€ä¾§å¯¼èˆªå…³é—­æŠ˜å æµ®çª—
    $('body').on('mouseleave', '.layui-layout-admin.admin-nav-mini .layui-side', function () {
        isHover = false;
        setTimeout(function () {
            if (!isHover) {
                admin.removeNavHover();
            }
        }, 500);
    });

    $('body').on('mouseenter', '.layui-layout-admin.admin-nav-mini .layui-side .layui-nav .layui-nav-item.admin-nav-hover .layui-nav-child', function () {
        isHover = true;
    });

    // ä¾§å¯¼èˆªæŠ˜å çŠ¶æ€ä¸‹ç‚¹å‡»å±•å¼€
    /*$('body').on('click', '.layui-layout-admin.admin-nav-mini .layui-side .layui-nav .layui-nav-item>a', function () {
        if (admin.getPageWidth() > 750) {
            layer.closeAll('tips');
            $('li.layui-nav-itemed').removeClass('layui-nav-itemed');
            $(this).parent().addClass('layui-nav-itemed');
            admin.flexible(true);
        }
    });*/

    // æ‰€æœ‰lay-tipså¤„ç†
    $('body').on('mouseenter', '*[lay-tips]', function () {
        var tipText = $(this).attr('lay-tips');
        var dt = $(this).attr('lay-direction');
        var bgColor = $(this).attr('lay-bg');
        layer.tips(tipText, this, {tips: [dt || 3, bgColor || '#333333'], time: -1});
    }).on('mouseleave', '*[lay-tips]', function () {
        layer.closeAll('tips');
    });

    // æ‰€æœ‰ew-hrefå¤„ç†
    $('body').on('click', '*[ew-href]', function () {
        var url = $(this).attr('ew-href');
        var title = $(this).text();
        top.layui.index.openTab({
            title: title,
            url: url
        });
    });

    // å¸®åŠ©é¼ æ ‡å³é”®èœå•å®Œæˆç‚¹å‡»ç©ºç™½å…³é—­çš„åŠŸèƒ½
    if (!layui.contextMenu) {
        $(document).off('click.ctxMenu').on('click.ctxMenu', function () {
            var ifs = top.window.frames;
            for (var i = 0; i < ifs.length; i++) {
                var tif = ifs[i];
                try {
                    tif.layui.jquery('.ctxMenu').remove();
                } catch (e) {
                }
            }
            top.layui.jquery('.ctxMenu').remove();
        });
    }

    // åŠ è½½ç¼“å­˜çš„ä¸»é¢˜
    var theme = layui.data(admin.tableName).theme;
    if (theme) {
        (theme == 'admin') || layui.link(admin.getThemeDir() + theme + '.css', theme);
    } else if ('admin' != admin.defaultTheme) {
        layui.link(admin.getThemeDir() + admin.defaultTheme + '.css', admin.defaultTheme);
    }

    // åˆ¤æ–­æ˜¯å¦å¼€å¯å¤šæ ‡ç­¾
    if (top.layui && top.layui.index && top.layui.index.pageTabs) {
        $('body').addClass('tab-open');
    }

    exports('admin', admin);
});
