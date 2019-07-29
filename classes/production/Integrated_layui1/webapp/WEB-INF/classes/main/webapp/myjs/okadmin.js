layui.use(['element','layer'],function(){
        var element = layui.element;
        var layer = layui.layer;
 
    });
    
    $(".ok-menu").click(function () {
        $(".layui-layout-admin").toggleClass("ok-left-hide");
        $(this).find('i').toggleClass("ok-menu-hide");
        $(".layui-body").toggleClass("ok-left-hide");
    });
    
	//刷新当前
	$(".refresh").on("click",function(){  //此处添加禁止连续点击刷新一是为了降低服务器压力，另外一个就是为了防止超快点击造成chrome本身的一些js文件的报错(不过貌似这个问题还是存在，不过概率小了很多)
		if($(this).hasClass("refreshThis")){
			$(this).removeClass("refreshThis");
			$(".clildFrame .layui-tab-item.layui-show").find("iframe")[0].contentWindow.location.reload(true);
			setTimeout(function(){
				$(".refresh").addClass("refreshThis");
			},2000)
		}else{
			layer.msg("您点击的速度超过了服务器的响应速度，还是等两秒再刷新吧！");
		}
	})

	$("body").on("click", ".okNavMove", function () {
    var moveId = $(this).attr("data-id");
    var that = this;
    alert("")
    this.navMove(moveId, that);
    // console.log(width);
  });
	
	/**
     * 锁屏
     */
    $("#lock").click(function () {
        layer.confirm("确定要锁定账户吗", {skin: 'layui-layer-lan', icon: 4, title: '提示', anim: 1}, function (index) {
            layer.close(index);
            $(".yy").show();
            layer.prompt({
                btn: ['确定'],
                title: '请输入解锁密码',
                closeBtn: 0,
                formType: 1
            }, function (value, index, elem) {
                if (value == "123456") {
                    layer.close(index);
                    $(".yy").hide();
                } else {
                    layer.msg('密码错误', {anim: 6});
                }
            });
        });
    });
	
	//鍏ㄥ睆/閫€鍑哄叏灞�
   /* $("body").on("keydown", function (event) {
        event = event || window.event || arguments.callee.caller.arguments[0];
        if (event && event.keyCode == 27) {
            console.log("Esc");
            $("#fullScreen").children("i").eq(0).removeClass("okicon-screen-restore");
        }
        if (event && event.keyCode == 122) { 
            $("#fullScreen").children("i").eq(0).addClass("okicon-screen-restore");
        }
    });*/
	//全屏
    $("body").on("click", "#fullScreen", function () {
        if ($(this).children("i").hasClass("okicon-screen-restore")) {
            screenFun(2).then(() => {
                $(this).children("i").eq(0).removeClass("okicon-screen-restore");
            });
        } else {
            screenFun(1).then(() => {
                $(this).children("i").eq(0).addClass("okicon-screen-restore");
            });
        }
    });
    
    $(function(){
        $(window).keydown(function (event) {
        	if (event.keyCode == 27) {
        		alert("1")
        	   $("#fullScreen").children("i").eq(0).removeClass("okicon-screen-restore");
           }
           if (event && event.keyCode == 122) { 
               $("#fullScreen").children("i").eq(0).addClass("okicon-screen-restore");
           }
       });
   });
    
    
    function screenFun(num = 1) {
        num = num * 1;
        var docElm = document.documentElement;

        switch (num) {
            case 1:
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                } else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                } else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                } else if (docElm.msRequestFullscreen) {
                    docElm.msRequestFullscreen();
                }
                break;
            case 2:
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                break;
        }

        return new Promise((res, rej) => {
            res("杩斿洖鍊�");
        });
    }
	
    /**
     * 系统公告
     */
    $(document).on("click", "#notice", noticeFun);
    !function () {
        let notice = sessionStorage.getItem("notice");
        if (notice != "true") {
            noticeFun();
        }
    }();
    $('#note').click(function(){  
    	layer.open({
       	 type: 1,
       	 skin: 'layui-layer-molv',
       	 title: '便签',
         closeBtn:1,
       	 fix: false,
       	 shade: 0,
       	 resize :false,
       	 offset: ['50px','1400px'],
       	 area: ['305px', '190px'],
       	 content: '<textarea class="layui-textarea " style="height:148px;"   contenteditable="true">很高兴你能看到这段话，相信你已经付费购买了我的产品，希望能真正意义上帮助到你，本产品如作商用，产生的一切问题由使用者负责！</textarea>'
       });
    	
    }); 
    
    function noticeFun() {
        layer.open({
            type: 0,
            title: "标题",
            btn: "我知道啦",
            btnAlign: 'c',
            content: "ok-admin v2.0上线啦<br />" +
                "在此郑重承诺该模板<span style='color:#5cb85c'>永久免费</span>为大家提供" +
                "<br />若有更好的建议欢迎<span id='noticeQQ'>加入QQ群</span>一起聊",
            yes: (index) => {
                layer.tips('系统公告跑到这里去啦', '#notice', {
                    tips: [1, '#000'],
                    time: 2000
                });
                sessionStorage.setItem("notice", "true");
                layer.close(index);
            },
            cancel: (index) => {
                layer.tips('系统公告跑到这里去啦', '#notice', {
                    tips: [1, '#000'],
                    time: 2000
                });
            }
        });
    }
    
   
    /**
     * QQ群
     */
    $("body").on("click", ".layui-footer button.communication,#noticeQQ", function () {
        layer.tab({
            area: ["330px", "350px"],
            tab: [{
                title: "QQ群",
                content: "<img src='../images/4AA6A74F2E1B14F1EAB12143B693439B.png' width='200' height='300' style='margin-left: 60px'>"
            }]
        });
    });
	
    function ys(val) {
    	if(val==1){ 
   		 $(".okadmin-logo").css("background-color","#20222A");
   	    	$(".layui-side-scroll").css("background-color","#001529");
   	    	$(".user-photo").css("border-top","1px solid #333555");
   	     $(".okadmin-logo").css("color","#FFF");
   	  $(".user-photo p").css("color","#FFF");
   	 $(".layui-nav-tree a").css("color","#FFF");
   	 }if(val==2){
   		 $(".okadmin-logo").css("background-color","MediumBlue");
	    	$(".layui-side-scroll").css("background-color","Blue");
	    	$(".user-photo").css("border-top","1px solid DeepSkyBlue");
	    	$(".okadmin-logo").css("color","PaleTurquoise");
	    	$(".user-photo p").css("color","PaleTurquoise");
	    	  $(".layui-nav-tree a").css("color","PaleTurquoise");
   	 }
    	 if(val==3){
    		 $(".okadmin-logo").css("background-color","DarkGreen");
    	    $(".layui-side-scroll").css("background-color","green");
    	    $(".user-photo").css("border-top","1px solid LimeGreen");
    	    $(".okadmin-logo").css("color","Aquamarine");
    	    $(".user-photo p").css("color","Aquamarine");
    	    $(".layui-nav-tree a").css("color","Aquamarine");
    	 }
    	 /*if(val==4){
    		 $(".okadmin-logo").css("background-color","MintCream");
     	    $(".layui-side-scroll").css("background-color","FloralWhite");
     	    $(".user-photo").css("border-top","1px solid Snow");
     	    $(".okadmin-logo").css("color","black"); 
     	   $(".user-photo p").css("color","black");
     	   $(".layui-nav-tree a").css("color","black");
    	 }*/
     	}
