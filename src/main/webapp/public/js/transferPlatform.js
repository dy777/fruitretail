$(function(){
	var param = {};
        param.stsId = "101";//桥吊ID
        param.voyid = "258129";//航次
        jQuery.ajax({
            url: projectRoot + "/overView/getAssignment",
            type: 'post',
            data: param,
            success: function (result) {
                var data = eval(result);//接收数据
                //打印数据的类型
                console.log(data.content);
                for(var i in data.content){
                	//console.log(data.content[i]);
                	if (data.content[i].spaTpType == "LS") {//路测
                		function judge(val){
                			if (data.content[i].spaTpSublocation=="2") {
	                			val.find("li").eq(0).hide();
	                			val.find('li').css({width: '100%'});
	                			val.find('li div').css({background: "url(../images/sprite.png) -320px -445px no-repeat",width:"160px"});
	                			val.find('em.boxNum').text(data.content[i].spaIycCntrid);
	                			if (data.content[i].spaLock=="3"||data.content[i].spaLock=="4"||data.content[i].spaLock=="6") {//锁钮判断
	                				val.find("li").addClass("onlock");
	                			}else{
	                				val.find("li").removeClass("onlock");
	                			};
	                			//箱型判断
	                			switch(data.content[i].scCtypecd){
	                				case null:;
	                				case "GP"://普通箱
	                					val.find("li div p em").css({background:"url(../images/sprite.png) -596.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                				case "TK":;//油罐箱
	                				case "TU":
	                					val.find("li div p em").css({background:"url(../images/sprite.png) -722.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                				case "RF"://冷藏箱
	                					val.find("li div p em").css({background:"url(../images/sprite.png) -387.6px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                				/*case "GP":
	                					val.find("li div p em").hide(); break;
	                				case "GP":
	                					val.find("li div p em").hide(); break;*/

	                			}
	                			switch(data.content[i].scOvlmtcd){//超限箱判断
	                				case "OH"://超高箱
	                					val.find("li div p em").css({background:"url(../images/sprite.png) -105px -397px no-repeat",backgroundSize:"756.8px auto"}); break;
	                				case "OW"://超宽箱
	                					val.find("li div p em").css({background:"url(../images/sprite.png) -533.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;

	                			};
	                			if(data.content[i].scIshigh=="Y"){
	                				val.find("li div p em").css({background:"url(../images/sprite.png) -21px -397px no-repeat",backgroundSize:"756.8px auto"});
	                			}
	                			if(data.content[i].scGroupfg=="Y"){
	                				val.find("li div p em").css({background:"url(../images/sprite.png) -512.8px -359px no-repeat",backgroundSize:"756.8px auto"});
	                			}
	                			if(data.content[i].scDtpDnggcd!=null&&data.content[i].scDtpDnggcd.length==3){
	                				switch(data.content[i].scDtpDnggcd.substring(2)){
	                					case "1":
	                						val.find("li div p em").css({background:"url(../images/sprite.png) -575.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                					case "2":
	                						val.find("li div p em").css({background:"url(../images/sprite.png) -575.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                					case "3":
	                						val.find("li div p em").css({background:"url(../images/sprite.png) -407.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                					case "4":
	                						val.find("li div p em").css({background:"url(../images/sprite.png) -638.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                					case "5":
	                						val.find("li div p em").css({background:"red"}); break;
	                				}
	                			}
	             
	                		}else if(data.content[i].spaTpSublocation=="5"){
	                			val.find("li").eq(0).hide();
	                			val.find("li").css({width: '100%'});
	                			val.find("lem.boxNum").text(data.content[i].spaIycCntrid);
	                			if (data.content[i].spaLock=="3"||data.content[i].spaLock=="4"||data.content[i].spaLock=="6") {//锁钮判断
	                				val.find("li").addClass("onlock");
	                			}else{
	                				val.find("li").removeClass("onlock");
	                			};
	                			//箱型判断
	                			switch(data.content[i].scCtypecd){
	                				case "GP":
	                					val.find('li div p em').css({background:"url(../images/sprite.png) -596.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                				case "TK":;//油罐箱
	                				case "TU":
	                					val.find("li div p em").css({background:"url(../images/sprite.png) -722.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                				case "RF"://冷藏箱
	                					val.find("li div p em").css({background:"url(../images/sprite.png) -387.6px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                				/*case "GP":
	                					val.find("li div p em").hide(); break;
	                				case "GP":
	                					val.find("li div p em").hide(); break;*/

	                			}
	                			switch(data.content[i].scOvlmtcd){//超限箱判断
	                				case "OH"://超高箱
	                					val.find("li div p em").css({background:"url(../images/sprite.png) -105px -397px no-repeat",backgroundSize:"756.8px auto"}); break;
	                				case "OW"://超宽箱
	                					val.find("li div p em").css({background:"url(../images/sprite.png) -533.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;

	                			};
	                			if(data.content[i].scIshigh=="Y"){
	                				val.find("li div p em").css({background:"url(../images/sprite.png) -21px -397px no-repeat",backgroundSize:"756.8px auto"});
	                			}
	                			if(data.content[i].scGroupfg=="Y"){
	                				val.find("li div p em").css({background:"url(../images/sprite.png) -512.8px -359px no-repeat",backgroundSize:"756.8px auto"});
	                			}
	                			if(data.content[i].scDtpDnggcd!=null&&data.content[i].scDtpDnggcd.length==3){
	                				switch(data.content[i].scDtpDnggcd.substring(2)){
	                					case "1":
	                						val.find("li div p em").css({background:"url(../images/sprite.png) -575.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                					case "2":
	                						val.find("li div p em").css({background:"url(../images/sprite.png) -575.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                					case "3":
	                						val.find("li div p em").css({background:"url(../images/sprite.png) -575.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                					case "4":
	                						val.find("li div p em").css({background:"url(../images/sprite.png) -638.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                					case "5":
	                						val.find("li div p em").css({background:"red"}); break;
	                				}
	                			}
	                		}else if(data.content[i].spaTpSublocation=="1"){
	                			val.find("em.boxNum").text(data.content[i].spaIycCntrid);
	                			if (data.content[i].spaLock=="3"||data.content[i].spaLock=="4"||data.content[i].spaLock=="6") {//锁钮判断
	                				val.find('li:first').addClass("onlock");
	                			}else{
	                				val.find('li:first').removeClass("onlock");
	                			};
	                			//箱型判断
	                			switch(data.content[i].scCtypecd){
	                				case "GP":
	                					val.find('li:first div p em').css({background:"url(../images/sprite.png) -596.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                				case "TK":;//油罐箱
	                				case "TU":
	                					val.find('li:first div p em').css({background:"url(../images/sprite.png) -722.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                				case "RF"://冷藏箱
	                					val.find('li:first div p em').css({background:"url(../images/sprite.png) -387.6px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                				/*case "GP":
	                					val.find("li div p em").hide(); break;
	                				case "GP":
	                					val.find("li div p em").hide(); break;*/

	                			}
	                			switch(data.content[i].scOvlmtcd){//超限箱判断
	                				case "OH"://超高箱
	                					val.find('li:first div p em').css({background:"url(../images/sprite.png) -105px -397px no-repeat",backgroundSize:"756.8px auto"}); break;
	                				case "OW"://超宽箱
	                					val.find('li:first div p em').css({background:"url(../images/sprite.png) -533.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;

	                			};
	                			if(data.content[i].scIshigh=="Y"){
	                				val.find('li:first div p em').css({background:"url(../images/sprite.png) -21px -397px no-repeat",backgroundSize:"756.8px auto"});
	                			}
	                			if(data.content[i].scGroupfg=="Y"){
	                				val.find('li:first div p em').css({background:"url(../images/sprite.png) -512.8px -359px no-repeat",backgroundSize:"756.8px auto"});
	                			}

	                			if(data.content[i].scDtpDnggcd!=null&&data.content[i].scDtpDnggcd.length==3){
	                				switch(data.content[i].scDtpDnggcd.substring(2)){
	                					case "1":
	                						val.find('li:first div p em').css({background:"url(../images/sprite.png) -575.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                					case "2":
	                						val.find('li:first div p em').css({background:"url(../images/sprite.png) -575.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                					case "3":
	                						val.find('li:first div p em').css({background:"url(../images/sprite.png) -575.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                					case "4":
	                						val.find('li:first div p em').css({background:"url(../images/sprite.png) -638.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                					case "5":
	                						val.find('li:first div p em').css({background:"red"}); break;
	                				}
	                			}
	                		}else if(data.content[i].spaTpSublocation=="3"){
	                				val.find('li:last div em.boxNum').text(data.content[i].spaIycCntrid);
	                			if (data.content[i].spaLock=="3"||data.content[i].spaLock=="4"||data.content[i].spaLock=="6") {//锁钮判断
	                				val.find('li:last').addClass("onlock");
	                			}else{
	                				val.find('li:last').removeClass("onlock");
	                			};
	                			//箱型判断
	                			switch(data.content[i].scCtypecd){
	                				case "GP":
	                					val.find('li:last div p em').css({background:"url(../images/sprite.png) -596.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                				case "TK":;//油罐箱
	                				case "TU":
	                					val.find('li:last div p em').css({background:"url(../images/sprite.png) -722.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                				case "RF"://冷藏箱
	                					val.find('li:last div p em').css({background:"url(../images/sprite.png) -387.6px -359px no-repeat",backgroundSize:"756.8px auto"}); break;
	                				/*case "GP":
	                					val.find("li div p em").hide(); break;
	                				case "GP":
	                					val.find("li div p em").hide(); break;*/

	                			}
	                			switch(data.content[i].scOvlmtcd){//超限箱判断
	                				case "OH"://超高箱
	                					val.find('li:last div p em').css({background:"url(../images/sprite.png) -105px -397px no-repeat",backgroundSize:"756.8px auto"}); break;
	                				case "OW"://超宽箱
	                					val.find('li:last div p em').css({background:"url(../images/sprite.png) -533.8px -359px no-repeat",backgroundSize:"756.8px auto"}); break;

	                			};
	                			if(data.content[i].scIshigh=="Y"){
	                				val.find('li:last div p em').css({background:"url(../images/sprite.png) -21px -397px no-repeat",backgroundSize:"756.8px auto"});
	                			}
	                			if(data.content[i].scGroupfg=="Y"){
	                				val.find('li:last div p em').css({background:"url(../images/sprite.png) -512.8px -359px no-repeat",backgroundSize:"756.8px auto"});
	                			}
	                			if(data.content[i].scDtpDnggcd!=null&&data.content[i].scDtpDnggcd.length==3){
	                				switch(data.content[i].scDtpDnggcd.substring(2)){
	                					case "1":
	                						val.find('li:last div p em').css({background:"url(../images/sprite.png) -575.8px -359px no-repeat"}); break;
	                					case "2":
	                						val.find('li:last div p em').css({background:"url(../images/sprite.png) -575.8px -359px no-repeat"}); break;
	                					case "3":
	                						val.find('li:last div p em').css({background:"url(../images/sprite.png) -575.8px -359px no-repeat"}); break;
	                					case "4":
	                						val.find('li:last div p em').css({background:"url(../images/sprite.png) -638.8px -359px no-repeat"}); break;
	                					case "5":
	                						val.find('li:last div p em').css({background:"red"}); break;
	                				}
	                			}

	                		}
                		

                		}
                		var val1=$(".trans .terr_two");
                		judge(val1);

                		if(data.content[i].spaTpSublocation==2){
                			$(".qdview .move_car .transplatform li:last i").css({background:"url(../images/sprite.png) -413px -409px no-repeat"});
                		}else if(data.content[i].spaTpSublocation==5){
                			$(".qdview .move_car .transplatform li:last i").css({background:"url(../images/sprite.png) -387px -409px no-repeat"});
                		}else if(data.content[i].spaTpSublocation==1&&data.content[i].spaTpSublocation==3){
                			$(".qdview .move_car .transplatform li:last i").css({background:"url(../images/sprite.png) -361px -409px no-repeat"});
                		}


                		
                	}else if(data.content[i].spaTpType == "WS"){//海测
                		var val2=$(".trans .terr_one");
                		judge(val2);

                		if(data.content[i].spaTpSublocation==2){
                			$(".qdview .move_car .transplatform li:first i").css({background:"url(../images/sprite.png) -413px -409px no-repeat"});
                		}else if(data.content[i].spaTpSublocation==5){
                			$(".qdview .move_car .transplatform li:first i").css({background:"url(../images/sprite.png) -387px -409px no-repeat"});
                		}else if(data.content[i].spaTpSublocation==1&&data.content[i].spaTpSublocation==3){
                			$(".qdview .move_car .transplatform li:first i").css({background:"url(../images/sprite.png) -361px -409px no-repeat"});
                			$("")
                		}

                	}




                	 //鼠标左击
			        $(".qdview .trans .terr ul li div").click(function(){
			        	var mainTop=$(".qdview .main_all").offset().top;

			        	var e = event || window.event;
			            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			            var x = e.pageX || e.clientX + scrollX;
			            var y = e.pageY || e.clientY + scrollY;
			            //alert('x: ' + x + '\ny: ' + y);
			        	if($(this).next().is("ul.mes")==false){
			        		$(this).after("<ul class='mes'></ul>");
			        		$(this).next("ul.mes").css({top:y-mainTop,left:x+10});
			        		var Cntrid=$(this).children(".boxNum").text();
			        		for(var i in data.content){
			        			if(data.content[i].spaIycCntrid==Cntrid&&data.content[i].scLduld=="L"){
			        				for(var j=0; j<4; j++){
			        					$(this).next("ul.mes").append("<li><label></label><span></span></li>");
			        					switch(j){
			        						case 0:
			        							$(this).next("ul.mes").find("li:last label").text("船箱位：");
			        							$(this).next("ul.mes").find("li:last span").text(data.content[i].scVlocation);break;
			        						case 1:
			        							$(this).next("ul.mes").find("li:last label").text("卸货港：");
			        							$(this).next("ul.mes").find("li:last span").text(data.content[i].scPotUnldport);break;
			        						case 2:
			        							$(this).next("ul.mes").find("li:last label").text("目的港：");
			        							$(this).next("ul.mes").find("li:last span").text(data.content[i].scPotDstport);break;
			        						case 3:
			        							$(this).next("ul.mes").find("li:last label").text("转运港：");
			        							$(this).next("ul.mes").find("li:last span").text(data.content[i].scPotTransport);break;
			        						default:break;
			        					}
			        				}
			        				
			        			}

			        		};
			        	}else if($(this).next().is("ul.mes") == true){
			        		$(this).next("ul.mes").remove();
			        	}
			        });
                }
            },
            complete:function(){
            	//鼠标右击弹出操作框
            	var mainTop=$(".qdview .main_all").offset().top;
			         $(".qdview .trans .terr ul li div").on("contextmenu", function (e) {
			        	

			            if ($("#contextmenu1").is(":hidden")) {
			                mousex = e.pageX;
			                mousey = e.pageY;

			                $("#contextmenu1").css({
			                    top: mousey-mainTop,
			                    left: mousex
			                }).show();
			                return false;
			            } else {
			                $("#contextmenu1").hide();
			                return false;
			            }
			        });

			        //鼠标右键后操作里面的item，可定义
			        $("#contextmenu1 a").click(function () {
			            $("#contextmenu1").hide();
			            alert($(this).html());

			        });



            },
            error:function(){
            	alert("error");
            }
        });
});