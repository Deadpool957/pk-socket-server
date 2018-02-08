var _mq = {
	clients : [],
	// 判断某个用户是否存在
	exist(openid){
		let index = this.clients.indexOf(info => info.openid == openid);
		return  {index : index,status : index > -1}
	},
	// 添加新用户
	add(openid,ws){
		let client = {openid : openid};
		if(! this.exist(openid).status){
			// 将用户加入队列
			client.ws = ws;
			this.clients.push(client);
			return true;
		}
		return false;
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
	list(){
		return this.clients;
	},
	// 返回某个具体用户
	get(openid){
		return this.clients.find(info => info.openid == openid);
	}
}

module.exports = _mq;