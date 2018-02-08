var mq = require('./mq');
var message = require('./message');

var _room = {
	rooms : [],
	// 判断某个房间是否存在
	exist(room_id){
		let index = this.rooms.indexOf(info => info.room_id == room_id);
		return  {index : index,status : index > -1}
	},
	// 将用户加入到房间
	add(room_id,ws){
		let client = {room_id : room_id};
		if(! this.exist(room_id).status){
			// 将用户加入队列
			client.ws = ws;
			this.rooms.push(client);
			return true;
		}
		return false;
    },
    // 处理组队建房
    handle(openid){
        let rooms = this.rooms.filter(room => ! room.group_status);
        // 检测当前是否有人在匹配
        for(let room of rooms){
            // 组队成功
            room.group_status = true;
            room.members.push( mq.get(openid) );
            // 进入消息处理
            message.handle(room);
            break;
        }
        // 自己创建房间
        if(rooms.length == 0){
            let room = {
                id : openid,
                group_status : false,
                members : [ mq.get(openid) ]
            }
            this.rooms.push( room );
        }
    }
}

module.exports = _room;