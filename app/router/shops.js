module.exports = app => {
    // controller.shops' index test
    app.get('/api/v1/shops/index', 'shops.index');

    app.get('/api/v1/shops', 'shops.getShops'); // get shops' info
    app.get('/api/v1/shops/:shopId', 'shops.getShop'); // get info of some shop specified by shopId
    app.put('/api/v1/shops/:shopId', 'shops.modifyShop'); // modify info of some shop specified by shop id 
    app.put('/api/v1/shops/areaId/:shopId', 'shops.changeShopArea'); // change shops position
    app.post('/api/v1/shops', 'shops.addShop'); // add a new shops
}

// app.put('/api/v1/shops/:shopId', 'shops.modifyShop'); // modify info of some shop specified by shop id 
// :shopId shop's serial number
// {
//     name,
//     details
// }


// app.put('/api/v1/shops/areaId/:shopId', 'shops.changeShopArea'); // change shops position
// :shopId shop's serail number
// {
//     areaId
// }



// app.post('/api/v1/shops', 'shops.addShop'); // add a new shops
// {
//     shopId,
//     name,
//     details
// }