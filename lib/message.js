var mq = require('./mq');
const MSG_TYPE = {
    create : 'create',// 组队完成
}

var _message = {
	handle( room ){
        (async ()=>{
            let question_list = await api.get_question_rand();
            for(let user of room.members){
                let msg = {
                    room_id : room.id,
                    type : MSG_TYPE.create,
                    msg : 'create room success',
                    question : question_list
                }
                user.ws.send( JSON.stringify(msg) );
            }
        })();  
    }
}

module.exports = _message;