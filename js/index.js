var homesro=new IScroll("#home");
var datalistsro=new IScroll("#list");
var smarllistsro=new IScroll("#smarl");
var favlistsro=new IScroll("#fav");
var searchcenlistsro= new IScroll("#searchcen");
$(function(){
	var data;
	var t;
	var dataJson;
	$("#footernav").on("click","a",function(e){
		e.preventDefault();
		var boxid=$(this).attr("href");
		$(boxid).css({"-webkit-transform":"translateX(0)","-webkit-transition":"-webkit-transform 2s"}).siblings().css({"-webkit-transform":"translateX(100%)","-webkit-transition":"-webkit-transform 2s"});
		var index=$(this).parent().index();
		var p=index*25+"%";
		$("#mark").css({"left":p,"-webkit-transition":"-webkit-transform 1s"})
		var tex=$(this).attr("title");
		$("#lable").html(tex);
				$("#collect").css({opacity:"0",display:"none"});
				$("#search").css({opacity:"1",display:"block"});
				$("#qqqq").css({opacity:"0",display:"none"});
				$("#return").css("opacity","0");
				favlistsro.refresh();
	})
	$("#home_ul li>a").on("click",function(e){
		e.preventDefault();
		$("#list").css({"-webkit-transform":"translateX(0)","-webkit-transition":"-webkit-transform 2s"}).siblings().css({"-webkit-transform":"translateX(100%)","-webkit-transition":"-webkit-transform 2s"});
		$("#return").css("opacity","1").attr("title","home-1");
		$("#collect").css("display","none");
		var key=$(this).attr("id");
		var title=$(this).attr("title");
		$("#lable").html(title);
		t=title;

		$.ajax({
			url:"data.json",
            
			success:function(e){
				data=e;
				dataJson=e;
				var datalist=e[key].fenlei;
				var str="";
				for(var i in datalist){
					var title=key+"-"+i;
					str+="<a href='#smarl' title="+title+"><dl><dt><img src='img/tu/"+datalist[i].img+"'></dt><dd>"+datalist[i].title+"</dd></dl></a>"
				}
				$("#datalist").html(str);
				datalistsro.refresh();
			}
				
		})
		
	})
	$("#list").on("click","a",function(e){
		e.preventDefault();
		$("#smarl").css({"-webkit-transform":"translateX(0)","-webkit-transition":"-webkit-transform 2s"}).siblings().css({"-webkit-transform":"translateX(100%)","-webkit-transition":"-webkit-transform 2s"});
		$("#return").css("opacity","1").attr("title","home-2");
		$("#collect").css({opacity:"1",display:"block"});
		$("#search").css({opacity:"0",display:"none"});
		$("#qqqq").css({opacity:"0",display:"none"});
		var arr=$(this).attr("title").split("-");
		var key=$(this).attr("id");
		var title=$(this).attr("title");
		$("#lable").html(data[arr[0]].fenlei[arr[1]].title);
		var str1="<p>"+data[arr[0]].fenlei[arr[1]].content+"</p>";
		$("#smarllist").html(str1);
		smarllistsro.refresh();
		$("#return").attr("title","list-2");
		for(var i=0;i<$("#ffa ul li").length;i++){
			var cc=$("#ffa ul li a").eq(i).html();
			
			if(cc==$("#lable").html()){
				$("#collect").css({opacity:"0",display:"none"});
				$("#search").css({opacity:"0",display:"none"});
				$("#qqqq").css({opacity:"1",display:"block"});
			}
		}
		
	})

//返回
	$("#return").on("click",function(e){
		e.preventDefault();
			var st=$(this).attr("title").split("-");
				
			$("#"+st[0]).css({"-webkit-transform":"translateX(0)","-webkit-transition":"-webkit-transform 2s"}).siblings().css({"-webkit-transform":"translateX(100%)","-webkit-transition":"-webkit-transform 2s"});
			if(st[1]==1){
					$("#return").css("opacity","0");
					$("#lable").html("孕育宝典");
			}
			if(st[1]==2){
				$("#return").attr("title","home-1");
				$("#collect").css({opacity:"0",display:"none"});
				$("#search").css({opacity:"1",display:"block"});
				$("#qqqq").css({opacity:"0",display:"none"});
				$("#lable").html(t);
			}
			if(st[1]==3){
					$("#return").css("opacity","0");
					$("#lable").html("收藏");
					$("#qqqq").css({opacity:"0",display:"none"});
					$("#fav").css({"-webkit-transform":"translateX(0)","-webkit-transition":"-webkit-transform 1s"}).siblings().css({"-webkit-transform":"translateX(100%)","-webkit-transition":"-webkit-transform 1s"});
			}	
			if(st[1]==4){
					$("#header").css("display","none");
					$("#searchtop").css("display","block");
					$("#searchcen").css({"-webkit-transform":"translateX(0)","-webkit-transition":"-webkit-transform 1s"}).siblings().css({"-webkit-transform":"translateX(100%)","-webkit-transition":"-webkit-transform 1s"});
			}
	})
	//收藏
		var str2="";
	for(var i=0;i<localStorage.length;i++){
			str2+="<li><a href='#smarl'  title='"+localStorage.key(i)+"'>"+localStorage.key(i)+"</a><li>";
		}
		$("#ffa ul").append(str2);
		if(localStorage.length>1){
			$("#ffa p").html("这是您以下的收藏");
		}
	$("#collect").on("click",function(e){
		e.preventDefault();
		$("#collect").css({opacity:"0",display:"none"});
		$("#search").css({opacity:"0",display:"none"});
		$("#qqqq").css({opacity:"1",display:"block"});

		var ky=$("#lable").text();
		 var val=$("#smarllist p").text();
		
		 	
			localStorage.setItem(ky,val);
		$("#ffa ul").append("<li><a href='#smarl' title='"+ky+"'>"+ky+"</a></li>")
	})
	//取消收藏
	$("#qqqq").on("click",function(e){
		e.preventDefault();
			$("#collect").css({opacity:"1",display:"block"});
			$("#search").css({opacity:"1",display:"block"});
			$("#qqqq").css({opacity:"0",display:"none"});

			var ky=$("#lable").text();
			var val=$("#smarllist p").text();
			localStorage.removeItem(ky,val);
			var	u1=$("#ffa ul li a").length;
			var t1=$(this).siblings("#lable").html();
			for(var i=0;i<u1;i++){
				if(t1==$("#ffa ul li a").eq(i).html()){
					$("#ffa ul li a").eq(i).remove();
				}
			}
	})	
	//点击收藏里的列表进行跳转页面
	$("#ffa ul").on("click","a",function(e){
		e.preventDefault();
		$("#smarl").css({"-webkit-transform":"translateX(0)","-webkit-transition":"-webkit-transform 1s"}).siblings().css({"-webkit-transform":"translateX(100%)","-webkit-transition":"-webkit-transform 1s"});
		$("#collect").css({opacity:"0",display:"none"});
		$("#return").css({opacity:"1",display:"block"}).attr("title","list-3");
		$("#qqqq").css({opacity:"1",display:"block"});
		var title=$(this).attr("title");	
		$("#lable").html(title);
		var str2="<p>"+localStorage.getItem(title)+"</p>";
		$("#smarllist").html(str2);
		smarllistsro.refresh();
	})
	//搜索显示
	$("#search").on("click",function(e){
		e.preventDefault();
		$("#searchcen").css({"-webkit-transform":"translateX(0)","-webkit-transition":"-webkit-transform 0s"}).siblings().css({"-webkit-transform":"translateX(100%)","-webkit-transition":"-webkit-transform 0s"});
			$("#header").css("display","none");
			$("#searchtop").css("display","block");
	})

	//搜索
		$("#a1").on("click",function(e){
			e.preventDefault();
			var value=$('#in1').val();
			$.ajax({
				url:"data.json",
				success:function(e){
					data=e;
					var str="";
					for(var i in data){
						var text=data[i].fenlei;
						for(var j in text){
							var title=text[j].title;
							var content=data[i].fenlei[j].content;
							if(title.indexOf(value)!=-1){
								str+="<li title='"+content+"'>"+title+"</li>";
							}						
						}
					}
					$("#searchList").html(str);	
					$("#searchList p").remove();
					searchcenlistsro.refresh();
				}
			})
		})
		$("#searchList").on("click","li",function(e){
				e.preventDefault();
				$("#smarl").css({"-webkit-transform":"translateX(0)","-webkit-transition":"-webkit-transform 1s"}).siblings().css({"-webkit-transform":"translateX(100%)","-webkit-transition":"-webkit-transform 1s"});
				$("#collect").css({opacity:"0",display:"none"});
		$("#return").css({opacity:"1",display:"block"}).attr("title","list-4");
		var tt=$(this).html();
		$("#lable").html(tt);
		var str2="<p>"+localStorage.getItem(tt)+"</p>";
		$("#smarllist").html(str2);
		$("#header").css("display","block");
			$("#searchtop").css("display","none");

		
			//判断是否收藏过
			for(var i=0;i<localStorage.length;i++){
				if(tt==localStorage.key(i)){
					$("#qqqq").css({opacity:"1",display:"block"});
					$("#collect").css({opacity:"0",display:"none"});
					
					return false;
				}
				else{
					$("#qqqq").css({opacity:"0",display:"none"});
					$("#collect").css({opacity:"1",display:"block"});
					
				}
			}	
		})


		//历史记录
})