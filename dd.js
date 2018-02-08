require("./system/run");

var express = require('express');
var http = require('http');
var WebSocket = require('ws');
var app = express();
var server = http.createServer(app);
var wss = new WebSocket.Server({server});
var mqs = [];
var rooms = [];

wss.on('connection', function connection(ws) {
    console.log('链接成功！');
    ws.on('message', function incoming(data) {
        let json = JSON.parse(data);
        // 将人选加入海选
        //if(mqs.filter(item =>{return item.userId == data.userId}).length  == 0){
        if(mqs.indexOf(data.userId) == -1){
            mqs.push(json);
            // 匹配
            mq_handle( json );
        }
        // send({msg : 'how do you do~'});
        // console.log(mqs);
        // console.log(json.nickName);
        
    });
    ws.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    ws.on("error", function (code, reason) {
        console.log("异常关闭")
    });
});
// 推送消息到客户端
function send(json){
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(json));
    });
}
// 处理海选队列
function mq_handle( info ){
    bt.log(info);
    let list = mqs.filter(item =>{return item.status == -1 && item.userId != info.userId});
    if(list.length > 0){
        // 创建房间
        create_room( info,list[0] );
    }
}
// 创建房间
function create_room( a,b ){
    let room = {
        roomId : "room_" + Math.round(Math.random() * 10000),
        my : a.userId,
        my_info : a,
        he : b.userId,
        he_info : b
    }
    // 加入房间
    rooms.push(room);
    send(room);
}

server.listen(8100, function listening() {
    console.log('服务器启动成功！');
});


var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({ port: 8100 });
wss.on('connection', function (ws) {
    console.log('client connected');
    ws.on('message', function (message) {
        console.log(message);
    });
    ws.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    ws.on("error", function (code, reason) {
        console.log("异常关闭")
    });
});