// 消息输入端,侦听客户端的消息源

var mq = require('./mq');
var room = require('./room');
var outMsg = require('./OUTmessage');

var _in_message = {
	handle( res ){
        bt.log('in message');
        let user = null;
        if( res.hasOwnProperty('openid') ){
            user = mq.get(res.openid);
        }
        if(res.type == _config.message_type.answer){
            outMsg.answer_result(res);
        }else if(res.type == _config.message_type.success){
            bt.log('clear room ' + res.room_id);
            room.remove(res.room_id);
        }else if(res.type == _config.message_type.again){
            bt.log('update user status > again');
            if(user){
                delete user.room_id;
                // 根据海选或好友对战来更新用户状态或触发匹配对战
                mq.update(res);
                if(res.status == 'on'){
                    room.handle(res.openid);
                }
            }
        }else if(res.type == _config.message_type.user_quit){
            bt.log('update user status > quit');
            if(user){
                delete user.room_id;
                user.status = 'off';
            }
        }else if(res.type == _config.message_type.firend_create_room){ // 发起好友对战创建房间
            for(let member of res.members){
                member.nickName = decodeURIComponent(member.nickName);
            }
            res.time = new Date().toLocaleString();
            room.add(res);
        }else if(res.type == _config.message_type.firend_pk_start){
            let m_room = room.get(res.room_id);
            outMsg.handle(m_room);
        }else if(res.type == _config.message_type.robot_start){
            // 产生一个随机机器人;
            let r = robot[ parseInt((robot.length) * Math.random()) ];
            let m_room = {
                id : bt.random(5),
                status : true,
                time : new Date().toLocaleString(),
                members : [res,r]
            };
            // 更新真实用户在线状态，对战中
            mq.update(res);
            // 创建房间
            room.add(m_room);
            // 正式开始
            outMsg.handle(m_room);
        }

	}
}

module.exports = _in_message;