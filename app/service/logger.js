const path = require('path');

module.exports = app => {
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