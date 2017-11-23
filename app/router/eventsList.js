module.exports = app => {
    // app.controller.eventsList test
    app.get('/api/v1/evensList/index', 'eventsList.index');

    app.get('/api/v1/eventsList/count', 'eventsList.getCount'); // get count of eventsList total, unconfirmed, confirmed
    app.get('/api/v1/eventsList/:status', 'eventsList.getEventListByStatus'); // get list of eventList record by status
    app.get('/api/v1/eventsList/:status/:result', 'eventsList.getEventList'); // get list of eventList record
    app.get('/api/v1/eventsList/:day', 'eventsList.getEventsListGraph'); // get statistics graph of eventsList (day: 'day', 'month', 'week')
    app.put('/api/v1/eventsList/result/:ts', 'eventsList.setResult'); // confirm the scan result
    app.put('/api/v1/eventsList/status/:ts', 'eventsList.StoreEventsList'); // set some eventList status to temp store
}
