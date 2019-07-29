    //注意：这里是数据表格的加载数据，必须写
    layui.use(['table', 'layer', 'form', 'laypage', 'laydate','layedit','upload','element'], function () {
        var table = layui.table;//表格
        var layer = layui.layer; //弹层
        var form = layui.form; //form表单
        var laypage = layui.laypage; //分页
        var laydate = layui.laydate;//日期
        var layedit = layui.layedit//富文本编辑器
        ,$ = layui.jquery;
        var upload = layui.upload;
        var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
        
        var index2 = layedit.build('sign');
        var index1 = layedit.build('sign1');
        
        //指定允许上传的文件类型
        upload.render({
          elem: '#test3'
          ,url: URL+'/users/upload.do'
          ,accept: 'file' //普通文件
          ,done: function(res){
        	  layer.msg(res.message);
          }
        });
      
      //面包屑
        element.on('nav(demo)', function(elem){
          //console.log(elem)
          layer.msg(elem.text());
        });
        
  table.render({
    elem: '#test'
    ,url:URL+'/users/queryAll.do'
    ,toolbar: '#toolbarDemo'
    ,method: 'post'
    ,title: '用户数据表'
   , id: 'tableReload'
    ,totalRow: true
    ,response:{
    	  statusName: 'code' ,// 对应 code
    	  statusCode:0,
    	  msgName: 'msg'  , // 对应 msg
    	  countName: 'count' , // 对应 count
    	  dataName: 'data'  // 对应 data
    	}
    ,cols: [[
      {type: 'checkbox', fixed: 'left'}
      ,{field:'id', title:'ID', width:80, fixed: 'left', unresize: true, sort: true, totalRowText: '合计'}
      ,{field:'username', title:'用户名', width:120, edit: 'text',templet: function(res){
    	  return '<a href="/?table-demo-id={{d.id}}" class="layui-table-link" target="_blank">'+res.username+'</a>'
      }}
      ,{field:'email', title:'邮箱', width:150, edit: 'text', templet: function(res){
        return '<em>'+ res.email +'</em>'
      }}
      ,{field:'experience', title:'积分', width:80, sort: true, totalRow: true}
      ,{field:'sex', title:'性别', width:80, sort: true,templet: function(res){
    	  if(res.sex == 1){
    		  return '<span style="color:blue;">男</span>'
    	  }else{
    		  return '<span style="color: #F581B1;">女</span>'
    	  }
      }}
      ,{field:'logins', title:'登入次数', width:100, sort: true, totalRow: true}
      ,{field:'sign', title:'签名'}
      ,{field:'city', title:'城市', width:100}
      ,{field:'state', title:'状态', width:100,templet: function(res){
    	  if(res.state == 1){
   		   return '<input type="checkbox" checked="" name="open" value = '+res.state+"="+res.id+' lay-skin="switch"     lay-filter="switchTest" lay-text="开启|禁用">'
   	  }else{
   		return '<input type="checkbox"  name="open" value = '+res.state+"="+res.id+' lay-skin="switch"   lay-filter="switchTest" lay-text="开启|禁用">'
   	  }
     }}
      ,{field:'ip', title:'IP', width:120}
      ,{field:'jointime', title:'加入时间', width:120}
      ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width:180}
    ]]
    ,page: true
  });

  
  
  //工具栏事件
  table.on('toolbar(test)', function(obj){
    var checkStatus = table.checkStatus(obj.config.id);
    switch(obj.event){
      case 'getCheckData':
        var data = checkStatus.data;
        layer.alert(JSON.stringify(data));
      break;
      case 'getCheckLength':
        var data = checkStatus.data;
        layer.msg('选中了：'+ data.length + ' 个');
      break;
      case 'isAll':
        layer.msg(checkStatus.isAll ? '全选': '未全选')
      break;
      case'reload':
    	  var username=$("#demoReload").val();
    	  	table.reload('tableReload',{
    	  		method:'post',
    	  		where:{
    	  			username:username
    	      	} 
    	  	});
    };
  });
  
  
  
//监听行工具事件
  table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
      var data = obj.data //获得当前行数据
          ,layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
      var tr = obj.tr; //获得当前行 tr 的DOM对象
      switch(layEvent){
          case 'del':
              layer.confirm('您确定删除此行数据？', function(index){
                  //向服务端发送删除指令，在这里可以使用Ajax异步
                  $.post(URL+"/users/delete.do", { id: data.id }, function (resultJSONObject) {
                      if (resultJSONObject.status == "00") {//删除成功，刷新当前页表格
                          layer.msg(resultJSONObject.message, { icon: 1, time: 1500 }, function () {
                              obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                              layer.close(index);
                              table.reload('tableReload');//数据表格重载
                              // $(".layui-laypage-btn").click();//点击分页刷新当前页
                          });
                      }else{  //删除失败
                          layer.alert(resultJSONObject.message, { icon: 2},function () {
                              layer.close(index);
                              // $(".layui-laypage-btn").click();
                              window.location.reload();
                          });
                      }
                  });
              });
              break;
              case 'edit':
              console.debug(data);
              //数据回显
              
              updateModel(data);
              break;
      }
  });


