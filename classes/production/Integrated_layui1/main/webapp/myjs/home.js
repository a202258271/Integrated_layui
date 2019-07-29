var useModel = "countUp"
layui.config({
}).use(useModel, function () {
    var   countUp = layui.countUp;
    init();

    function init() {
    	alert("1")
        var elem_nums = $(".stat-text");
        elem_nums.each(function (i, j) {
            let ran = parseInt(Math.random() * 99 + 1);
            !new countUp({
                target: j,
                endVal: 20 * ran
            }).start();
        });
    };
});