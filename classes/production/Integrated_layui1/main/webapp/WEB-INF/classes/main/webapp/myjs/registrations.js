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
        
        
        //指定允许上传的文件类型
        upload.render({
          elem: '#test3'
          ,url: '/upload/'
          ,accept: 'file' //普通文件
          ,done: function(res){
            console.log(res)
          }
        });
      
      //面包屑
        element.on('nav(demo)', function(elem){
          //console.log(elem)
          layer.msg(elem.text());
        });
        
  table.render({
    elem: '#test'
    ,url:URL+'/workOrder/queryAll.do'
//    ,toolbar: '#toolbarDemo'
    ,method: 'post'
    ,title: '工单信息'
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
      ,{field:'id', title:'工单号', width:100, fixed: 'left', unresize: true, sort: true}
      ,{field:'nature', title:'业务性质', width:100, edit: 'text'}
      ,{field:'title', title:'工单标题', width:300, edit: 'text'}
      ,{field:'schedule', title:'进度', width:220, align:"center",sort: true,templet: function(res){
      		 return '<div class="layui-progress" ><div class="layui-progress-bar layui-bg-blue" lay-percent="'+res.schedule+'"></div></div>'
      	  }}
      ,{field:'submitter', title:'提交者', width:100, sort: true}
      ,{field:'accept', title:'受理人员', width:100, sort: true}
      ,{field:'state', title:'工单状态', width:330,align:"center",templet: function(res){
   		if(res.state ==1){
   		 return '<button class="layui-btn layui-btn-xs layui-btn-warm">处理中</button>'
   		}
   		if(res.state ==0){
      		 return '<button class="layui-btn layui-btn-xs  layui-btn-primary">未分配</button>'
      		}
   		if(res.state ==2){
     		 return '<button class="layui-btn layui-btn-xs layui-btn-normal">已处理</button>'
     		}
  	  }}
       
      ,{fixed: 'right', title:'操作' , toolbar: '#table-system-order',width:330, align:"center"}
    ]]
    ,page: true
    ,done: function (res, curr, count) {
        var element = layui.element;
        element.render();
    }
  });
  
   
//监听行工具事件
  table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
      var data = obj.data //获得当前行数据
          ,layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
      var tr = obj.tr; //获得当前行 tr 的DOM对象
      switch(layEvent){
              case 'edit':
              console.debug(data);
              //数据回显
              updateModel(data);
              break;
      }
  });
  
  
  
  //模糊搜索
  form.on('submit(LAY-app-order-search)', function(data){
	   /* layer.msg(JSON.stringify(data.field));*///表格数据序列化
	    var formData = data.field;
	    var id = formData.orderid
	    ,title = formData.title
	    ,nature = formData.attr
	    ,accept = formData.accept;
	    table.reload('tableReload',{
			method:'post',
			where:{
				id:id,
				title:title,
				nature:nature,
				accept:accept,
	    	} 
		});
});
  
  //触发事件 
  element.render("progress");
  
  
//监听行工具事件
  table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
      var data = obj.data //获得当前行数据
          ,layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
      var tr = obj.tr; //获得当前行 tr 的DOM对象
      switch(layEvent){
              case 'edit':
              console.debug(data);
              //数据回显
              updateModel(data);
              break;
      }
  });
  
function updateModel(data){
  	 $("#updateWorkOrderForm")[0].reset();//清空表单
  	 $("#id").val(data.id);
  	$("#nature").val(data.nature);
	$("#title").val(data.title);
	$("#schedule").val(data.schedule);
	$("#state").val(data.state);
	$("#accept").val(data.accept);
      layui.use(['layer'],function () {
          var layer = layui.layer,$=layui.$;
          layer.open({
              type:1,//类型
              maxmin: true,
              closeBtn: 1,
              btn: ['确定', '取消'],
	               yes: function(index){
	            	   var id = $("#id").val();
	            	   var nature = $("#nature").val();
	            	   var title = $("#title").val();
	            	   var schedule = data.schedule
	            	   var state = data.state
	            	   var accept = $("#accept").val();
	            	   $.ajax({
	            			 url:URL+'/workOrder/update.do', 
	            			 type:'POST', 
	            			 dataType:'json', 
	            			 data:{
	            				 id:id,
	            				 nature:nature,
	            				 title:title,
	            				 schedule:schedule,
	            				 state:state,
	            				 accept:accept,
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
	            		                        $("#updateWorkOrderForm")[0].reset();//清空表单
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
	                  },
              area:['400px','390px'],//定义宽和高
              title:'修改工单',//题目
              shadeClose:false,//点击遮罩层关闭
              content: $('#updateModel'),//打开的内容
              anim:5
          });
      })
  }
});

    

    

