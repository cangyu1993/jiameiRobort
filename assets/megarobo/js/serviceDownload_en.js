var page = 1;
var rows = 5;
var tabType = "6"; //分类：6-机器人 、7-运动控制、8-软件服务、9-数据服务
$(function(){
	var $tab = $("#downloadMenu>div");
	$.each($tab,function(k,v){
		$(v).unbind("click").click(function(){
			$tab.removeClass("cur");
			$(v).addClass("cur");
			var sign = $(v).attr("sign");
			$("#tab1Content").show();
			if(sign == "tab1"){ //机器人
				tabType = "6";
			}else if(sign == "tab2"){ //运动控制
				tabType = "7";
			}else if(sign == "tab3"){ //软件服务
				tabType = "8";
			}else if(sign == "tab4"){ //数据服务
				tabType = "15";
			}
			getRobotList(1); //获取列表
		});
	});
	$tab.first().click();
});
//获取列表
function getRobotList(page){
	$.ajax({
		url: "/api/download/getList?language=en",
		type: "get",
		dataType: "json",
		data:{
			"page":page,
			"pageSize":rows,
			"tab":tabType
		},
		success: function(data){
			if(!data["code"]){
				$("#robotList>ul").html('<div style="padding:20px; text-align:center;">No data temporarily</div>');
				$("#robotPage").hide();
				return false;
			}
			var lArr = [],lStr = "",l,sumPage;
			sumPage = (data["data"]["count"]%rows == 0) ? data["data"]["count"]/rows : Math.floor(data["data"]["count"]/rows) + 1;
			var l = data["data"]["data"].length, dataList = data["data"]["data"];
			if(l == 0){
				$("#robotList>ul").html('<div style="padding:20px; text-align:center;">No data temporarily</div>');
				$("#robotPage").hide();
				return false;
			}
			for(var i =0;i<l ;i++){
				lArr.push('<li class="row">');
				lArr.push('<div class="col-lg-9 col-sm-9 col-xs-12 tab_left">');
				var icon = dataList[i]["icon"];
				lArr.push('<div class="icon '+icon+' hidden-xs"></div>');
				lArr.push('<div class="text_box">');
				lArr.push('<h3>'+dataList[i]["title"]+'</h3>');
				lArr.push('<div class="text">'+dataList[i]["description"]+'</div>');
				lArr.push('</div>');
				lArr.push('</div>');
				lArr.push('<div class="col-lg-3 col-sm-3 col-xs-12 tab_right">');
				lArr.push('<div class="right_box">');
				lArr.push('<span>'+dataList[i]["filesize"]+'</span>');
				lArr.push('<a class="lr" href="'+dataList[i]["annexfile"]+'"><img src="/assets/megarobo/images/down_btn_icon.png" />Download</a>');
				lArr.push('</div>');
				lArr.push('</div>');
				lArr.push('</li>');
			}
			lStr = lArr.join('');
			$("#robotList>ul").html(lStr);
			$("#robotPage").show();
			pagePause = 0;
			if(page < 2){
				$("#robotPage").jPages({
					containerID : "robotList",
					clickStop   : true,
					perPage	: rows,
					allSumPage : sumPage,
					callback: ajaxRobotPageData
				});
			}
		},
		error:function(request){
			console.log("获取列表异常");
		}
	});
}

//机器人分页回调函数
function ajaxRobotPageData(obj){
	if(pagePause == 0){
		return false;
	}
	getRobotList(obj["current"]);
}