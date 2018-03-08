var mqModel = require('./data/mqModel');

var _mq = {
	clients : [],
	mq_redis_key : 'userList',
	// 判断某个用户是否存在
	async exist(openid){
		let index = await mqModel.exist(this.mq_redis_key,openid);
		//let index = this.clients.indexOf(info => info.openid == openid);
		return  {index : index,status : index ? true : false};
	},
	// 添加新用户
	add(user,ws,fn){
		let client = user;
		this.exist(user.openid).then(res=>{
			if( ! res.status ){
				redis.hset(this.mq_redis_key,user.openid,JSON.stringify(user));
				// 将TCP和用户建立关系
				client.ws = ws;
				this.clients.push(client);
				// 创建房间或开始游戏
				fn();
			}
		})
		// if(! this.exist(user.openid).status){
		// 	// 将用户数据写入DB
		// 	redis.hset(this.mq_redis_key,user.openid,JSON.stringify(user));
		// 	// 将用户加入队列
		// 	client.ws = ws;
		// 	this.clients.push(client);
		// 	return true;
		// }
		// return false;
	},
	// 移除用户
	remove(openid){
		let info = this.exist(openid);
		if(info.status){
			this.clients.splice(info.index,1);
			return true;
		}
		return false;
	},
	// 返回当前所有队列
	async list(){
		// return redis.hgetall(this.mq_redis_key,(error,res)=>{
		// 	bt.log(res);
		// })
		// return this.clients;
		let list = await mqModel.getAll();
        return list;
	},
	// 返回某个具体用户
	get(openid){
		return this.clients.find(info => info.openid == openid);
	}
}

module.exports = _mq;