$(function(){
	
        var vbtId = "197078";//航次
        /*jQuery.ajax({
            url: projectRoot + "/overView/getShipInfo?vbtId="+vbtId,
            type: 'post',
            datatype: "json",
            success: function (result) {
                var data = eval(result);//接收数据

                //打印数据的类型
                console.log(data);

            },
            complete:function(){

            },
            error:function(){
            	alert("error");

            }
        });*/







        //获得船的起始和终止位置
        var param = {};
        param.vesselCd = "CSCL SUMMER";//船ID
        jQuery.ajax({
            url: projectRoot+ "/overView/getBerth",
            type: 'post',
            data: param,
            success: function (result) {
                var data = eval(result);//接收数据
                //打印数据的类型
                console.log(data.content);
            },
            error:function(){
            	alert("error");
            }
        });

        jQuery.ajax({
            url: projectRoot + "/overView/getQcStatus?vbtId="+vbtId,
            type: 'post',
            datatype: "json",
            //contentType: "application/json; charset=utf-8",
            success: function (result) {
                var data = eval(result);//接收数据
                //打印数据的类型
                console.log(result);
                for(var i in data.content){
                	$(".qdview .ship_cont ul").append("<li><div><i><b></b>/<b></b></i><em><b></b>/<b></b></em></div><span></span></li>");
                	//桥吊状态判断
                	if(data.content[i].qcStatus=="RED"){
                		$(".qdview .ship_cont ul li:last").addClass("err");
                	}else if(data.content[i].qcStatus=="YELLOW"){
                		$(".qdview .ship_cont ul li:last").addClass("yellow");
                	}
                	//添加完成量，剩余量,等
                	$(".qdview .ship_cont ul li:last div i b:first").text(data.content[i].qcNo);
                	$(".qdview .ship_cont ul li:last div i b:last").text(data.content[i].qcBay);
                	$(".qdview .ship_cont ul li:last div em b:first").text(data.content[i].finishNum);
                	$(".qdview .ship_cont ul li:last div em b:last").text(data.content[i].totalNum);
                	$(".qdview .ship_cont ul li:last span").text(data.content[i].leftNum);
                	$(".qdview .ship_cont ul li:last div").addClass(data.content[i].qcBay);
               
                };
            },
            complete:function(){
            	var bayNumone=$(".qdview .ship_cont ul li:first div").attr("class");
			
			    //AJAX访问得到箱子数据
			    function addbay(num1){
			    	
			    	var num11=Number(num1)+1;
			    	var num12=Number(num1)+2;
			    	var num1_2=Number(num1)-2;
			    	var num1_1=Number(num1)-1;

			    	function changeNum(a){
			    		if(String(a).length==1){
			    			a=0+String(a);
			    		}
			    		return a;
			    	}
			    	num11=changeNum(num11);
			    	num12=changeNum(num12);
			    	num1_2=changeNum(num1_2);
			    	num1_1=changeNum(num1_1);


			        var param = {};
			        param.vlcVslCd = "CSCL SUMMER";//船ID
			        param.vlcVbyBayid = num1;//倍位
			        param.ScVoyCurid ="258129" ;//航次258129vbtId
			        jQuery.ajax({
			            url: projectRoot+ "/overView/getShipBay",
			            type: 'post',
			            data: param,
			            success: function (result) {
			                var data = eval(result);//接收数据
			                //打印数据的类型
			                console.log(data.content);
			                //循环遍历甲板上的箱子
			                function box(name){
			                	name.append("<div class='OnDeck_box'></div>");
				                name.find(".OnDeck_box").after("<div class='deckNum_box'></div>");
				                name.find(".deckNum_box").after("<div class='BelowDeck_box'></div>");
				                var box_width = 20;//箱子的宽  可改
				                var box_height = 20;//箱子的高
				                var deck_width = 70;//甲板的宽
				                var deck_height = 15;//甲板的高
				                for (key in data.content) {

				                	var maxLayerNumB=data.content.listBelowDeck[0].layerNum;//获得甲板下最高层数
					                for(var i = 0; i<data.content.listBelowDeck.length;i++){
										if(maxLayerNumB<data.content.listBelowDeck[i].layerNum){
											maxLayerNumB=data.content.listBelowDeck[i].layerNum;
										}
									}


				                    if (key == "listOnDeck") {
				                        //甲板上的箱子个数
				                        for (i = 0; i < data.content.listOnDeck.length; i++) {
				                            //偶数的情况下

				                            //if (data.content.listOnDeck[i].colNum % 2 == 0) {
				                               	name.find(".OnDeck_box").append("<div class='OnDeck_box_left' id='left_On'></div>");
				                                name.find(".OnDeck_box_left").prop("class", "left_On" + i).addClass("row");
				                                for(var j=0;j<data.content.vslRowsO.length;j++){
				                                	if(data.content.vslRowsO[j].vrwRowseq==data.content.listOnDeck[i].colNum){
				                                		name.find(".left_On"+i).addClass(data.content.vslRowsO[j].vrwRowno);
				                                		name.find(".left_On"+i).append("<i>"+data.content.vslRowsO[j].vrwRowno+"</i>");
				                                		name.find(".left_On"+i+" i").css({display: 'block',width: box_width,height:'24px',lineHeight:'24px',textAlign:'center',position:'absolute',top:'-24px',color:'#8e9499'});
				                                	}
				                                }
				                                for (j = 0; j < data.content.listOnDeck[i].layerNum; j++) {
				                                    name.find(".left_On" + i).prepend("<div class='box_content "+(80+(j*2))+"'><p class='p p"+j+"'><em></em></p></div>");
				                                }

				                            //}//奇数的情况下
				                            //else if (data.content.listOnDeck[i].colNum % 2 != 0) {
				                                //name.find(".OnDeck_box").prepend("<div class='OnDeck_box_right' id='right_On'></div>");
				                                //name.find(".OnDeck_box_right").prop("class", "right_On" + i).addClass("row "+data.content.listOnDeck[i].colNum+"");
				                                //for (j = 0; j < data.content.listOnDeck[i].layerNum; j++) {
				                                    //name.find(".right_On" + i).prepend("<div class='box_content "+(80+(j*2))+"'><p class='p p"+j+"'><em></em></p></div>");
				                                //}
				                            //}
				                        }
				                    } else if (key == "hatchCovers") {
				                        //甲板的个数
				                        for(var i=0; i<data.content.hatchCovers.length;i++){
				                        	name.find(".deckNum_box").append("<p></p>");
				                        	name.find(".deckNum_box p:last").width((box_width+2)*(data.content.hatchCovers[i].torowseq-data.content.hatchCovers[i].vhcFrrowseq+1));
				                        	name.find(".deckNum_box p:last").text(data.content.hatchCovers[i].vhcOpencvrseq);
				                        	for(j = 0; j < data.content.vslRowsO.length; j++){
				                        		if(data.content.vslRowsO[j].vrwRowseq==data.content.hatchCovers[i].vhcFrrowseq){
				                        			var leftW=name.find(".OnDeck_box .row."+data.content.vslRowsO[j].vrwRowno).index();
				                        			name.find(".deckNum_box p:last").css({left: leftW*(box_width+2)+"px"});
				                        		}
				                        	}
				                        	
				                        }
				                       /* var deckNum = data.content.deckNum;
				                        for (var i = 0; i < deckNum; i++) {
				                            name.find(".deckNum_box").append("<p></p>");
				                        }*/
				                    } else if (key == "listBelowDeck") {
				                        //船下面箱子的个数
				                        for (i = 0; i < data.content.listBelowDeck.length; i++) {
				                            //偶数的情况下
				                            ///if (data.content.listBelowDeck[i].colNum % 2 == 0) {
				                                name.find(".BelowDeck_box").append("<div class='BelowDeck_box_left' id='left_Below'></div>");
				                                name.find(".BelowDeck_box_left").prop("class", "left_Below" + i).addClass("row");
				                                for(var j=0;j<data.content.vslRowsB.length;j++){
				                                	//console.log(data.content.vslRowsB[j].vrwRowseq);
				                                	if(data.content.vslRowsB[j].vrwRowseq==data.content.listBelowDeck[i].colNum){
				                                		name.find(".left_Below"+i).addClass(data.content.vslRowsB[j].vrwRowno);
				                                	}
				                                }
				                                for (j = 1; j <= data.content.listBelowDeck[i].layerNum; j++) {

				                                    name.find(".left_Below" + i).prepend("<div class='box_content "+((maxLayerNumB-data.content.listBelowDeck[i].layerNum)*2+(j*2))+"'><p class='p p"+j+"'><em></em></p></div>");
				                                }

				                            //}
				                            //奇数的情况下
				                            //else if (data.content.listBelowDeck[i].colNum % 2 != 0) {
				                                //name.find(".BelowDeck_box").prepend("<div class='BelowDeck_box_right' id='right_Below'></div>");
				                                //name.find(".BelowDeck_box_right").prop("class", "right_Below" + i).addClass("row "+data.content.listBelowDeck[i].colNum+"");
				                                //for (j = 0; j < data.content.listBelowDeck[i].layerNum; j++) {
				                                    //name.find(".right_Below" + i).append("<div class='box_content'><p class='p p"+j+"'><em></em></p></div>");
				                                //}
				                            //}
				                        }
				                    }
				                }

				                
								
				                name.find(".box_content").width(box_width + "px");
				                name.find(".box_content").height(box_height + "px");
				                //name.find(".deckNum_box p").width(deck_width + "px");
				                //name.find(".deckNum_box p").height(deck_height + "px");
				                name.find(".deckNum_box").width((data.content.deckNum * (deck_width + 2)) + "px");
				                name.find(".deckNum_box").height(((deck_height + 2)) + "px");
				                name.find(".OnDeck_box").width((data.content.listOnDeck.length * (box_width + 2)) + "px");
				                name.find(".BelowDeck_box").width((data.content.listBelowDeck.length * (box_width + 2)) + "px");
				                name.find(".OnDeck_box").height((data.content.listOnDeck[data.content.listOnDeck.length-1].layerNum * (box_width + 2)) + "px");
				                name.find(".BelowDeck_box").height((maxLayerNumB * (box_width + 2)) + "px");
				                name.find(".OnDeck_box p").width(box_width  + "px");
				                name.find(".OnDeck_box p").height(box_height  + "px");
				                name.find(".BelowDeck_box p").width(box_width  + "px");
				                name.find(".BelowDeck_box p").height(box_height  + "px");



				                //添加上面编号

								/*for (var i = 0; i <= data.content.listOnDeck.length+2; i++) {
														
									if(i<10){
										name.find(".OnDeck_box ."+i+"").prepend("<i>0"+i+"</i>");
									}else{
										name.find(".OnDeck_box ."+i+"").prepend("<i>"+i+"</i>");	
									};

									name.find("."+i+" i").css({
										display: 'block',
										width: box_width,
										height:'24px',
										lineHeight:'24px',
										textAlign:'center',
										position:'absolute',
										top:'-24px',
										color:'#8e9499'
									});

								}*/

								//添加甲板上左侧编号
													
								name.find('.OnDeck_box').append("<div class='on_num'></div>")
								for(var i = 1; i <= data.content.listOnDeck[data.content.listOnDeck.length-1].layerNum; i++){
									name.find('.on_num').prepend("<i>"+(80+(i-1)*2)+"</i>");
								};
								name.find('.on_num i').css({height: box_height+2,lineHeight:""+(box_height+2)+"px"});

								//添加甲板下左侧编号
								//var maxLayerNumB=data.content.listBelowDeck[0].layerNum;
								

								name.find('.BelowDeck_box').append('<div class="below_num"></div>');
								for(var i = 1;i <= maxLayerNumB;i++){
									if(i <= 4){
										name.find('.below_num').prepend("<i>"+0+(i*2)+"</i>")
									}else{
										name.find('.below_num').prepend("<i>"+i*2+"</i>");
									};
								};
								name.find('.below_num i').css({
									height: box_height+2,
									lineHeight:""+(box_height+2)+"px",
								});

			                }



			                var box1=$(".box_left");
					        var box2=$(".box_right");
					        box(box1);
					       	box(box2);
			                

			                //箱子数据获取
			                for (key in data.content) {
			                	if (key == "tosVpsStowageContainerVw" ) {
			                		for (var i in data.content.tosVpsStowageContainerVw) {//判断船箱位
				                		//console.log(data.content.tosVpsStowageContainerVw[i].scVlocation.substring(0,2));
				                		var BayNum=data.content.tosVpsStowageContainerVw[i].scVlocation.substring(0,2);
				                		var LieNum=data.content.tosVpsStowageContainerVw[i].scVlocation.substring(2,4);
				                		var CengNum=Number(data.content.tosVpsStowageContainerVw[i].scVlocation.substring(4,6));



				                		function addname(name){
					                			//判断作业状态
					                			switch(data.content.tosVpsStowageContainerVw[i].scWkstatus){
					                				case "S"://提交作业
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorS").children("em").text("S");break;

					                				case "A"://发箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorA").children("em").text("A");break;

					                				case "P"://计划
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorP").children("em").text("P");break;

					                				case "C"://完成
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorC").children("em").text("C");break;

					                				case "N"://不可作业
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorN").children("em").text("N");break;

					                				case "Y"://可作业
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorY").children("em").text("Y");break;

					                				case "RC"://退箱完成
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorRC").children("em").text("RC");break;

					                				case "R"://退箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorR").children("em").text("R");break;
					                			};


					                			//箱型判断
					                			switch(data.content.tosVpsStowageContainerVw[i].scCtypecd){
					                				
					                				case "GP"://普通箱  
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorGP");break;
					                				case "RF"://冷藏箱  
					                					if(data.content.tosVpsStowageContainerVw[i].scRefstatus == 0){
					                					//判断冷藏箱状态值 0，去电；1：上电；2：上电故障
					                						$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("RFNopower");
					                					}else if(data.content.tosVpsStowageContainerVw[i].scRefstatus == 1){
					                						$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("RFPower");

					                					}break;
					                				case "AR":// 活动房
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorAR");break;
					                				case "PF": //平板
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorPF");break;
					                				case "FR": //框架
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorFR");break;
					                				case "HC": //挂衣
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorHC");break;
					                				case "OT": //开顶
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorOT");break;
					                				case "PR": //平板
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorPR");break;
					                				case "TK": //罐状有梁
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorTK");break;
					                				case "XX": //未知
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorXX");break;
					                				case "TU": //罐状无梁
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorTU");break;
					                				case "BU": //散装
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorBU");break;
					                				case "BV": //散装
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("colorBV");break;

					                			};

					                			//作业顺序判断
					                			switch(data.content.tosVpsStowageContainerVw[i].scCwuWorkseq){
					                				case "1":
					                			}

					                			//箱尺寸判断
					                			switch(data.content.tosVpsStowageContainerVw[i].scCszCsizecd){
					                				case "10"://10尺  
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("size10");break;
					                				
					                				case "20"://20尺  
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("size20");break;
					                				case "30"://30尺  
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("size30");break;
					                				case "40"://40尺   
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("size40");break;
					                				case "45"://45尺   
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("size45");break;
					                				case "48"://48尺   
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("size48");break;
					                				case "53"://53尺   
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("size53");break;
					                			};

					                			//危险品判断

					                			switch(data.content.tosVpsStowageContainerVw[i].scDtpDnggcd){
					                				case"1.1"://爆炸品
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger1.1");break;
					                				case"1.2"://爆炸品
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger1.2");break;
					                				case"1.3"://爆炸品
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger1.3");break;
					                				case"1.4"://爆炸品
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger1.4");break;
					                				case"1.5"://爆炸品
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger1.5");break;
					                				case"2.1"://易燃气体
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger2.1");break;
					                				case"2.2"://不燃气体
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger2.2");break;
					                				case"2.3"://有毒气体
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger2.3");break;
					                				case"3.1"://易燃液体(C.C低于―18度）
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger3.1");break;
					                				case"3.2"://易燃液体(C.C为18度 至&LT;23度)
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger3.2");break;
					                				case"3.3"://易燃液体(C.C为23度至=61度）
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger3.3");break;
					                				case"4.1"://易燃固体
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger4.1");break;
					                				case"4.2"://易自燃物质
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger4.2");break;
					                				case"4.3"://潮湿时放出易燃气体的物质
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger4.3");break;
					                				case"5.1"://氧化剂（氧化物质）
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger5.1");break;
					                				case"5.2"://有机过氧化物
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger5.2");break;
					                				case"6.1"://有毒的（毒性的）物质
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger6.1");break;
					                				case"6.2"://感染性物质
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger6.2");break;
					                				case"7"://放射性物质
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger7");break;
					                				case"8"://腐蚀性物质
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger8");break;
					                				case"9"://杂类危险物质
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger9");break;
					                				case"0.1"://危险品代码不明
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger0.1");break;
					                				case"3"://易燃液体
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger3");break;
					                				case"2"://易燃气体
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("danger2");break;
					                			}

					                			//超限箱判断

					                			switch(data.content.tosVpsStowageContainerVw[i].scOvlmtcd){
					                				case "OG": //超重
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("OvlmtcdOG");break;
					                				case "OL": //超长
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("OvlmtcdOL");break;
					                				case "OW": //超宽
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("OvlmtcdOW");break;
					                				case "O": //超限
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("OvlmtcdO");break;
					                				case "OH": //超高
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("OvlmtcdOH");break;

					                			}
					                			//残损箱判断

					                			switch(data.content.tosVpsStowageContainerVw[i].scBrkdmgcd){
					                				case "CLLF":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdCLLF");break;
					                				case "BT1L":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBT1L");break;
					                				case "BB1S":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBB1S");break;
					                				case "BB1M":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBB1M");break;
					                				case "BB1L":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBB1L");break;
					                				case "DFIS":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDFIS");break;
					                				case "DFIM":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDFIM");break;
					                				case "DFIL":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDFIL");break;
					                				case "DDIS":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDDIS");break;
					                				case "DDIM":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDDIM");break;
					                				case "DDIL":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDDIL");break;
					                				case "DT1S":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDT1S");break;
					                				case "DT1M":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDT1M");break;
					                				case "DT1L":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDT1L");break;
					                				case "HF1M":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdHF1M");break;
					                				case "HF1L":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdHF1L");break;
					                				case "HD1S":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdHD1S");break;
					                				case "HD1M":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdHD1M");break;
					                				case "HD1L":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdHD1L");break;
					                				case "HT1S":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdHT1S");break;
					                				case "HT1M":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdHT1M");break;
					                				case "HT1L":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdHT1L");break;
					                				case "HB1S":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdHB1S");break;
					                				case "M":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdM");break;
					                				case "MD":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdMD");break;
					                				case "DR":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDR");break;
					                				case "SP":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdSP");break;
					                				case "BL1S":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBL1S");break;
					                				case "BL1M":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBL1M");break;
					                				case "BL1L":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBL1L");break;
					                				case "DL1S":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDL1S");break;
					                				case "DL1M":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDL1M");break;
					                				case "DL1L":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDL1L");break;
					                				case "HL1S":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdHL1S");break;
					                				case "HL1M":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdHL1M");break;
					                				case "HL1L":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdHL1L");break;
					                				case "HR1S":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdHR1S");break;
					                				case "HR1M":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdHR1M");break;
					                				case "HR1L":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdHR1L");break;
					                				case "DR1S":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDR1S");break;
					                				case "BR1M":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBR1M");break;
					                				case "BR1L":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBR1L");break;
					                				case "CL1S":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdCL1S");break;
					                				case "CL1M":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdCL1M");break;
					                				case "CL1L":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdCL1L");break;
					                				case "CR1S":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdCR1S");break;
					                				case "CR1M":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdCR1M");break;
					                				case "CR1L":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdCR1L");break;
					                				case "DFTS":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDFTS");break;
					                				case "DTTS":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDTTS");break;
					                				case "CRLF":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdCRLF");break;
					                				case "CFLF":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdCFLF");break;
					                				case "CDLF":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdCDLF");break;
					                				case "CTLF":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdCTLF");break;
					                				/*case "MAT1":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CLLF");break;*/
					                				case "1XTX":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("Brkdmgcd1XTX");break;
					                				case "YBWZ":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdYBWZ");break;
					                				case "DLTS":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDLTS");break;
					                				case "DRTS":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDRTS");break;
					                				case "DFTS":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDFTS");break;
					                				case "DDTS":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDDTS");break;
					                				case "DTTS":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDTTS");break;
					                				case "CRLF":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdCRLF");break;
					                				case "CFLF":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdCFLF");break;
					                				case "CDLF":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdCDLF");break;
					                				case "CTLF":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdCTLF");break;
					                				case "MAT1":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdMAT1");break;
					                				case "1XTX":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("Brkdmgcd1XTX");break;
					                				case "DR1M":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDR1M");break;
					                				case "DR1L":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDR1L");break;
					                				case "BR1S":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBR1S");break;
					                				case "BF1S":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBF1S");break;
					                				case "HF1S":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdHF1S");break;
					                				case "BFIM":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBFIM");break;
					                				case "BFIL":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBFIL");break;
					                				case "BF9S":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBF9S");break;
					                				case "BD1S":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBD1S");break;
					                				case "BD1M":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBD1M");break;
					                				case "BD1L":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBD1L");break;
					                				case "BTIS":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBTIS");break;
					                				case "BT1M":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdBT1M");break;
					                				case "DTOS":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("BrkdmgcdDTOS");break;
					                				
					                			}

					                			//箱状态判断 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	

												switch(data.content.tosVpsStowageContainerVw[i].scStsCstatuscd){
					                				case "85"://外来H986废箱查验箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("Cstatuscd85");break;
					                				case "86"://外来H986查验箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("Cstatuscd86");break;
					                				case "87"://外来查验废箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("Cstatuscd87");break;
					                				case "88"://外来普通查验箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("Cstatuscd88");break;
					                				case "99"://道口过境箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("Cstatuscd99");break;
					                				case "CF"://出口退关重箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdCF");break;
					                				case "CT"://国际中转退关重箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdCT");break;
					                				case "CZ"://国内出口中转退关重箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdCZ");break;
					                				case "EE"://国内出口中转空箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdEE");break;
					                				case "IE"://进口空箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdIE");break;
					                				case "IF"://进口重箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdIF");break;
					                				case "IZ"://国内进口中转重箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdIZ");break;
					                				case "NE"://内贸空箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdNE");break;
					                				case "NF"://内贸重箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdNF");break;
					                				case "NZ"://内贸中转重箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdNZ");break;
					                				case "OE"://出口空箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdOE");break;
					                				case "OF"://出口重箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdOF");break;
					                				case "OZ"://国内出口中转重箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdOZ");break;
					                				case "RE"://过境空箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdRE");break;
					                				case "RF"://过境重箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdRF");break;
					                				case "T"://国际中转重箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdT");break;
					                				case "TE"://国际中转空箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdTE");break;
					                				case "XX"://其他
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdXX");break;
					                				case "ZE"://国内进口中转空箱
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CstatuscdZE");break;
					                			}

					                			//箱高判断
					                			switch(data.content.tosVpsStowageContainerVw[i].scCheightcd){
					                				case "LQ":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CheightcdZE");break;
					                				case "PQ":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CheightcdPQ");break;
					                				case "HQ":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CheightcdHQ");break;
					                				case "MQ":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("CheightcdMQ");break;
					                			}

					                			//箱高描述判断
					                			switch(data.content.tosVpsStowageContainerVw[i].heiHeightdesc){
					                				case "<8'":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("HeightdescA");break;
					                				case "8'":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("HeightdescB");break;
					                				case "8'6''":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("HeightdescC");break;
					                				case "9'":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("HeightdescD");break;
					                				case "9'6''":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("HeightdescE");break;
					                				case ">9'6''":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("HeightdescF");break;
					                				case "4'3''":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("HeightdescG");break;
					                				case "<4'3''":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("HeightdescH");break;
					                				case "<=4'":
					                					$(""+name+" ."+LieNum+" ."+CengNum+" p").addClass("HeightdescI");break;
					                			}

					                			//console.log(Number(data.content.tosVpsStowageContainerVw[i].scVlocation.substring(2,4)));
					                			
				                		}

				                		if(num1%2==0){
				                			if ( BayNum == (num1_1) ) {	
					                			addname(".box_right");

					                		}else if(BayNum == (num11)){
					                			addname(".box_left");
					                			
					                		}else if(BayNum == num1){
					                			addname(".box_left");
					                			addname(".box_right");
					                			switch(data.content.tosVpsStowageContainerVw[i].scCszCsizecd){
					                				case "40":
					                					$("."+LieNum+" ."+CengNum+" p em").css({background:"url(../images/box/40size.png) no-repeat"});break;
					                				case "40":
					                					$("."+LieNum+" ."+CengNum+" p em").css({background:"url(../images/box/45size.png) no-repeat"});break;

					                			}
					                		}
				                		}else{
				                			if ( BayNum == num1 ) {	
					                			addname(".box_right");

					                		}else if(BayNum == (num12)||BayNum == (num1_2)){
					                			addname(".box_left");
					                			
					                		}else if(BayNum == (num1_1)||BayNum == (num11)){
					                			addname(".box_left");
					                			addname(".box_right");
					                			switch(data.content.tosVpsStowageContainerVw[i].scCszCsizecd){
					                				case "40":
					                					$("."+LieNum+" ."+CengNum+" p em").css({background:"url(../images/box/40size.png) no-repeat"});break;
					                				case "40":
					                					$("."+LieNum+" ."+CengNum+" p em").css({background:"url(../images/box/45size.png) no-repeat"});break;

					                			}
					                		}
				                		};
				                		
			                		}
			                	}
			                }


			                
							//添加倍位数号码

							$(".box_right").find('.OnDeck_box').prepend('<p class="bay_num">-01(02)-</p>');
							$(".box_left").find('.OnDeck_box').prepend('<p class="bay_num">-03(02)-</p>');

							 function detail(id,Vlocation,Vlocation1,Vlocation2,Vlocation3){
							        	if (id.parent("p").next().is("div") == false) {
							                id.parents(".box_content").append("<div class='left'></div>");
								        	for(var i in data.content.tosVpsStowageContainerVw ){
								        		//alert(data.content.tosVpsStowageContainerVw[i].scVlocation.substring(0,2));
								        		if(data.content.tosVpsStowageContainerVw[i].scVlocation==Vlocation||data.content.tosVpsStowageContainerVw[i].scVlocation==Vlocation1||data.content.tosVpsStowageContainerVw[i].scVlocation==Vlocation2||data.content.tosVpsStowageContainerVw[i].scVlocation==Vlocation3){

								        			for(var j=0; j<4 ;j++){
									                	id.parent("p").siblings('.left').append("<div><label></label><span></span></div>");
									                	switch(j){
									                		case 0:
									                			id.parent("p").siblings(".left").find("div:last label").text("尺寸：");
									                			id.parent("p").siblings(".left").find("div:last span").text(data.content.tosVpsStowageContainerVw[i].scCszCsizecd);break;

									                		case 1:
									                			id.parent("p").siblings(".left").find("div:last label").text("箱号：");
									                			id.parent("p").siblings(".left").find("div:last span").text(data.content.tosVpsStowageContainerVw[i].scCntrno);break;

									                		case 2:
									                			id.parent("p").siblings(".left").find("div:last label").text("箱型：");
									                			switch(data.content.tosVpsStowageContainerVw[i].scCtypecd){
									                				case "AR"://活动房
									                					id.parent("p").siblings(".left").find("div:last span").text("AR");break;

									                				case "PF"://平板
									                					id.parent("p").siblings(".left").find("div:last span").text("PF");break;

								                					case "FR"://框架
									                					id.parent("p").siblings(".left").find("div:last span").text("FR");break;

									                				case "GP"://平箱
									                					id.parent("p").siblings(".left").find("div:last span").text("GP");break;

									                				case "HC"://挂衣
									                					id.parent("p").siblings(".left").find("div:last span").text("HC");break;

									                				case "OT"://开顶
									                					id.parent("p").siblings(".left").find("div:last span").text("OT");break;

									                				case "PR"://
									                					id.parent("p").siblings(".left").find("div:last span").text("PR");break;

									                				case "RF"://冷藏
									                					id.parent("p").siblings(".left").find("div:last span").text("RF");break;

									                				case "TK"://罐状有梁
									                					id.parent("p").siblings(".left").find("div:last span").text("TK");break;

									                				case "TU"://罐状无梁
									                					id.parent("p").siblings(".left").find("div:last span").text("TU");break;

									                				case "XX"://未知
									                					id.parent("p").siblings(".left").find("div:last span").text("XX");break;

									                				case "BU"://散装
									                					id.parent("p").siblings(".left").find("div:last span").text("BU");break;

									                				case "BV"://散装
									                					id.parent("p").siblings(".left").find("div:last span").text("BV");break;
									                				
									                			};break;
																
									                			

									                		case 3:
									                			id.parent("p").siblings(".left").find("div:last label").text("船箱位：");
									                			id.parent("p").siblings(".left").find("div:last span").text(data.content.tosVpsStowageContainerVw[i].scVlocation);break;

								                		};
							                		};
								        		};
							        		};
						                
						                

							            } else if (id.parent("p").next().is("div") == true) {
							                id.parent("p").next("div").remove();
							            }
						            
							 };
							 	//鼠标左键的时候，可自定义


							 	

						        $(".box_right .box_content p em").on("click",function () {
						        	//console.log(111);
						        	var id1=$(this);
						        	var cengNum=$(this).parents(".box_content").attr("class").split(" ");
							        var lieNum=$(this).parents(".row").attr("class").split(" ");
							        //var Vlocation="01";
							        //var Vlocation1="02";
							        lieNum[2]=changeNum(lieNum[2]);
							        cengNum[1]=changeNum(cengNum[1]);
							        /*if(lieNum[2].length==1){
							        	lieNum[2]="0"+lieNum[2];
							        };
							        if(cengNum[1].length==1){
							        	cengNum[1]="0"+cengNum[1];
							        };*/

							        if(num1%2==0){
							        	Vlocation=(num11)+lieNum[2]+cengNum[1];//获得船箱位
							        	Vlocation1=num1+lieNum[2]+cengNum[1];//获得船箱位
							        }else{
							        	Vlocation=num1+lieNum[2]+cengNum[1];//获得船箱位
							        	Vlocation1=num11+lieNum[2]+cengNum[1];//获得船箱位
							        	Vlocation2=(num1_1)+lieNum[2]+cengNum[1];//获得船箱位
							        }
							        

							       
							        detail(id1,Vlocation,Vlocation1,Vlocation2);



						        });

								$(".box_left .box_content p em").on("click",function () {
									var id2=$(this);

						        	var cengNum=$(this).parents(".box_content").attr("class").split(" ");
							        var lieNum=$(this).parents(".row").attr("class").split(" ");
							        //var Vlocation="03";
							        //var Vlocation1="02";
							        lieNum[2]=changeNum(lieNum[2]);
							        cengNum[1]=changeNum(cengNum[1]);
							        /*if(lieNum[2].length==1){
							        	lieNum[2]="0"+lieNum[2];
							        };*/

							        if(num1%2==0){
							        	Vlocation=(num1_1)+lieNum[2]+cengNum[1];//获得船箱位
							        	Vlocation1=num1+lieNum[2]+cengNum[1];//获得船箱位
							        }else{
							        	Vlocation=num12+lieNum[2]+cengNum[1];//获得船箱位
							        	Vlocation3=num1_2+lieNum[2]+cengNum[1];//获得船箱位
							        	Vlocation1=num11+lieNum[2]+cengNum[1];//获得船箱位
							        	Vlocation2=(num1_1)+lieNum[2]+cengNum[1];//获得船箱位
							        }

							       /* Vlocation=Vlocation+lieNum[2]+cengNum[1];//获得船箱位
							        Vlocation1=Vlocation1+lieNum[2]+cengNum[1];//获得船箱位*/

							        detail(id2,Vlocation,Vlocation1,Vlocation2,Vlocation3);
								});



			            },
			            complete:function(){
			            	
							var boxT=$(".bw_box").offset().top;
						    var boxL=$(".bw_box").offset().left;


						        //鼠标右击弹出操作框
						         $(".box_right .box_content p").on("contextmenu", function (e) {
						        	
						         	alert(111111);
						            if ($("#contextmenu").is(":hidden")) {
						                mousex = e.pageX;
						                mousey = e.pageY;

						                $("#contextmenu").css({
						                    top: mousey-boxT,
						                    left: mousex-20,
						                }).show();
						                return false;
						            } else {
						                $("#contextmenu").hide();
						                return false;
						            }
						        });

						        //鼠标右键后操作里面的item，可定义
						        $("#contextmenu li a").click(function () {
						        	$("#contextmenu").hide();
						        	var nameClass=$(this).parent("li").attr("class");
						        	switch(nameClass){
						        		case "add":
						        			$(".qdview .showbox").show();
						        }
						            
						            //alert($(this).html());

						        });
						        //弹框选中状态
						        $(".showbox ul li i").click(function(){
						        	$(this).parent("li").toggleClass("on");
						        	$(this).parent("li").siblings("li").removeClass("on");
						        });
						        $(".showbox h1 i.icon").click(function(){
						        	$(".qdview .showbox").hide();
						        });
						        $(".showbox .submit a").click(function(){
						        	$(".qdview .showbox").hide();
						        });

			            },
			            error: function () {
			                console.log("error");
			            }
			        });
				};

				addbay(bayNumone);






            	$(".qdview .ship_cont ul li").on("click",function(){
					if ($(this).hasClass("err")== true) {
						$(this).css({background: "rgba(166,38,33,0.3)", background:"-webkit-gradient(linear,0 0,100% 0,color-stop(0,rgba(166,38,33,0.3)),color-stop(50%,rgba(166,38,33,0.1)),color-stop(100%,rgba(166,38,33,0.3)))"});
					}else if($(this).hasClass("yellow")== true){
						$(this).css({background: "rgba(236,118,22,0.3)", background:"-webkit-gradient(linear,0 0,100% 0,color-stop(0,rgba(236,118,22,0.3)),color-stop(50%,rgba(236,118,22,0.1)),color-stop(100%,rgba(236,118,22,0.3)))"})
					}else{
						$(this).addClass('on').siblings().removeClass("on");
					};

					$(".qdview .main_mid .bw_box .box_right").children().remove();
					$(".qdview .main_mid .bw_box .box_left").children().remove();
					var bayNumother=$(this).children("div").attr("class");
					addbay(bayNumother);
					


				});













					//抓取动作
	            	 function move() {
	                        var offset = $(".box_right .left_On0 .98").offset();

	                        var line_height = $(".move_qd .line").height();
	                        var drop_top = $(".move_qd .clip").offset().top;
	                        var Leg_box_left = $(".move_qd").offset().left;
	                        var small_left=$(".move_small").offset().left;
	                        var animateA = [
	                            function () {
	                                $(".move_qd").animate({left: (offset.left + ($(".box_right .left_On0 .98").width() - $(".move_qd .top").width()) / 2) + "px"}, 500, first);
	                            },
	                            function () {
	                                $(".move_qd .line").animate({height: (offset.top - $(".move_qd .line").offset().top - $(".move_qd .clip").height()) + "px"}, 500, first);
	                                $(".move_qd .clip").animate({top: (offset.top ) + "px"}, 500, first);
	                            },
	                            function () {
	                                //- ($(".drop").height() - $(this).height()) /2
	                            },
	                            function () {
	                                $(".move_qd .line").animate({height: line_height + "px"}, 500, first);
	                                $(".move_qd .clip").animate({top: drop_top + "px"}, 500, first);
	                                $(".box_right .left_On0 .98 p").animate({top: "-" + ($(".box_right .left_On0 .98").offset().top-drop_top-$(".move_qd .clip").height()) + "px"}, 500, first);
	                            },
	                            function () {

	                            },

	                            function () {
	                                $(".move_qd").animate({left: Leg_box_left + "px"}, 500, first);
	                                $(".box_right .left_On0 .98 p").animate({left: (Leg_box_left-$(".box_right .left_On0").offset().left+($(".move_qd").width()-$(".box_right .left_On0 .98 p").width())/2)+ "px"}, 500, first);
	                            },
	                            function () {
	                                $(".box_right .left_On0 .98 p").animate({top: ($(".move_small .clip").offset().top-$(".box_right .left_On0 .98 p").offset().top-$(".box_right .left_On0 .98 p").height()/2)+"px"}, 500, first);
	                            },
	                            function () {

	                            },
	                            function () {
	                                $(".move_qd .line").animate({height:($(".move_small .clip").offset().top-$(".move_qd .line").offset().top+$(".move_qd .line").height()-$(".box_right .left_On0 .98 p").height()/2)+"px" }, 500, first);
	                                $(".move_qd .clip").animate({top: ($(".move_small .clip").offset().top-$(".move_qd .clip").offset().top)+"px"}, 500, first);5
	                            },
	                            function () {

	                            },
	                            function(){
	                                $(".move_qd .line").animate({height: line_height + "px"}, 500, first);
	                                $(".move_qd .clip").animate({top: drop_top + "px"}, 500, first);
	                                $(".move_small").animate({left:($(".move_small").offset().left-Leg_box_left-$(".move_small").width()/2+$(".box_right .left_On0 .98 p").width()/8)+"px"},500,first);
	                            },
	                            function(){
	                                $(".move_small").animate({left:($(".agv1").offset().left-$(".move_car").offset().left-$(".agv1").width()/3)+"px"},500,first);
	                                
	                            },
	                            function(){

	                            },
	                            function(){


									$(".box_right .left_On0 .98 p").animate({left:($(".agv1").offset().left-$(".box_right .left_On0 .98").offset().left+$(".box_right .left_On0 .98 p").width()/2)+"px"}, 500,first);

	                            },
	                            function(){

	                            	$(".move_small").animate({left:small_left-$(".move_car").offset().left+"px"},500,first);
	                            	$(".box_right .left_On0 .98 p").animate({opacity:0},500,first);
	                            }
	                            
	                            
	                        ];


	                        var first = function () {
	                            $('.move_qd').dequeue("move");
	                        };
	                        $('.move_qd').queue("move", animateA);
	                        first();

	                        function againMove() {
	                            var n = $('.move_qd').queue("move");
	                            if (n.length == 0) {
	                                $('.move_qd').queue("move", animateA);
	                            }
	                            //setTimeout(againMove, 500);
	                        }

	                        againMove();
	                    }


	                if ($(".box_right .box_content").has("p")) {
	                    move();
	                }
					        



	
            },
            error:function(){
            	alert("error");
            	//处理集装箱信息
                /*for(var j=0;j<result.content[i].tosVpsStowageContainerVw.length;j++){
                    if(result.content[i].bayno==result.content[i].tosVpsStowageContainerVw[j].scVlocation.substr(0,2)){
                        container_num.push(result.content[i].tosVpsStowageContainerVw[j].scVlocation.substr(2));
                    }

                }
*/



               /* for(var i=0;i<container_num.length;i++){
                console.log(container_num[i]);
                $(".bit_numbox").each(function(j){
                    if($("#bit_ondecknum_content"+j).html()==container_num[i].substr(0,2)){
                        //console.log("hello");
                        $(".bit_numboxv").each(function(k){
                            if($("#vertical_top_content"+k).html()==container_num[i].substr(2,2)){
                                $("#bit_ondeck_bit"+j).children().eq(k).css({background:"#eee"});
                            }
                        })

                    }
                });*/







            }

        });
});