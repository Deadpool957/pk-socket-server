var request = require('request');

var __api = {
    get_question_rand() {
        return new Promise(function(Resolved){
          return request('https://miniprogram.onesmart.org/api/question/get_pk_rand', (error, response, body) =>{
            Resolved(body);
          });
        });
    }
};

global.api = __api;