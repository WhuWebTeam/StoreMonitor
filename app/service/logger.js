/**
 * enclosure of some opration releated to StoreMonitor's log
 * @module logger
 * 
 * @file StoreMonitor
 * @version 0.0.1
 */

const path = require('path');

/** logger */
module.exports = app => {
    /**
     * used to complete module logger's function
     * @class
     * @extends app.Service
     */
    class Logger extends app.Service {

        async logPath(path, type, message) {
            const logInfo = `\n\n[${type} | ${new Date}]: ${message}`;
            try {
                await this.service.path.appendFile(path, logInfo);
            } catch (err) {
                err = '';
            }
        }

        
        async logDefault(type, message) {
            let logPath = this.app.config.path.logDir;


            if(type.includes('err')) {
                logPath = path.join(logPath, './error/log_error.txt');
            } else if (type.includes('req')) {
                logPath = path.join(logPath, './request/log_req.txt');
            } else if (type.includes('run')) {
                logPath = path.join(logPath, './running/log_running.txt');
            } else {

            }

            // switch (type) {
            //     case type.includes('err'):
            //         console.log(true);
            //         logPath = path.join(path, './error/log_error.txt');
            //         break;
            //     case type.includes('req'):
            //         logPath = path.join(path, './request/log_req.txt');
            //         break;
            //     case type.includes('run'):
            //         logPath = path.join(path, './running/log_running.txt');
            //         break;
            //     default:
            //         break;
            // }

            await this.logPath(logPath, type, message);
        }
    }

    return Logger;
}