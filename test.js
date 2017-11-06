const path = require('path');

function logDefault(type, message) {
    let logPath = __dirname;

    switch (type) {
        case type.includes('err'):
            console.log(true);
            logPath = path.join(logPath, './error/log_error.txt');
            break;
        case type.includes('req'):
            logPath = path.join(logPath, './request/log_req.txt');
            break;
        case type.includes('run'):
            logPath = path.join(logPath, './running/log_running.txt');
            break;
        default:
            console.log('default');
            break;
    }

    console.log(logPath);
}

logDefault('error', 'test');