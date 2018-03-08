var redis   = require('redis');

if( 'redis' in _config){
    global.redis = redis.createClient(_config.redis.port, _config.redis.server);
    global.redis.auth( _config.redis.auth);
    global.redis.on('error',error => {
        throw('redis 连接失败');
    })
}