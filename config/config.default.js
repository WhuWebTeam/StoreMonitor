const path = require('path');

module.exports = appInfo => {
    const Config = {
        keys: appInfo.name + 'StoreMonitor',
        logger:  {
            dir: path.join(appInfo.baseDir, '../StoreMonitorInfo/log/logs')
        },
        path: {
            infoDir: path.join(appInfo.baseDir, '../StoreMonitorInfo'),
            logDir: path.join(appInfo.baseDir, '../StoreMonitorInfo/log'),
        },
        database: {
            pg: {
                user: 'company',
                database: 'company',
                host: '121.201.13.217',
                password: '123',
                port: '25432',
                poolSize: 5,
            }
        },
        security: {
            csrf: {
                ignoreJSON: true,
            }
        },
    }

    return Config;
}