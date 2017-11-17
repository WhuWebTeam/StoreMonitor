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

    require('./router/users')(app);               // complete
    require('./router/userswm')(app);             // complete
    require('./router/areas')(app);               // complete
    require('./router/shops')(app);               // complete
    require('./router/counters')(app);            // compelte
    require('./router/counterUser')(app);         // 
    require('./router/cashiers')(app);            // complete
    require('./router/customers')(app);           // complete
    require('./router/products')(app);            // complete
    require('./router/cashierSalesInfo')(app);
    require('./router/productSalesInfo')(app);
    require('./router/customerSalesInfo')(app);   
    require('./router/eventsList')(app);          // complete
    require('./router/video')(app);               
}
