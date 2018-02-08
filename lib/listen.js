var WebSocketServer = require('ws').Server,  
    wss = new WebSocketServer({  
        port: 8100,
        verifyClient: socketVerify
    }); 

function socketVerify(info) {  
	if(info.req.url){
		global.openid = info.req.url.replace('/?openid=','');
	}
    return true;
}
console.log(`WS启动成功，端口号${8100}`);
module.exports = wss;