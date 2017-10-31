<%@ page contentType="text/html;charset=utf8"%>  
<html>
<head>
<meta charset="UTF-8">
<script src="public/js/boot.js" type="text/javascript"></script>
<script src="public/js/common.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="public/style/login.css">

<script type="text/javascript">
	function cleartext(obj) {
		if(obj.value=="请输入用户名"||obj.value=="请输入密码"){
			obj.value = "";	
		}
		if(obj.id=="pwd"){
			obj.type="password";
		}
	}
	$(function() {
		$(window).resize();
	});
	$(window).resize(function() {
		$(".login").css({
			position : "absolute",
			left : ($(window).width() - $(".login").outerWidth()) / 2,
			top : ($(window).height() - $(".login").outerHeight()) / 2
		});
	});

	
</script>
</head>
<body>
     <div class="login" id="login">
		<!--用户名-->
		<div class="input_div">
			<img class="input_img" src="public/images/icon_name.png" /> <input
				class="input" type="text" onClick="cleartext(this);" id="username" name="surUseraccount" value="请输入用户名" />
		</div>
		<!--密码-->
		<div class="input_pwd">
			<img class="input_img" src="public/images/icon_password.png" /> <input
				class="input" type="text" onClick="cleartext(this);" id="pwd" name="surPassword" value="请输入密码" />
		</div>
		<!--记住密码-->
		<input name="rember_pwd" type="checkbox" class="r_pwd" id="rember_pwd" />
		<div class="rember_pwd">记住密码</div>
		<!--忘记密码-->
		<div class="forget_pwd">忘记密码？</div>
		<!--登录-->
		<div class="button_login" onclick="onLoginClick()"></div>
	</div>
</body>

<script src="public/js/boot.js" type="text/javascript"></script>
<script>
function onLoginClick() {
	var username = document.getElementById("username").value;
	var pwd = document.getElementById("pwd").value;
	if(username==""||username=="请输入用户名"){
		alert("请输入用户名!");
		return false;
	}
	if(pwd==""||pwd=="请输入密码"){
		alert("请输入密码!");
		return false;
	}
	var obj = {};
	obj.surUseraccount = username;
	obj.surPassword = pwd;
	var param = mini.encode(obj);
	$.ajax({
     url: "/fruitretail/login",
     contentType:'application/json',
     type: "get",
     //dataType:'json',
     success: function (json) {
        alert(json.data);
     }
});
}
</script>
</html>
