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
                database: 'company',
                host: '127.0.0.1',
                password: '123',
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