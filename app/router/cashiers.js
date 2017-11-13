module.exports = app => {
    // app.controller.cashiers test
    app.get('/api/v1/cashiers/index', 'cashiers.index');

    app.get('/api/v1/cashiers', 'cashiers.getCashiers'); // get info of all cashiers
    app.post('/api/v1/cashiers/query', 'cashiers.getCashier'); // get some cashier info specified by id or name
    app.post('/api/v1/cashiers', 'cashiers.addCashier'); // add a new cashier
}

// app.post('/api/v1/cashier', 'cashiers.getCashier'); // get some cashier info specified by id or name
// attributes belongs to the following object
// {
//     id,
//     name
// }



// app.post('/api/v1/cashier', 'cashiers.addCashier'); // add a new cashier
// attributes belongs to the following object, id must exists
// {
//     id,
//     name
// }