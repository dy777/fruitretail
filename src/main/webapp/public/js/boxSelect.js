
		        //框选 右击弹出选项

		        //$(".OnDeck_box_left_content_col p").width($(".OnDeck_box_left_content_col").width());
			    //$(".OnDeck_box_left_content_col p").height($(".OnDeck_box_left_content_col").height());
			    
			   $(function() {

			   		
			   		var boxT=$(".bw_box").offset().top;
			    	var boxL=$(".bw_box").offset().left;
			   	
			       

			        //鼠标右键的时候，同样可以自定义
			       
			        //鼠标框选的时候

			        window.px = "";
			        window.py = "";
			        window.divLength = 0;
			        //鼠标单击不放
			        $(".bw_box").mousedown(function (e) {
			        	if(event.ctrlKey==1){
			        		px = e.pageX;//获取x坐标
			            	py = e.pageY;//获取y坐标
			        	}
			           
			        }).mouseover(function (e) {//鼠标移动
			        	if(event.ctrlKey==1){
			        		if (px == "" || py == "") {
				                return;
				            }
				            if (divLength == 0) {
				                divLength = $(".box_right").find(".row").children(".box_content").length;
				            }
				            $(".box_right").unbind("mouseover");
				            var pxx = e.pageX;
				            var pyy = e.pageY;
				            var h = pyy - py;
				            var w = pxx - px;
				            //画出矩形选中框
				            if (h < 0 && w >= 0) {
				                $("#bottom").css({
				                    "height": (-h) + "px",
				                    "width": w + "px",
				                    "position": "absolute",
				                    "left": px-boxL + "px",
				                    "top": pyy-boxT + "px",
				                    "opacity": "0.2",
				                    "border": "1px dashed #000"
				                });
				            }
				            else if (h >= 0 && w < 0) {
				                $("#bottom").css({
				                    "height": h + "px",
				                    "width": (-w) + "px",
				                    "position": "absolute",
				                    "left": pxx + "px",
				                    "top": py-boxT + "px",
				                    "opacity": "0.2",
				                    "border": "1px dashed #000"
				                });
				            }
				            else if (h < 0 && w < 0) {
				                $("#bottom").css({
				                    "height": (-h) + "px",
				                    "width": (-w) + "px",
				                    "position": "absolute",
				                    "left": pxx + "px",
				                    "top": pyy-boxT + "px",
				                    "opacity": "0.2",
				                    "border": "1px dashed #000"
				                });
				            }
				            else {
				                $("#bottom").css({
				                    "height": h + "px",
				                    "width": w + "px",
				                    "position": "absolute",
				                    "left": px + "px",
				                    "top": py-boxT + "px",
				                    "opacity": "0.2",
				                    "border": "1px dashed #000"
				                });
				            }
				            if (w < 0) {
				                w = 0 - w;
				            }
				            if (h < 0) {
				                h = 0 - h;
				            }
				            //获取选中框的4个定点坐标
				            var x1 = $("#bottom").offset().left;
				            var y1 = $("#bottom").offset().top;
				            var x2 = x1 + w;
				            var y2 = y1;
				            var x3 = x1 + w;
				            var y3 = y1 + h;
				            var x4 = x1;
				            var y4 = y1 + h;
				            var bianseId = "";
				            //循环判断选中框选中那些内容
				            for (var i = 0; i < divLength; i++)//i的 最大值可以修改
				            {
				                var x11 = $(".box_right").find(".row").children(".box_content").eq(i).offset().left;
				                var y11 = $(".box_right").find(".row").children(".box_content").eq(i).offset().top;
				                var x22 = x11 + 50;
				                var y22 = y11;
				                var x33 = x11 + 50;
				                var y33 = y11 + 20;
				                var x44 = x11;
				                var y44 = y11 + 20;
				                var panduan = false;
				                //判断方法 判断文本框的4个坐标点是否在选中框中，判断选中框的4个坐标点是否在文本框，判断选中框从中间选中是否覆盖
				                if ((x11 > x1 && y11 > y1) && (x11 < x2 && y11 > y2) && (x11 < x3 && y11 < y3) && (x11 > x4 && y11 < y4)) {
				                    panduan = true;
				                }
				                else if ((x22 > x1 && y22 > y1) && (x22 < x2 && y22 > y2) && (x22 < x3 && y22 < y3) && (x22 > x4 && y22 < y4)) {
				                    panduan = true;
				                }
				                else if ((x33 > x1 && y33 > y1) && (x33 < x2 && y33 > y2) && (x33 < x3 && y33 < y3) && (x33 > x4 && y33 < y4)) {
				                    panduan = true;
				                }
				                else if ((x44 > x1 && y44 > y1) && (x44 < x2 && y44 > y2) && (x44 < x3 && y44 < y3) && (x44 > x4 && y44 < y4)) {
				                    panduan = true;
				                }
				                //反向
				                else if ((x1 > x11 && y1 > y11) && (x1 < x22 && y1 > y22) && (x1 < x33 && y1 < y33) && (x1 > x44 && y1 < y44)) {
				                    panduan = true;
				                }
				                else if ((x2 > x11 && y2 > y11) && (x2 < x22 && y2 > y22) && (x2 < x33 && y2 < y33) && (x2 > x44 && y2 < y44)) {
				                    panduan = true;
				                }
				                else if ((x3 > x11 && y3 > y11) && (x3 < x22 && y3 > y22) && (x3 < x33 && y3 < y33) && (x3 > x44 && y3 < y44)) {
				                    panduan = true;
				                }
				                else if ((x4 > x11 && y4 > y11) && (x4 < x22 && y4 > y22) && (x4 < x33 && y4 < y33) && (x4 > x44 && y4 < y44)) {
				                    panduan = true;
				                }
				                //中间横
				                else if ((x1 > x11 && y1 < y11) && (x2 < x22 && y2 < y22) && (x3 < x33 && y3 > y33) && (x4 > x44 && y4 > y44)) {
				                    panduan = true;
				                }
				                //中间竖
				                else if ((x11 > x1 && y11 < y1) && (x22 < x2 && y22 < y2) && (x33 < x3 && y33 > y3) && (x44 > x4 && y44 > y4)) {
				                    panduan = true;
				                }
				                if (panduan == true) {
				                    bianseId = "li" + i + "," + bianseId;
				                }

				            }
				            var idObj = bianseId.split(",");
				            if (bianseId == "") {
				            	/*for (var j = 0; j < divLength; j++) {
				                    $(".box_right").find(".row").children(".box_content").eq(j).find("p").css({"backgroundColor": "lightgreen"})
				                }*/
				            	
				                for (var j = 0; j < divLength; j++) {

				                    var colorValue = $(".box_right").find(".row").children(".box_content").eq(j).find("p").css("backgroundColor");
				                    if (colorValue == "pink") {
				                    	$(".box_right").find(".row").children(".box_content").eq(j).find("p").css({"backgroundColor": "lightgreen"})
				                    }
				                }
				            }
				            
				            if (idObj.length == divLength) {
				                for (var j = 0; j < idObj.length; j++) {
				                    $(".box_right").find(".row").children(".box_content").eq(j).find("p").css({"backgroundColor": "pink"});
				                }
				            }
				            else {
				                for (var j = 0; j < divLength; j++) {
				                    var xuanzhong = false;
				                    for (var i = 0; i < idObj.length - 1; i++) {
				                        if ("li" + j == idObj[i]) {
				                            xuanzhong = true;
				                        }
				                    }
				                    if (xuanzhong == true) {
				                        $(".box_right").find(".row").children(".box_content").eq(j).find("p").css({"backgroundColor": "pink"});
				                    }
				                    else {
				                        /*$(".box_right").find(".row").children(".box_content").eq(j).find("p").css({"backgroundColor": "lightgreen"});*/
				                    }
				                }
				            }
			        	}
			            
			        }).mouseup(function () {//鼠标点击放开进行初始化
			        	if(event.ctrlKey==1){
			        		px = "";
				            py = "";
				            $("#bottom").css({"height": "0", "width": "0", "border": "0px"});
				            $(".box_right").bind("mouseover", function (event) {
				                xuan(event);
				            });
			        	}
			           
			        }).click(function (e) {//点击

			        	var divId = $(e.target).attr("class"); 
			            if (divId.charAt(0) == "p") {

			        	for (var i = 0 ; i < divLength; i++) {
			            		var bgValue = $(".box_right").find(".row").children(".box_content").eq(i).find("p").css("backgroundColor");
			            		//console.log(bgValue);
			            		if (bgValue == "rgb(255, 192, 203)") {
			            			$(".box_right").find(".row").children(".box_content").eq(i).find("p").css("backgroundColor","lightgreen");
			            		//console.log(i);
			            		}
			            		
			            	}

			            }

			        });
			        function xuan(e) {

			        	//console.log(111);
			            if (divLength == 0) {
			                divLength = $(".box_right").children(".row").children(".box_content").length;
			            }
			            var divIdObj = $(e.target).attr("class");
			            if (divIdObj == "box_right") {
			                for (var i = 0; i < divLength; i++) {
			                    var bgValue = $(".box_right").find(".row").children(".box_content").eq(i).find("p").css("backgroundColor");
			                    if (bgValue == "pink") {

			                    } else {
			                    	$(".box_right").children(".row").children(".box_content").eq(j).find("p").css({"backgroundColor": "lightgreen"});
			                        
			                    }
			                }
			            }
			        }


			    });

			    