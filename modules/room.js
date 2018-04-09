var mq = require('./mq');
var message = require('./OUTmessage');

var _room = {
	rooms : [],
	// 判断某个房间是否存在
	exist(room_id){
        let index = this.rooms.findIndex(info=>{ return info.id == room_id });
		return  {index : index,status : index > -1}
	},
	// 将用户加入到房间
	add(room){
        if( ! this.exist(room.id).status){
            this.rooms.push(room);
            return true;
        }
		return false;
    },
    // 移除房间
	remove(room_id){
        //bt.log('移除房间 ' + room_id);
        let info = this.exist(room_id);
        //bt.log(info);
		if(info.status){
			this.rooms.splice(info.index,1);
			return true;
		}
		return false;
	},
    // 用户提前退场
    quit( openid ){
        for(let room of this.rooms){
            let index = room.members.findIndex( info => { return info.openid == openid });
            if( index > -1){
                let he = room.members.filter( info =>{ return info.openid != openid});
                if( he && he.length > 0 ){
                    message.user_quit( he[0] );
                }
                this.remove(room.id);
                break;
                return false;
            }
        }
    },
    get_List(){
		return this.rooms;
	},
    // 返回某个具体房间
    get( room_id ){
        return this.rooms.find(info => info.id == room_id);
    },
    // 处理组队建房
    handle(openid){
        if(openid && openid.indexOf('[') > -1){
            return;
        }
        bt.log('room > handle > ' + openid);
        // 如果是通过接受好友对战进入
        let userInfo = mq.get( openid );
        if(userInfo.hasOwnProperty('room_id')){
            let room = this.get(userInfo.room_id);
            if(room && room.status){
             room.members.push(userInfo);
             room.status = false;
            // 立即开战
            //bt.log('开战 ' + userInfo.room_id);
            message.firend_pk_start_message( room );
            // message.handle(room);
           }
            return;
        };
        let idle_list = mq.clients.filter( info =>{
            return info.status == 'on';
        })
        if(idle_list.length > 1){
            // bt.log('空闲 > 1');
            let firend_1 = idle_list[0];
            let firend_2 = idle_list[1];
            // 创建房间
            let room = {
                id : bt.random(5),
                status : false,
                time : new Date().toLocaleString(),
                members : [firend_1,firend_2]
            }
            // redis.hset('room_list',room.id,JSON.stringify(room));
            firend_1.status = firend_2.status = 'off';
            // 创建房间
            this.add(room);
            message.handle(room);
        }
    }
}

module.exports = _room;