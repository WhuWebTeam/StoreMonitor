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
            const logInfo = `[${type} | ${new Date}]: ${message}`;
            const line = '\n--------------------------------------------------------------\n\n';
            await this.service.path.mkdir(path);
            console.log(path);
            await this.service.path.appendFile(path, logInfo);
            await this.service.path.appendFile(path, line);
        }

        
        async logDefault(type, message) {
            const path = this.app.config.path.logDir;

            switch (type) {
                case type.includes('err'):
                    logPath = path.join(path, './error/log_error.txt');
                    break;
                case type.includes('req'):
                    logPath = path.join(path, './request/log_req.txt');
                    break;
                case type.includes('run'):
                    logPath = path.join(path, './running/log_running.txt');
                    break;
                default:
                    break;
            }
            await this.logPath(path, type, message);
        }
    }

    return Logger;
}