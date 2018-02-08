// 加载全局Socket
var socket = {
  socketOpen: false,
  socketMsgQueue: [],
	content : null,
	app : null,
  init() {
		this.app = getApp();
    wx.connectSocket({
      url: 'wss://socket.5i5s.net/',
    });
    wx.onSocketOpen((res) => {
      this.socketOpen = true;
      // console.log('first', this.socketOpen);
    });
    wx.onSocketMessage((res)=>{
			// 匹配成功，开战，触发过场动画
			let uid = this.app.globalData.userInfo.userId;
			let room = JSON.parse(res.data);
			if ( room.my == uid || room.he == uid ){
				this.content.listen( room );
			}
    })
  },
  // 发送消息,并将MQ页面作用域带入,以便控制过场动画
	send(message, content) {
    // console.log('send', this.socketOpen);
    // console.log(message);
		this.content = content;
    if (this.socketOpen) {
      wx.sendSocketMessage({
        data: JSON.stringify(message)
      });
    } else {
      console.log('socket open failure');
    }
  },
}

module.exports = socket;