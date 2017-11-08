module.exports = app => {
    
    // controller.counters test
    app.get('/api/v1/counters/index', 'counters.index');


    app.get('/api/v1/counters', 'counters.getCounters'); // get counters' info
    app.get('/api/v1/counters/:counterId', 'counters.getCounter'); // get info of some counter spoecified by id
    app.get('/api/v1/counters/assigned', 'counters.getCountersAssigned'); // get info of counters assigned
    app.get('/api/v1/counters/notAssaigned', 'counters.getCOuntersNotAssigned'); // get info of counters not assigned
    app.put('/api/v1/counters/:counterId', 'counters.modifyCounter'); // modify info of some counter specified by id
    app.post('/api/v1/counters', 'counters.addCounter'); // add a new counter
}

// app.put('/api/v1/counters/:counterId', 'counters.modifyCounter'); // modify info of some counter specified by id
// :counterId counter's serial number
// {
//     shopId,
//     type,
//     details
// }


// app.post('/api/v1/counters', 'counters.addCounter'); // add a new counter
// {
//     id,
//     shopId,
//     type,
//     details
// }