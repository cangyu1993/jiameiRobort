$(function(){
	var $tab = $("#tabMenu>span");
	$.each($tab, function(k,v) {
		$(v).hover(function(){
			$tab.removeClass("cur");
			$(v).addClass("cur");
			$("#tabContent>div").hide();
			$("#"+$(v).attr("sign")+"Content").show();
		});
	});
});
