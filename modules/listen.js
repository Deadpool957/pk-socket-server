var mq = require('./mq');
var room = require('./room');

var WebSocketServer = require('ws').Server,  
    wss = new WebSocketServer({  
        port: 8100,
        verifyClient: socketVerify
    }); 
function socketVerify(info) {
	if(info.req.url){
		global.userInfo = {
			openid : info.req.headers.openid,
			avatarUrl : info.req.headers.avatarurl,
			nickName : decodeURIComponent(info.req.headers.nickname),
			status : info.req.headers.status
		};
		if(info.req.headers.hasOwnProperty('roomid')){
			global.userInfo.room_id = info.req.headers.roomid;
		}
	}
    return true;
}
console.log(`WS启动成功，端口号${8100}`);
let _listen = {
	// 用户下线后，进行用户数据移除
	close(code,openid){
		bt.log('退场 ' + code + " " + openid);
		// 清理房间
		room.quit(openid);
		// 清理用户
		mq.remove(openid);
	}
}
module.exports = {wss : wss,event : _listen};