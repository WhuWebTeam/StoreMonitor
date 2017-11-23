/**
 * urls of StoreMonitor
 * @module router
 *
 * @file StroeMonitor
 * @version 0.0.1
 */

/** router */
module.exports = app => {

    // home page
    app.get('/', 'index.home');

    // clear database
    app.delete('/database', 'index.clear');

    app.get('/database', 'index.pgTest');
    app.get('/log', 'index.logTest');

    require('./router/test')(app);

    require('./router/users')(app);               //
    require('./router/userswm')(app);             //
    require('./router/areas')(app);               //
    require('./router/shops')(app);               //
    require('./router/counters')(app);            //
    require('./router/counterUser')(app);         //
    require('./router/cashiers')(app);            //
    require('./router/customers')(app);           //
    require('./router/products')(app);            //
    require('./router/cashierSalesInfo')(app);
    require('./router/productSalesInfo')(app);
    require('./router/customerSalesInfo')(app);
    require('./router/eventsList')(app);          //
    require('./router/video')(app);
    require('./router/editResultList')(app);
    require('./router/eventTAT')(app);
}
