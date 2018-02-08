var mq = require('./mq');

var _event = {
	init( data ){
        if(data.type == 'msg'){
            console.log(data);
        }else if(data.type == 'info'){
            let info = mq.get(data.openid);
            console.log(info);
            if(info){
                info.ws.send(JSON.stringify({msg : '服务器发送'}));
                console.log('send success');
            }
        }
	}
}

module.exports = _event;