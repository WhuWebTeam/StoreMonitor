module.exports = app => {

    app.get('/api/v1/products/index', 'products.index');// app.controller.products test

    app.get('/api/v1/products', 'products.getProducts'); // get info of all products
    app.post('/api/v1/products/query', 'products.getProduct'); // get some products info specified by id or name
    app.post('/api/v1/products', 'products.addProduct'); // add a new products
}


// app.post('/api/v1/products', 'products.getProduct'); // get some products info specified by id or name
// attributes belongs to the following object
// {
//     id,
//     name
// }



// app.post('/api/v1/products', 'products.addProduct'); // add a new products
// attributes belongs to the following object, id must exists
// {
//     id,
//     name
// }