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

        
        defaultLog() {
            const logPath = path.join(app.basePath, '../StoreMonitorInfo/log');
            this.app.service.path.mkdir(logPath)
        }

        pathLog(path) {

        }
    }

    return Logger;
}