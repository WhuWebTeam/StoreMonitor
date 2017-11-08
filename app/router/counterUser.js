module.exports = app => {
    
    // app.controller.counterUser test
    app.get('/api/v1/counterUser/index', 'counterUser.index');

    app.get('/api/v1/counterUsers', 'counterUser.getCounterUsers'); // get info of counterUsers
    app.put('/api/v1/counterUser/:userId/:counterId', 'counterUser.modifyCounterUser'); // modify counterUser recoed's type
    app.post('/api/v1/counterUser', 'counterUser.getCounterUser'); // get info of some counterUser specified by userId and CounterId
    app.post('/api/v1/counterUser/:userId/:counterId', 'counterUser.assignCounter'); // assign some counter specified by counterId to some user specified by userId
    app.delete('/api/v1/counterUser/:userId/:counterId', 'counterUser.retrieveCounter'); // retrieve some counter specified by counterId from user specified by userId
}