module.exports = app => {
    // app.controller.shops' index test
    app.get('/api/v1/shops/index', 'shops.index');

    app.get('/api/v1/shops/:userId', 'shops.getMyShops'); // get district manager's shops
    app.get('/api/v1/shops/notAssigned', 'shops.getShopsNotAssainged'); // get shops not assined
    app.get('/api/v1/shops/assigned', 'shops.getShopsAssigned'); // get shops assigned
}