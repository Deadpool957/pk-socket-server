var log4js = require('log4js');
var path = require('path');

console.log(path.resolve('./logs/'))

log4js.configure({
    appenders: {
        cheese: {
            type: 'dateFile',
            filename: 'logs/',
            pattern: "yyyy-MM-dd-hh.log",
            maxLogSize: 1024,
            alwaysIncludePattern: true,
            backups: 4,
            category: 'normal'
        }
    },
    categories: {
        default: {
            appenders: ['cheese'],
            level: 'error'
        }
    }
});

var logger = log4js.getLogger();
logger.level = 'info';

global.log = logger;