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
         * Set some security options of StoreMonitor system
         * @member {Object} Config#security
         * @property {Object} csrf - safe validate options
         * @property {Boolean} csrf.ignoreJSON - allow StoreMonitor System to ignore validate json data
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
        rundir: path.join(appInfo.baseDir, `../${appInfo.name}Info/run`),


        /**
         * Options of egg log setting, set the log dir
         * @member {Object} Config#logger
         * @property {String} logger.dir - the egg's default path which logger in 
         * @since 1.0.0
         */
        logger: {
            dir: path.join(appInfo.baseDir, `../${appInfo.name}Info/log/logs`),
        },


        /**
         * Not found page setting
         * It will return 404 page, when request some directory doesn't exist
         * @member {Object} Config#notfound
         * @property {String} notfound.pageUrl - the 404 page url
         * @since 1.0.0
         */
        notfound: {
            pageUrl: '/public/404.html',
        },
    };


    /**
     * Default path of StoreMonitor System
     * @member {Object} Config#path
     * @property {String} path.infoDir - where info generated by StoreMonitor system exists
     * @property {String} path.logDir - where log generated by StoreMonitor system exists
     * @since 1.0.0
     */
    Config.path = {
        baseDir: appInfo.baseDir,
        infoDir: path.join(appInfo.baseDir, `../${appInfo.name}/Info`),
        logDir: path.join(appInfo.baseDir, `../${appInfo.name}Info/log`),
    };


    /**
     * Default database configuration
     * Just start project through `egg-bin dev` command
     * @member {Object} Config#database
     * @property {Object} database.pg - configuration of database postgreSQL
     * @property {String} database.pg.user - username of postgreSQL database StoreMonitor system used
     * @property {String} database.pg.password - password of postgreSQL database StoreMonitor system used
     * @property {String} database.pg.database - database of postgreSQL database StoreMonitor system used
     * @property {String} database.pg.host - database's server ip of postfreSQL database StoreMonitor system used
     * @property {String} database.pg.port - database's server port of postgreSQL database StroeMonitor system used
     * @property {String} database.pg.poolSize - database's server process number
     * @since 1.0.0
     */
    Config.database = {
        pg: {
            user: 'company',
            password: '123',
            database: 'company',
            host: '127.0.0.1',
            port: '5432',
            poolSize: 5,
        }
    };

    
    /**
     * level of wmuser
     * @member {Object} Config#userLevel
     * @property {Number} userLevel.manager - manager level
     * @property {Number} userLevel.storeManager - storeManager level
     * @property {NNumber} userLevel.districtManager -districtManager level
     * @since 1.0.0
     */
    Config.userLevel = {
        manager: 1,
        storeManager: 2,
        districtManage: 3
    };


    return Config;
}