//layui.use(['form','layer'], function(){
//	  var form = layui.form
//      ,layer = layui.layer
//       ,$=layui.jquery

//监听提交
form.on('submit(formDemo)', function(data){
	console.log(data.field);
    layer.msg(JSON.stringify(data.field));//表格数据序列化
    var formData = data.field;
    if(formData.state == "on") { 
    	formData.state = "1"; 
    	}
    else {
    	formData.state = "0";
    		}
    var username = formData.username,
    city = formData.city,
    email=formData.email,
    sex=formData.sex,
    state = formData.state;
    var sign = layedit.getContent(index2)
	 $.ajax({
		 url:URL+'/users/addusers.do', 
		 type:'POST', 
		 dataType:'json', 
		 data:{
			 "username":username,
			 "city":city,
			 "email":email,
			 "sex":sex,
			 "sign":sign,
			 "state":state
			 }, 
			 success:function (resultJSONObject) { 
				 if(resultJSONObject.status == "00"){
		                index = layer.msg(resultJSONObject.message, {
		                    icon: 6
		                    ,shade: 0.6,
		                    time: 2000
		                },function () {
		                	layer.closeAll('page');
	                        table.reload('tableReload');//数据表格重载
	                        $("#addUsersForm")[0].reset();//清空表单
		                });
		            }else{
		                layer.msg(resultJSONObject.message, {
		                    icon: 9
		                    ,shade: 0.6,
		                    time: 2000
		                });
		            }
					 } 
	 		}) ;
	 		            return false;//false：阻止表单跳转  true：表单跳转
	});

//监听提交
form.on('submit(updateformDemo)', function(data){
    layer.msg(JSON.stringify(data.field));//表格数据序列化
    var formData = data.field;
    if(formData.state == undefined  ){
    	formData.state ='0';
    }else if(formData.state  == 0){
    	formData.state ='1';
    }
    var username = formData.username,
    id = formData.id,
    city = formData.city,
    email=formData.email,
    sex=formData.sex1,
    state = formData.state;
    var sign = layedit.getContent(index1)
	 $.ajax({
		 url:URL+'/users/update.do', 
		 type:'POST', 
		 dataType:'json', 
		 data:{
			 "id":id,
			 "username":username,
			 "city":city,
			 "email":email,
			 "sex":sex,
			 "sign":sign,
			 "state":state
			 }, 
			 success:function (resultJSONObject) { 
				 if(resultJSONObject.status == "00"){
		                index = layer.msg(resultJSONObject.message, {
		                    icon: 6
		                    ,shade: 0.6,
		                    time: 2000
		                },function () {
		                	layer.closeAll('page');
	                        table.reload('tableReload');//数据表格重载
	                        $("#updateUsersForm")[0].reset();//清空表单
		                });
		            }else{
		                layer.msg(resultJSONObject.message, {
		                    icon: 9
		                    ,shade: 0.6,
		                    time: 2000
		                });
		            }
					 } 
	 		}) ;
	 		            return false;//false：阻止表单跳转  true：表单跳转
	});

form.on('switch(switchTest)', function(data){	
	var val = this.value.split("=");
	 var i ;
	if(val[0]  ==1){
		i=0;
	}else{
		i=1;
	}
	//短信通知状态更新
	$.ajax({
	  type: 'POST',
	  url: URL+'/users/updateState.do',
	  data: {"id":val[1],"state":i},
	  dataType:'json', 
	  beforeSend:function(){
		  layer.msg('正在切换中，请稍候',{icon: 16,time:1000,shade:0.8});     
		  },
	 success: function(resultJSONObject){  
	  if(resultJSONObject.status == "00"){ 
		  setTimeout(function(){layer.msg('操作成功！');},2000);  
		  table.reload('tableReload');//数据表格重载
		  }else{
			  console.log(resultJSONObject);layer.msg('数据异常，操作失败！');
			  }
		  },		  
		});	
	});
});
    
    function openModak(){
        layui.use(['layer'],function () {
            var layer = layui.layer,$=layui.$;
            layer.open({
                type:1,//类型
                maxmin: true,
                area:['700px','540px'],//定义宽和高
                title:'添加用户',//题目
                shadeClose:false,//点击遮罩层关闭
                content: $('#motaikunag'),//打开的内容
                anim:4
            });
        })
    }
    
    function updateModel(data){
    	 $("#updateUsersForm")[0].reset();//清空表单
    	$("#id").val(data.id);
        $("#username1").val(data.username);
        $("#email1").val(data.email);
        $("#city1").val(data.city);
        if(data.state == 1){
        	$("#switch1").val(data.state).attr("checked",true); 
        }else{
        	$("#switch1").val(data.state).attr("checked",false); 
        }
        $("input[name='sex1'][value="+data.sex+"]").prop("checked",true); 
        $("#sign1").val(data.sign);
        layui.use(['layer'],function () {
            var layer = layui.layer,$=layui.$;
            layer.open({
                type:1,//类型
                maxmin: true,
                area:['700px','540px'],//定义宽和高
                title:'修改用户',//题目
                shadeClose:false,//点击遮罩层关闭
                content: $('#updateModel'),//打开的内容
                anim:4
            });
        })
    }
    

