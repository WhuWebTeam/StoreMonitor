const pgp = require('pg-promise')();

module.exports = app => {

    // pg-promise
    app.db = pgp(app.config.database.pg);

    // StoreMonitor's baseDir
    app.basePath = __dirname;

    console.log(app.config.env);
}