// Redis 数据实例
var redis_model = {
    getAll(){
        return new Promise(function(Resolved){
            redis.hgetall('userList',(error,res)=>{
                Resolved(res);
            })
        });
    },
    exist(key,openid){
        return new Promise(function(Resolved){
            redis.hexists(key,openid,(error,res)=>{
                Resolved(res);
            })
        });
    }
}
module.exports = redis_model;