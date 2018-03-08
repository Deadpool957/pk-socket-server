require('./config');
require('./modules/api');
require('./library/log4/build');
require('./library/redis/build');
require('bt-utils');
var wss = require('./modules/listen');
var mq = require('./modules/mq');
var room = require('./modules/room');
var event = require('./modules/event');

wss.on('connection', function connection(ws) {
    bt.log('链接成功！');
    // 将新用户加入队列
    mq.add(global.userInfo,ws,()=>{
        room.handle(global.userInfo.openid);
    });
    // 进行组队建房
    // room.handle(global.userInfo.openid);
    // 接受消息
    ws.on('message', function incoming(json) {
        event.init(JSON.parse(json));
    });
    ws.on("close", function (code, reason) {
        bt.log("关闭连接")
        bt.log(code);
        bt.log(reason);
    });
    ws.on("error", function (code, reason) {
        bt.log("异常关闭")
    });
});

// 定时寻检开始游戏
// setInterval(()=>{
//     bt.log('setInterval');
//     room.job_patrol();
// },3000)
    
// function send(json){
//     wss.clients.forEach(function each(client) {
//         bt.log(client.openid);
//         // client.send(JSON.stringify(json));
//     });
// }