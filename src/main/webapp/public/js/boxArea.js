var directs;
var crafts;
var useages;
var fitstatus;
var berthnos;
var termons;
jQuery(function(){
	  jQuery.ajax({
    	    url: "getBoxAreaBaseInfoByType?type=YARD_DIRECT",
    	    type: 'post',
    	    contentType:"application/json",
    	    success: function (text) {
    	    	directs = text;
        		}
    	});        
	
});
yaaBayway=function(rows){
	var text;
	jQuery.each(directs.content,function(index,val){
		if(rows.row.yaaRowway==val.id){
			text =  val.text;
		}
	}) 
	return text;
}
jQuery(function(){
	  jQuery.ajax({
    	    url: "getBoxAreaBaseInfoByType?type=YARD_AREA_CRAFT",
    	    type: 'post',
    	    contentType:"application/json",
    	    success: function (text) {
    	    	crafts = text;
        		}
    	});        
	
});
yaaCraft=function(rows){
	var text;
	jQuery.each(crafts.content,function(index,val){
		if(rows.row.yaaCraft==val.id){
			text =  val.text;
		}
	}) 
	return text;
}

jQuery(function(){
	  jQuery.ajax({
    	    url: "getBoxAreaBaseInfoByType?type=YARD_AREA_USEAGE",
    	    type: 'post',
    	    contentType:"application/json",
    	    success: function (text) {
    	    	useages = text;
        		}
    	});        
	
});
yaaUseage=function(rows){
	var text;
	jQuery.each(useages.content,function(index,val){
		if(rows.row.yaaUseage==val.id){
			text =  val.text;
		}
	}) 
	return text;
}
jQuery(function(){
	  jQuery.ajax({
    	    url: "getBoxAreaBaseInfoByType?type=YARD_CNTRSTATUS",
    	    type: 'post',
    	    contentType:"application/json",
    	    success: function (text) {
    	    	fitstatus = text;
        		}
    	});        
	
});
yaaFitstatus=function(rows){
	var text;
	jQuery.each(fitstatus.content,function(index,val){
		if(rows.row.yaaFitstatus==val.id){
			text =  val.text;
		}
	}) 
	return text;
}
jQuery(function(){
	  jQuery.ajax({
    	    url: "getBoxAreaBaseInfoByType?type=BERTHNO",
    	    type: 'post',
    	    contentType:"application/json",
    	    success: function (text) {
    	    	berthnos = text;
        		}
    	});        
	
});
yaaBerthno=function(rows){
	var text;
	jQuery.each(berthnos.content,function(index,val){
		if(rows.row.yaaBerthno==val.id){
			text =  val.text;
		}
	}) 
	return text;
}
jQuery(function(){
	  jQuery.ajax({
    	    url: "getBoxAreaBaseInfoByType?type=SYS_TERMNO",
    	    type: 'post',
    	    contentType:"application/json",
    	    success: function (text) {
    	    	termons = text;
        		}
    	});        
	
});
yaaTermno=function(rows){
	var text;
	jQuery.each(termons.content,function(index,val){
		if(rows.row.yaaTermno==val.id){
			text =  val.text;
		}
	}) 
	return text;
}
