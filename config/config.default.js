const path = require('path');

module.exports = appInfo => {
    const Config = {
        keys: appInfo.name + 'StoreMonitor',
        logger:  {
            dir: path.join(appInfo.HOME, 'logs')
        },
        database: {
            pg: {
                user: 'company',
                database: 'StoreMonitor',
                host: '127.0.0.1',
                password: 'StoreMonitor',
                poolSize: 1,
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