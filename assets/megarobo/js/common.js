/**
 * 提交form表单操作
 */
$(function(){
	$.each($("#megarobo-form input,#megarobo-form textarea"),function(k,v){
		$(v).focus(function(){
			$("#error").text("");
		})
	});
});
function formsubmit(evnet,sign) {
	var obj = event.srcElement ? event.srcElement : event.target
    var error = $("#error");
    var comName = $.trim($("#comName").val()); //公司名称
    var names = $.trim($("#names").val()); //姓名
    var phone = $.trim($("#phone").val()); //电话
    var email = $.trim($("#email").val()); //邮箱
    var useDesc = $.trim($("#useDesc").val()); // 问题描述 || 用途
    if(!comName){
    	error.text("公司名称必填");
    	return false;
    }
    if(comName.length<6){
    	error.text("公司名称最少6个字符");
    	return false;
    }
    if(comName.length>120){
    	error.text("公司名称最多120个字符");
    	return false;
    }
    if(!names){
    	error.text("姓名必填");
    	return false;
    }
    if(names.length < 2){
    	error.text("姓名最少2个字符");
    	return false;
    }
    if(names.length > 10){
    	error.text("姓名最多10个字符");
    	return false;
    }
    if(!phone){
    	error.text("手机号必填");
    	return false;
    }
    if(!isPoneAvailable(phone)){
    	error.text("手机号必须为11位的数字");
    	return false;
    }
    if(!email){
    	error.text("邮箱必填");
    	return false;
    }
    if(!checkEmail(email)){
    	error.text("邮箱格式不正确");
    	return false;
    }
    if(sign){
    	if(!useDesc){
    		error.text("问题描述必填");
    		return false;
    	}
    	if(useDesc.length < 6){
	    	error.text("问题描述最少6个字符");
	    	return false;
	    }
	    if(useDesc.length > 200){
	    	error.text("问题描述最多200个字符");
	    	return false;
	    }
    }
    $(obj).text('提交中...').css("background","#f3af71").unbind("click");
    $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "/api/message/add" ,//url
        data: $('#megarobo-form').serialize(),
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            if (result.code == 1) {
                //成功
                alert(result.msg);
                location.reload();
                return false;
            }else {
                error.text(result.msg)
                return false;
            };
            $(obj).text('提交').css("background","#f0831e").bind("click",function(){
            	formsubmit(evnet);
            });
        },
        error : function() {
            alert('服务器请求失败');
            return false;
        }
    });
}

//英文版的表单提交
function formsubmitEn(evnet,sign) {
	var obj = event.srcElement ? event.srcElement : event.target
    var error = $("#error");
    var comName = $.trim($("#comName").val()); //公司名称
    var names = $.trim($("#names").val()); //姓名
    var phone = $.trim($("#phone").val()); //电话
    var email = $.trim($("#email").val()); //邮箱
    var useDesc = $.trim($("#useDesc").val()); // 问题描述 || 用途
    if(!comName){
    	error.text("Company name is required");
    	return false;
    }
    if(comName.length<6){
    	error.text("Company name shall be 6 characters at least");
    	return false;
    }
    if(comName.length>120){
    	error.text("Company name shall be up to 120 characters");
    	return false;
    }
    if(!names){
    	error.text("Name is required");
    	return false;
    }
    if(names.length < 2){
    	error.text("Name shall be 2 characters at least");
    	return false;
    }
    if(names.length > 10){
    	error.text("Name shall be up to 10 characters");
    	return false;
    }
    if(!phone){
    	error.text("Mobile phone number is required");
    	return false;
    }
    if(!isPoneAvailable(phone)){
    	error.text("Mobile phone number must be 11 digits");
    	return false;
    }
    if(!email){
    	error.text("Email is required");
    	return false;
    }
    if(!checkEmail(email)){
    	error.text("Format of Email is incorrect");
    	return false;
    }
    if(sign){
    	if(!useDesc){
    		error.text("Problem description is required");
    		return false;
    	}
    	if(useDesc.length < 6){
	    	error.text("Problem description shall be 6 characters at least");
	    	return false;
	    }
	    if(useDesc.length > 200){
	    	error.text("Problem description shall be up to 200 characters");
	    	return false;
	    }
    }
    $(obj).text(' Submitting...').css("background","#f3af71").unbind("click");
    $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "/api/message/add" ,//url
        data: $('#megarobo-form').serialize(),
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            if (result.code == 1) {
                //成功
                alert(result.msg);
                location.reload();
                return false;
            }else {
                error.text(result.msg)
                return false;
            };
            $(obj).text('Submit').css("background","#f0831e").bind("click",function(){
            	formsubmit(evnet);
            });
        },
        error : function() {
            alert('Server request failed');
            return false;
        }
    });
}


//验证手机号
function isPoneAvailable(str) {  
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
    if (!myreg.test(str)) {  
    	return false;  
    }else{  
        return true;  
    }  
}
//验证邮箱
function checkEmail(str){
　　var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
　　if(!reg.test(str)){
　　　　return false;
　　}else{
　　　　return true;
　　}
}

