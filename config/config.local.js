

/**
 * The local configuration of StoreMonitor system
 * @class Config
 * @since 1.0.0
 */
module.exports = app => {
    const Config = {
        
        /**
         * Set info of server port
         * @member {Object} Config#cluster
         * @property {Object} listen 
         *     - listennig optioins of server port
         *     - see {@link https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback}
         * @property {String} listen.path - set a unix path when server listen
         * @property {Number} listen.port - set a port when server listen
         * @property {String} listen.hostname - set a hostname binding server when server listen
         * @since 1.0.0
         */
        cluster: {
            listen: {
                path: '',
                port: 7001,
                hostname: '',
            },
        }
    };


    /**
     * The configuration of database when project running local
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
            host: '121.201.13.217',
            port: '25432',
            poolSize: 5,
        }
    };

    
    /**
     * Level of wmuser
     * @member {Object} Config#userLevel
     * @property {Number} userLevel.manager - manager level
     * @property {Number} userLevel.storeManager - storeManager level
     * @property {NNumber} userLevel.districtManager -districtManager level
     * @since 1.0.0
     */
    Config.userLevel = {
        manager: 1,
        storeManager: 2,
        districtManager: 3
    };


    /**
     * Time config
     * @member {Object} Config#time
     * @property {String} time.graphShowTime - front-end's graph show time
     * @since 1.0.0
     */
    Config.time = {
        graphShowTime: '6 m',
    }


    return Config;
}