module.exports = app => {
    // app.controller.eventsList test
    app.get('/api/v1/evensList/index', 'eventsList.index');

    app.put('/api/v1/eventsList/result/:ts', 'eventsList.setResult'); // confirm the scan result
}


// app.put('/api/v1/eventsList/result/:ts', 'eventLists.setResult'); // confirm the scan result
// ts must exist
// {
//     editResult
// }