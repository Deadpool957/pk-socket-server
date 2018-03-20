var _mq = {
	clients : [],
	wss:[],
	// 判断某个用户是否存在
	exist(openid){
		let index = this.clients.findIndex(info=>{ return info.openid == openid });
		return  {index : index,status : index > -1 ? true : false};
	},
	// 添加新用户
	add(user,ws,fn,close_fn){
		bt.log('mq.js > add');
		if(! this.exist(user.openid).status){
			// 将用户加入队列
			this.clients.push(user);
			// 将WS与用户建立关系
			this.wss[user.openid] = ws;
			// 侦听关闭事件
			ws.on("close", (code, reason) => {
				close_fn(code,user.openid);
			});
			// 侦听错误事件
			ws.on("error", (code, reason) => {
				close_fn(code,user.openid);
			});
			// 创建房间或开始游戏
			fn();
			return true;
		}else{
			let user = this.get(user.openid);
			user.status = user.status;
		}
		return false;
	},
	update(user){
		let userInfo = this.get(user.openid);
		userInfo.status = user.status;
	},
	// 移除用户
	remove(openid){
		let info = this.exist(openid);
		if(info.status){
			this.clients.splice(info.index,1);
			delete this.wss[ openid ];
			return true;
		}
		return false;
	},
	// 返回当前所有队列
	client_list(){
		return this.clients;
	},
	ws_list(){
		return this.wss;
	},
	// 返回某个具体用户
	get(openid){
		return this.clients.find(info => info.openid == openid);
	}
}

module.exports = _mq;