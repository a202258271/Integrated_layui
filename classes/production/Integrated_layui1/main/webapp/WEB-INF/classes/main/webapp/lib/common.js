// 浠ヤ笅浠ｇ爜鏄厤缃甽ayui鎵╁睍妯″潡鐨勭洰褰曪紝姣忎釜椤甸潰閮介渶瑕佸紩鍏�
layui.config({
    base: getProjectUrl() + 'assets/module/'
}).extend({
    formSelects: 'formSelects/formSelects-v4',
    treetable: 'treetable-lay/treetable',
    dropdown: 'dropdown/dropdown',
    notice: 'notice/notice',
    step: 'step-lay/step',
    dtree: 'dtree/dtree',
    citypicker: 'city-picker/city-picker',
    tableSelect: 'tableSelect/tableSelect'
}).use(['layer', 'admin', 'element'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    var admin = layui.admin;
    var element = layui.element;

    // 鍗曟爣绛炬ā寮忛渶瑕佹牴鎹瓙椤甸潰鐨勫湴鍧€鑱斿姩渚ц竟鏍忕殑閫変腑锛岀敤浜庨€傞厤娴忚鍣ㄥ墠杩涘悗閫€鎸夐挳
    if (window != top && top.layui && top.layui.index && !top.layui.index.pageTabs) {
        top.layui.admin.activeNav(location.href.substring(getProjectUrl().length));
    }

    // 绉婚櫎loading鍔ㄧ敾
    setTimeout(function () {
        admin.removeLoading();
    }, window == top ? 300 : 150);

});

// 鑾峰彇褰撳墠椤圭洰鐨勬牴璺緞锛岄€氳繃鑾峰彇layui.js鍏ㄨ矾寰勬埅鍙朼ssets涔嬪墠鐨勫湴鍧€
function getProjectUrl() {
    var layuiDir = layui.cache.dir;
    if (!layuiDir) {
        var js = document.scripts, last = js.length - 1, src;
        for (var i = last; i > 0; i--) {
            if (js[i].readyState === 'interactive') {
                src = js[i].src;
                break;
            }
        }
        var jsPath = src || js[last].src;
        layuiDir = jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
    }
    return layuiDir.substring(0, layuiDir.indexOf('assets'));
}