const path = require('path');

module.exports = appInfo => {
    const Config = {
        keys: appInfo.name + 'StoreMonitor',
        logger:  {
            dir: path.join(appInfo.HOME, 'logs')
        }
    }

    return Config;
}