// 消息输入端,侦听客户端的消息源

var mq = require('./mq');
var room = require('./room');
var outMsg = require('./OUTmessage');

var _in_message = {
	handle( res ){
        bt.log('in message');
        if(res.type == _config.message_type.answer){
            outMsg.answer_result(res);
        }else if(res.type == _config.message_type.success){
            bt.log('clear room ' + res.room_id);
            room.remove(res.room_id);
        }else if(res.type == _config.message_type.again){
            bt.log('update user status > again');
            let user = mq.get(res.openid);
            if(user){
                user.status = 'on';
                // 继续匹配对战好友
                room.handle(res.openid);
            }
        }else if(res.type == _config.message_type.user_quit){
            bt.log('update user status > quit');
            let user = mq.get(res.openid);
            if(user){
                user.status = 'off';
            }
        }
	}
}

module.exports = _in_message;