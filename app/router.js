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

    require('./router/user')(app);
    require('./router/video')(app);
    require('./router/wuMartUsers')(app);
}