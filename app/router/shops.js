module.exports = app => {
    // app.controller.shops' index test
    app.get('/api/v1/shops/index', 'shops.index');

    app.get('/api/v1/shops', 'shops.getShops'); // get shops' info
    app.put('/api/v1/shops/:shopId', 'shops.modifyShop'); // modify info of some shop specified by shop id
    app.put('/api/v1/shops/areaId/:shopId', 'shops.changeShopArea'); // change shops position
    app.post('/api/v1/shops/query', 'shops.getShop'); // get info of shops specified by id, areaId, name or details
    app.post('/api/v1/shops', 'shops.addShop'); // add a new shops
}

// app.put('/api/v1/shops/:shopId', 'shops.modifyShop'); // modify info of some shop specified by shop id 
// :shopId shop's serial number
// {
//     areaId,
//     name,
//     details
// }



// app.put('/api/v1/shops/areaId/:shopId', 'shops.changeShopArea'); // change shops position
// :shopId shop's serail number
// {
//     areaId
// }



// app.post('/api/v1/shops/query', 'shops.getShop'); // get info of shops specified by id, areaId, name, detail
// attributes belongs to the following object
// {
//     id,
//     areaId,
//     name,
//     details
// }


// app.post('/api/v1/shops', 'shops.addShop'); // add a new shops
// attributes belongs to the following object, id must exists
// {
//     shopId,
//     name,
//     details
// }