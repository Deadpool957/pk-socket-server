let config = {
    redis : {
        server : '120.26.239.60',
        port : 6379,
        auth : 'yyigef'
    },
    message_type : {
        pair_start : 'PAIR_START',// 开始匹配
        pair_lose : 'PAIR_LOSE',// 匹配失败
        pair_success : 'PAIR_SUCCESS',// 匹配完成
        pk_start : 'PK_START',// 开始游戏
        answer : 'ANSWER',// 答题互动
        success : 'SUCCESS',// 完成一轮游戏
        again : 'AGAIN', // 未关闭Socket，继续玩游戏
        user_quit : 'USER_QUIT' // 用户退出游戏
    }
}

global._config = config;