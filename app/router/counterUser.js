module.exports = app => {
    
    // app.controller.counterUser test
    app.get('/api/v1/counterUser/index', 'counterUser.index');

    app.get('/api/v1/counterUser', 'counterUser.getCounterUsers'); // get info of counterUsers
    app.put('/api/v1/counterUser/:userId/:counterId', 'counterUser.modifyCounterUser'); // modify counterUser recoed's type
    app.post('/api/v1/counterUser/query', 'counterUser.getCounterUser'); // get info of some counterUser specified by userId and CounterId
    app.post('/api/v1/counterUser/:userId', 'counterUser.assignCounters'); // assign some counter specified by counterId to some user specified by userId
    app.delete('/api/v1/counterUser/:userId/:counterId', 'counterUser.retrieveCounter'); // retrieve some counter specified by counterId from some user specified by userId
    app.delete('/api/v1/counterUser/:userId', 'counterUser.retrieveCounters'); //  retrieve some counters specified by counterId from users specified by userId
}

    // get assigned info condition query
    // app.post('/api/v1/counterUser', 'counterUser.getCounterUser');
    // one or more attributes of the following object
    // {
    //     id,
    //     counterId,
    //     userId,
    //     type   
    // }

    // assign some counter specified by counterId to some user specified by userId
    // app.post('/api/v1/counterUser/:userId/:counterId', 'counterUser.assignCounter');
    // counterId and userId must exists
    // {
    //     counterId,
    //     userId,
    //     type   
    // }

    
    // retrieve some counter specified by counterId from user specified by userId
    // app.delete('/api/v1/counterUser/:userId/:counterId', 'counterUser.retrieveCounter');