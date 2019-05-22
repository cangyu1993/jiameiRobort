$(function(){
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  
	    $(".index_page").height($(window).height());  
	} else if (/(Android)/i.test(navigator.userAgent)) {  
	    $(".index_page").height($(window).height());
	} else {  
//		alert("pc");  
	}; 
	$('#myCarousel').on('slide.bs.carousel', function () {
//      alert("当调用 slide 实例方法时立即触发该事件。");
    });
});
