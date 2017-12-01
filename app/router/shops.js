module.exports = app => {
    // app.controller.shops' index test
    app.get('/api/v1/shops/index', 'shops.index');

    app.get('/api/v1/shops/:userId', 'shops.getMyShops'); // get district manager's shops
    app.get('/api/v1/shops/notAssigned', 'shops.getShopsNotAssainged'); // get shops not assined
    app.get('/api/v1/shops/assigned', 'shops.getShopsAssigned'); // get shops assigned
    app.put('/api/v1/shops/assign/:userId', 'shops.assignedShops'); // assigned some shops to district manager
    app.delete('/api/v1/shops/retrive/:userId', 'shos.retriveShops'); // retrive some shops from some user
    app.delete('/api/v1/shops/oneKeyRetrive/:userId', 'shops.oneKeyRetrive'); // retrive all shops from some user
}



// app.put('/api/v1/shops/assign', 'shops.assignedShops'); // assigned some shops to district manager
// {
//     shops: 
//     [
//         {
//             shopId
//         },
//         {
//             shopId
//         }
//     ]
// }



// app.delete('/api/v1/shops/retrive/:userId', 'shos.retriveShops'); // retrive some shops from some user
// {
//     shops: 
//     [
//         {
//             shopId
//         },
//         {
//             shopId
//         }
//     ]
// }



// app.delete('/api/v1/shops/oneKeyRetrive/:userId', 'shops.oneKeyRetrive'); // retrive all shops from some user
// no thing include the following object
// {

// }