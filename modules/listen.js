var WebSocketServer = require('ws').Server,  
    wss = new WebSocketServer({  
        port: 8100,
        verifyClient: socketVerify
    }); 

function socketVerify(info) {
	if(info.req.url){
		// let userinfo = info.req.url.replace('/?openid=','');
		// userinfo = userinfo.replace(/%22/g,'"');
		// userinfo = userinfo.replace(/%7B/g,'{');
		// userinfo = userinfo.replace(/%7D/g,'}');
		// global.userInfo = JSON.parse(userinfo);
		// bt.log(info.req.headers);
		global.userInfo = {
			openid : info.req.headers.openid,
			avatarUrl : info.req.headers.avatarurl,
			nickName : decodeURIComponent(info.req.headers.nickname),
			status : 'on'
		};
		// bt.log(global.userInfo)
	}
    return true;
}
console.log(`WS启动成功，端口号${8100}`);
module.exports = wss;