const pgp = require('pg-promise')();

module.exports = app => {
    app.pg = pgp(app.config.database.pg);
}