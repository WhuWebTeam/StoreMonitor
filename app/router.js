/**
 * urls of StoreMonitor
 * @module router
 * 
 * @file StroeMonitor
 * @version 0.0.1
 */

/** router */
module.exports = app => {

    app.get('/', 'index.index');
    app.get('/database', 'index.pgTest');
    app.get('/log', 'index.logTest');

    require('./router/users')(app);
    require('./router/userswm')(app);
    require('./router/areas')(app);
    require('./router/shops')(app);
    require('./router/counters')(app);
    require('./router/counterUser')(app);
}