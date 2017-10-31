const pgp = require('pg-promise')();

module.exports = app => {
    app.db = pgp(app.config.database.pg);
}