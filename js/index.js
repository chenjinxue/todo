$(function(){
	var add=$("#add");
	var ul=$("#ul");
	var li=$("li")
	var input=$("#input");
	var todos=[];//存储todos数据
	var startpos;//滑动起始位置
	var arr=[];
	
	
   if (localStorage.todos) {
		arr=JSON.parse(localStorage.todos);
		for(var i=0;i<arr.length;i++){
			var c=arr[i].state?'done':'';
			var d=arr[i].state?'btndone':'';
			$("<li class="+c+"><div class='btn "+d+"'></div><div class='content'>"+arr[i].name+ "</div></li>").appendTo(ul);
		}
	}
	add.on("touchend",function  () {
		var val=$.trim(input.val());
		if(val){
			arr.push({name:val,state:0});
			localStorage.todos=JSON.stringify(arr);
			$("<li><div class='btn'></div><div class='content'>"+val+ "</div></li>").appendTo(ul);
			input.val("");
		}
	})
	ul.on("touchstart","li",function  (e) {
		start=e.originalEvent.changedTouches[0].clientX;
	})
	
	ul.on("touchend","li",function  (e) {
		var end=e.originalEvent.changedTouches[0].clientX;
		if(end-start>50){
			arr.splice($(this).index(),1);
			localStorage.todos=JSON.stringify(arr);
			$(this).addClass("active").delay(800).queue(function  () {
				$(this).remove().dequeue();
			});
		}
	})
	ul.on("touchend",".btn",function  (e) {
			
		if($(this).hasClass("btndone")){
			$(this).parent().removeClass("done");
			$(this).removeClass("btndone");
			arr[$(this).index()].state=0;
			localStorage.todos=JSON.stringify(arr);
		}else{
			$(this).parent().addClass("done");
			$(this).addClass("btndone");
			arr[$(this).index()].state=1;
			localStorage.todos=JSON.stringify(arr);
		}
	})
	
	$("#qc div").on("touchend",function(){
 	ul.find("li").show();
 	if($(this).attr("data-role")=="completed"){
 		ul.find("li:not('.done')").hide();
 	}
    if($(this).attr("data-role")=="remind"){
 		ul.find("li.done").hide();
 	}
})
	
	
	
})
	
	
	
	
	
	
	
		

