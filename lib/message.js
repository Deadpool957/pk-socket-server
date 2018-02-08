var mq = require('./mq');
const MSG_TYPE = {
    create : 'create',// 组队完成
}

var _message = {
	handle( room ){
        for(let user of room.members){
            let msg = {
                type : MSG_TYPE.create,
                msg : 'create room success'
            }
            user.ws.send( JSON.stringify(msg) );
        }
    }
}

module.exports = _message;