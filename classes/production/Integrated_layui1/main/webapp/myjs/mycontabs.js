
 
    // 左侧导航菜单列表的点击处理
    $('.J_menuItem').on('click',menuItem);



// 左侧导航菜单列表的点击处理
function menuItem() {
    // 获取标识数据
    var dataUrl = $(this).attr('href'),
        dataIndex = $(this).data('index'),
        menuName = $.trim($(this).text()),
        flag = true;
    if (dataUrl == undefined || $.trim(dataUrl).length == 0)return false;

    // 选项卡菜单不存在
    if (flag) {
        // 添加选项卡对应的iframe
        var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex + '" frameborder="0"   id="iframepage" scrolling="no"    src="' + dataUrl + '"  seamless></iframe>';
        $('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);
    }
    return false;
}
layui.use('element', function(){ 
	var element = layui.element; 
	var active={ 
			tabAdd:function(url,id,name){ 
				element.tabAdd('contentnav',{ 
					title:name, 
					content:'<iframe  data-frameid="'+id+'" scrolling="auto" frameborder="0" src="'+url+'" style="width:100%; height:100%"></iframe>',
					id:id 
					});
				rightMenu();
				iframeWH(); 
				}, 
				tabChange:function(id){ 
					element.tabChange('contentnav',id); 
					}, 
					tabDelete:function(id){ 
						element.tabDelete('contentnav',id); 
						}, 
						tabDeleteAll:function(ids){ 
							$.each(ids,function(index,item){ 
								element.tabDelete('contentnav',item);
								});
							} 
						}; 
	$(".site-url").on('click',function(){ 
		var nav=$(this); 
		var length = $("ul.layui-tab-title li").length;
		if(length<=0){ 
			active.tabAdd(nav.attr("data-url"),
					nav.attr("data-id"),
					nav.attr("data-title")); 
			}else{ 
				var isData=false; 
				$.each($("ul.layui-tab-title li"),function(){
					if($(this).attr("lay-id")==nav.attr("data-id")){
						isData=true; 
						} 
					}); 
				if(isData==false){ 
						active.tabAdd(nav.attr("data-url"),
								nav.attr("data-id"),nav.attr("data-title")); 
					} 
					active.tabChange(nav.attr("data-id")); 
				}
		});
	function rightMenu(){ 
			//右击弹出 
			$(".layui-tab-title li").on('contextmenu',function(e){ 
				var menu=$(".rightmenu"); 
				menu.find("li").attr('data-id',$(this).attr("lay-id"));
				l = e.clientX; 
				t = e.clientY; 
				menu.css({left:l, top:t}).show(); 
				return false; 
				});
			//左键点击隐藏 
			$("body,.layui-tab-title li").click(function(){ 
				$(".rightmenu").hide(); 
				}); 
			} 
					function iframeWH(){ 
						var H = $(window).height()-80; 
						$("iframe").css("height",H+"px");
						} 
					$(window).resize(function(){ 
						iframeWH(); 
						});
					
					tabDelete =  function (tabid) {
						 element.tabDelete("contentnav",tabid);
					}

					tabDeleteAll = function (ids) {
					    $.each(ids, function (i, item) {
					    	element.tabDelete("contentnav", item);
					    })
					}
		 
		}); 
$(".okadmin-nav-child dd a").click(function(){
	if($(this).attr("data-num")=="1"){
		var tabid =$(".layui-tab-title .layui-this").attr("lay-id");
		if(tabid==undefined){
			 layer.msg('当前页不能关闭', {
			        time: 2000, //2s后自动关闭
			      });
			return ;
		}
		tabDelete(tabid);
	}else if($(this).attr("data-num") == "3") {
		var tabtitle = $(".layui-tab-title li");
		var ids  = new Array();
		$.each(tabtitle,function(i){
			if($(this).attr("lay-id")!=undefined){
				ids[i] = $(this).attr("lay-id");
			}
			 
		})
		tabDeleteAll(ids);
	}else if($(this).attr("data-num") == "2"){
		var tabtitle = $(".layui-tab-title li");
		var tabid =$(".layui-tab-title .layui-this").attr("lay-id");
		var ids  = new Array();
		$.each(tabtitle,function(i){
			if($(this).attr("lay-id")!=undefined && $(this).attr("lay-id")!=tabid){
				ids[i] = $(this).attr("lay-id");
			}
		})
		tabDeleteAll(ids);
	}
});

 

