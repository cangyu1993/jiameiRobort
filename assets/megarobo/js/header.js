$(function(){
	isMobild(); //判断是否是移动设备
	
	var $threeMenuTab = $("#menuBox a[hover-menu]");
	$.each($threeMenuTab,function(k,v){
		$(v).hover(function(){
			$threeMenuTab.siblings("div").hide();
			$(v).siblings("div").show();
		});
	});
	
	$('#keyword').bind('keypress',function(event){
	    if(event.keyCode == "13"){
	        validateInput("keyword");
	    }
	});
	$("#keyword").bind('input propertychange',function(){
		stripscript("keyword");
	});
	$('#keywords').bind('keypress',function(event){
	    if(event.keyCode == "13"){
	        validateInput("keywords");
	    }
	});
	$("#keywords").bind('input propertychange',function(){
		stripscript("keywords");
	});
	
	function stripscript(id) {
		var s = $("#"+id).val();
	    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~_+！@#￥……&*（）——|{}【】‘’；：”“'。，、？%]")
	        var rs = "";
	    for (var i = 0; i < s.length; i++) {
	        rs = rs + s.substr(i, 1).replace(pattern, '');
	    }
		$("#"+id).val(rs);
	}
});
function validateInput(id){
	var re = /^\s*$/g;
	var val = $("#"+id).val();
	if(!val || re.test(val)){
		return;
	}
    window.location= SCOPE.surl +'?keyword='+$('#'+id).val();
}

function isMobild(){
	var isMobilePlayer = 0;
	// 判断是否为移动端运行环境
	if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
		if(window.location.href.indexOf("?mobile")<0){
			try{
//				if(/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)){
//					$("body").append('<link rel="stylesheet" href="../assets/megarobo/css/ipad.css" />');
//					$("body").append('<link rel="stylesheet" href="../../assets/megarobo/css/ipad.css" />');
//				}else{
//					alert("zheshisha")
//					// 判断访问环境是 其他移动设备 则加载以下
//				}
				if(/iPad/i.test(navigator.userAgent)){ //平板页面
					$("body").prepend('<link rel="stylesheet" href="../../../assets/megarobo/css/ipad.css" />');
				}
			}catch(e){}
		}
	}else{
		// 如果以上都不是，则加载以下
	}
}
