module.exports = app => {
    // app.controller.eventsList test
    app.get('/api/v1/evensList/index', 'eventsList.index');

    app.get('/api/v1/eventsList/count', 'eventsList.getCount'); // get count of eventsList total, unconfirmed, confirmed
    app.get('/api/v1/eventsList/list/:status', 'eventsList.getEventListByStatus'); // get list of eventList record by status
    app.get('/api/v1/eventsList/list/:status/:result', 'eventsList.getEventList'); // get list of eventList record by status and result used to filer
    app.get('/api/v1/eventsList/graph/:day', 'eventsList.getEventsListGraph'); // get statistics graph of eventsList (day: 'day', 'month', 'week')
    app.get('/api/v1/eventsList/editInfo/:sysKey', 'eventsList.getEditInfo'); // get some event's edit information
    app.put('/api/v1/eventsList/:sysKey', 'eventsList.eventEdit'); // modify some eventList's info
    app.put('/api/v1/eventsList/status', 'eventsList.StoreEventsList'); // set some eventList status to temp store
}

// app.put('/api/v1/eventsList/:sysKey', 'eventsList.eventEdit'); // modify some eventList's info
// attributes of the following object
// {
//     editResult,
//     comments,
//     productName,
//     price
// }


// app.put('/api/v1/eventsList/status', 'eventsList.StoreEventsList'); // set some eventList status to temp store
// [
//     {
//         sysKey,
//     },
//     {
//         sysKey,
//     },
//     {
//         sysKey,
//     }
// ]