module.exports = app => {
    
    // app.controller.shops' index test
    app.get('/api/v1/shopUser/index', 'shopUser.index');

    app.post('/api/v1/shopUser/:userId', 'shopUser.assignedShops'); // assigned shops to some user
    app.delete('/api/v1/shopUser/retrive/:userId', 'shopUser.retriveShops'); // retrive shops from some user
    app.delete('/api/v1/shopUser/oneKeyRetrive/:userId', 'shopUser.oneKeyRetrive'); // retrive shops from some user
}



// app.post('/api/v1/shopUser/:userId', 'shopUser.assignedShops'); // assigned shops to some user
// {
//     shops:
//     [
//         {
//             shopId,
//             type
//         },
//         {
//             shopId,
//             type
//         }
//     ]
// }



// app.delete('/api/v1/shopUser/retrive/:userId', 'shopUser.retriveShops'); // retrive shops from some user
// {
//     shops:
//     [
//         {
//             shopId,
//         },
//         {
//             shopId,
//         }
//     ]
// }



// app.delete('/api/v1/shopUser/oneKeyRetrive/:userId', 'shopUser.oneKeyRetrive'); // retrive shops from some user
// no attributes of the following object
// {

// }