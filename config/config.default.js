const path = require('path');


/**
 * The default configuration of StoreMonitor system
 * @class Config
 * @since 1.0.0
 */
module.exports = appInfo => {
    const Config = {

        /**
         * Key that sign cookies
         * @member {String} Config#keys
         * @since 1.0.0
         */
        keys: appInfo.name + 'StoreMonitor' + new Date(),


        /**
         * Set security options, ignore json request
         * @member {Object} Config#security
         * @property {object} csrf - safe validate options
         * @since 1.0.0
         */
        security: {
            csrf: {
                ignoreJSON: true,
            }
        },


        /**
         * The name of this application
         * @member {String} Config#name
         * @since 1.0.0
         */
        name: appInfo.name,


        /**
         * The current directory of the application
         * @member {Stirng} Config#pkg
         * @since 1.0.0
         */
        pkg: appInfo.pkg,


        /**
         * The directory of server running, You can find `application_config.json` under it that is dumpped from `app.config`
         * @member {String} Config#rundir
         * @since 1.0.0
         */
        rundir: path.join(appInfo.baseDir, '../run'),


        /**
         * Not found page setting
         * It will return 404 page, when request some directory doesn't exist
         * @member {Object} Config#notfound
         * @property {String} pageUrl - the 404 page url
         * @since 1.0.0
         */
        notfound: {
            pageUrl: '/public/404.html',
        },


        /**
         * Options of egg log setting, set the log dir
         * @member {Object} Config#logger
         * @property {String} dir - the egg's default path which logger in 
         * @since 1.0.0
         */
        logger: {
            dir: path.join(appInfo.baseDir, '../StoreMonitorInfo/log/logs'),
        },
    };


    /**
     * Default path of StoreMonitor System
     * @member {Object} Config#path
     * @property {String} infoDir - where info generated by StoreMonitor system exists
     * @property {String} logDir - where log generated by StoreMonitor system exists
     * @since 1.0.0
     */
    Config.path = {
        infoDir: path.join(appInfo.baseDir, '../StoreMonitorInfo'),
        logDir: path.join(appInfo.baseDir, '../StoreMonitorInfo/log'),
    };


    return Config;
}