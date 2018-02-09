var wss = require('./lib/listen');
var mq = require('./lib/mq');
var room = require('./lib/room');
var event = require('./lib/event');
require('bt-utils');
require('./lib/log4');
require('./lib/api');

wss.on('connection', function connection(ws) {
    bt.log('链接成功！');

    // 将新用户加入队列
    mq.add(global.openid,ws)
    // 进行组队建房
    room.handle(global.openid);

    // 接受消息
    ws.on('message', function incoming(json) {
        event.init(JSON.parse(json));
    });
    ws.on("close", function (code, reason) {
        bt.log("关闭连接")
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