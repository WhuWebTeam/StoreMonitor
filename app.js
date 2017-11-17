const pgp = require('pg-promise')();
const Index = require('./index')();

module.exports = app => {

    // pg-promise
    app.db = pgp(app.config.database.pg);

    // StoreMonitor's baseDir
    app.basePath = __dirname;

    // database init (add admin user) when start database
    const index = new Index();
    index.databaseInit(app);
}