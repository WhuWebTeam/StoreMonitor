module.exports = app => {
    // app.controller.eventsList test
    app.get('/api/v1/evensList/index', 'eventLists.index');

    app.put('/api/v1/eventsList/result/:transId/:ts', 'eventLists.setResult'); // confirm the scan result
}


// app.put('/api/v1/eventsList/result/:transId/:ts', 'eventLists.setResult'); // confirm the scan result
// {
//     editResult
// }