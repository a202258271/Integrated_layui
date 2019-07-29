layui.use('carousel', function () {
            var carousel = layui.carousel;
            //***************************建造实例
            
            var ins=carousel.render({
                elem: '#test1'
                , width: '100%'     //设置容器宽度
                , arrow: 'always'    //始终显示箭头，可选hover,none
                //,anim: 'updown'    //切换动画方式，可选fade,default
                , full: false        //全屏
                , autoplay: true     //自动切换
                , interval: 5000     //自动切换的时间间隔
                , index: 3           //初始化时item索引,默认时0
                , indicator:'inside' //指示器位置，可选outside,none
            });
            
            var ins=carousel.render({
                elem: '#test2'
                , width: '100%'     //设置容器宽度
                , arrow: 'always'    //始终显示箭头，可选hover,none
                //,anim: 'updown'    //切换动画方式，可选fade,default
                , full: false        //全屏
                , autoplay: true     //自动切换
                , interval: 5000     //自动切换的时间间隔
                , index: 3           //初始化时item索引,默认时0
                , indicator:'inside' //指示器位置，可选outside,none
            });

            //**************************监听轮播切换事件
            carousel.on('change(carofilter)', function (obj) { //test1来源于对应HTML容器的 lay-filter="test1" 属性值
                console.log(obj.index);     //当前条目的索引
                console.log(obj.prevIndex); //上一个条目的索引
                console.log(obj.item);      //当前条目的元素对象
            });

            //****************************重置轮播
            //var ins = carousel.render(options);
            ins.reload({arrow:'hover'});//将arror从alway变成hover
        });


layui.use('element', function(){
	  var $ = layui.jquery
	  ,element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
	  
	  //触发事件
	  var active = {
	    setPercent: function(){
	      //设置50%进度
	      element.progress('demo', '50%')
	    }
	    ,loading: function(othis){
	      var DISABLED = 'layui-btn-disabled';
	      if(othis.hasClass(DISABLED)) return;
	    
	      //模拟loading
	      var n = 0, timer = setInterval(function(){
	        n = n + Math.random()*10|0;  
	        if(n>100){
	          n = 100;
	          clearInterval(timer);
	          othis.removeClass(DISABLED);
	        }
	        element.progress('demo', n+'%');
	      }, 300+Math.random()*1000);
	      
	      othis.addClass(DISABLED);
	    }
	  };
	  
	  $('.site-demo-active').on('click', function(){
	    var othis = $(this), type = $(this).data('type');
	    active[type] ? active[type].call(this, othis) : '';
	  });
	  

	});

	 