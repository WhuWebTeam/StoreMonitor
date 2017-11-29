module.exports = app => {
    
    // app.controller.counterUser test
    app.get('/api/v1/counterUser/index', 'counterUser.index');

    app.post('/api/v1/counterUser/:userId', 'counterUser.assignCounters'); // assign some counter specified by counterId to some user specified by userId
    app.delete('/api/v1/counterUser/:userId', 'counterUser.retrieveCounters'); //  retrieve some counters specified by counterId from some user
    app.delete('/api/v1/counterUser/onKeyRetrive/:userId', 'counterUser.oneKeyRetrive'); // retrive all counters assigned to some user
}



//app.post('/api/v1/counterUser/:userId', 'counterUser.assignCounters'); // assign some counter specified by counterId to some user specified by userId
// 
// {
//     counters: 
//     [
//         {
//             counterId,
//             type,
//         },
//         {
//             counterId,
//             type
//         }
//     ]
// }    


    
// app.delete('/api/v1/counterUser/:userId', 'counterUser.retrieveCounters'); //  retrieve some counters specified by counterId from users specified by userId
// {
//     counters: [
//         {
//             counterId,
//         },
//         {
//             counterId,
//         }
//     ]
// }



// app.delete('/api/v1/counterUser/onKeyRetrive/:userId', 'counterUser.oneKeyRetrive'); // retrive all counters assigned to some user
// no attributes needed
// {

// }