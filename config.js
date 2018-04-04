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
        user_quit : 'USER_QUIT', // 用户退出游戏
        firend_create_room : 'FIRENT_CREATE_ROOM', // 发起好友PK，创建房间
        firend_pk_start : 'FIREND_PK_START', // 通知好友发起方，可以开战了.
        firend_pk_start_again : 'FIREND_PK_START_AGAIN',// 好友对战，继续
        firend_pk_start_message : 'FIREND_PK_START_MESSAGE', // 通知好友发起方，可以开战了
        firend_pk_user_quit_message : 'FIREND_PK_USER_QUIT_MESSAGE',// 好友提前退场
        robot_start : 'ROBOT_START'
    }
}

global._config = config;