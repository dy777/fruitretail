//worker.js
var webSocket;
var result;
onmessage = function(a)
{	
	webSocket = new WebSocket("ws://localhost:8080/SGFrameWork/WebSocketAGV");
	//为websocket连接服务器异常注册事件
	webSocket.onerror = function(event) {
		onError(event);
	};
	//为websocket连接到服务器时注册事件
	webSocket.onopen = function(event) {
		//onOpen(event);
		var msgjson = {};
		msgjson.frommcn = "1";
		msgjson.tomcn = "10";
		//将对象转换成json字符串
		var jsonstr = JSON.stringify(msgjson);
		webSocket.send(jsonstr);
	};

	//为websocket注册消息处理事件
	webSocket.onmessage = function(event) {
		onMessage(event);
        postMessage(result);
	};
	webSocket.onclose = function(event){
        onClose(event);
    };
	//sendMessage();
	
};

//处理从服务端发送过来的数据
function onMessage(event) {
	    result = event.data;
}

//连接异常时所做的处理
function onError(event) {
}

function onClose(event){

}


