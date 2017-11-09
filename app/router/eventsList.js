module.exports = app => {
    // app.controller.eventsList test
    app.get('/api/v1/evensList/index', 'eventsList.index');

    app.put('/api/v1/eventsList/result', 'eventsList.setResult'); // confirm the scan result
}


// app.put('/api/v1/eventsList/result', 'eventLists.setResult'); // confirm the scan result
// transId, ts must exist
// {
//     transId,
//     ts,
//     editResult
// }