var _mq = {
	clients : [],
	wss:[],
	wss_exist(openid){
		return this.wss.hasOwnProperty(openid);
	},
	// 判断某个用户是否存在
	exist(openid){
		let index = this.clients.findIndex(info=>{ return info.openid == openid });
		return  {index : index,status : index > -1 ? true : false};
	},
	// 添加新用户
	add(user,ws,fn,close_fn){
		// bt.log('mq.js > add');
		if(! user.hasOwnProperty('openid') || user.openid.indexOf('[') > -1){
			return;
		}
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
			if( user && user.hasOwnProperty('openid')){
				let userInfo = this.get(user.openid);
				userInfo.status = user.status;
			}
		}
		return false;
	},
	update(user){
		if( user && user.hasOwnProperty('openid') && user.hasOwnProperty('status')){
			try{
				let userInfo = this.get(user.openid);
				if(userInfo && userInfo.hasOwnProperty('status')){
					userInfo.status = user.status;
				}
			}
			catch(error){
				bt.log(error);
			}
		}
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