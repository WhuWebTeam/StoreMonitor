module.exports = app => {
    // app.controller.customers test
    app.get('/api/v1/customers/index', 'customers.index');

    app.get('/api/v1/customers', 'customers.getCustomers'); // get info of all customers
    app.post('/api/v1/customers/query', 'customers.getCustomer'); // get some cashier info customers by id or name
    app.post('/api/v1/customers', 'customers.addCustomer'); // add a new customers
}



// app.post('/api/v1/customers', 'customers.getCustomer'); // get some cashier info customers by id or name
// attributes belongs to the following object
// {
//     id,
//     name
// }



// app.post('/api/v1/customers', 'customers.addCustomer'); // add a new customers
// attributes belongs to the following object, id must exists
// {
//     id,
//     name
// }