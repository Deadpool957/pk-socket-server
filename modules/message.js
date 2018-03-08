var mq = require('./mq');
const MSG_TYPE = {
    create : 'create',// 组队完成
    game : 'game'
}

var _message = {
	handle( room ){
        (async ()=>{
            bt.log('message11111111111111');
            let question_list = await api.get_question_rand();
            let members = [];
            for(let user of room.members){
                // bt.log(user);
                members.push({openid : user.openid ,avatarUrl : user.avatarUrl,nickName : user.nickName});
            }
            for(let user of room.members){
                let msg = {
                    room_id : room.id,
                    type : MSG_TYPE.game,
                    msg : 'start game',
                    question : question_list,
                    members : members
                }
                user.ws.send( JSON.stringify(msg) );
            }
        })();  
    }
}

module.exports = _message;