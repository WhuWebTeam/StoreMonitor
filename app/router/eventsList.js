

/**
 * URL releated to oprate table eventsList
 * @module eventsList
 * @since 1.0.0
 */
module.exports = app => {

    // app.controller.eventsList test
    app.get('/api/v1/evensList/index', 'eventsList.index');

    app.get('/api/v1/eventsList/count/:userId', 'eventsList.getCount'); // get count of eventsList total, unconfirmed, confirmed
    app.get('/api/v1/eventsList/count/manager/:userId', 'eventsList.getManageDealCount'); //get the total, uncomfirmed, confirmed count of store manager and district manager
    app.get('/api/v1/eventsList/dayCount/:userId', 'eventsList.getDayCount'); // get last day's count in dealing and completed
    app.get('/api/v1/eventsList/rate/:day/:userId', 'eventsList.getEventsRate'); // get the rate of events count during some time(day: 'week', 'month', '3month', '6month')
    app.get('/api/v1/eventsList/rate/graph/manager/:userId', 'eventsList.getErrorRateGrahp'); // get the error rate graph statistic of shops
    app.get('/api/v1/eventsList/rate/list/manager/:userId/:day', 'eventsList.getErrorRateList'); // get the error rate of list of shops(day: 'week', 'month', '3month', '6month')
    app.get('/api/v1/eventsList/list/:status/:userId', 'eventsList.getEventListByStatus'); // get list of eventList record by status
    app.get('/api/v1/eventsList/list/manager/:status/:userId', 'eventsList.getManageEventListByStatus'); // get list of store manager and district manager
    app.get('/api/v1/eventsList/list/:status/:result', 'eventsList.getEventList'); // get list of eventList record by status and result used to filer
    app.get('/api/v1/eventsList/graph/:day', 'eventsList.getEventsListGraph'); // get statistics graph of eventsList (day: 'day', 'month', 'week')
    app.get('/api/v1/eventsList/editInfo/:sysKey', 'eventsList.getEditInfo'); // get some event's edit information
    app.put('/api/v1/eventsList/:sysKey', 'eventsList.eventEdit'); // modify some eventList's info
    app.put('/api/v1/eventsList/status/commit/:sysKey', 'eventsList.commitEventList'); // commit some eventList, set its status to 2
    app.put('/api/v1/eventsList/status/store/:sysKey', 'eventsList.storeEventList'); // store some eventList, set its status to 1
    app.put('/api/v1/eventsList/status/commit', 'eventsList.commitEventsList'); // commit some eventsList, set their status to 2
    app.put('/api/v1/eventsList/status/store', 'eventsList.StoreEventsList');  // store some eventsList, set their status to 1
}



// app.put('/api/v1/eventsList/:sysKey', 'eventsList.eventEdit'); // modify some eventList's info
// attributes of the following object
// {
//     editResult,
//     comments,
//     productName,
//     price
// }



// app.put('/api/v1/eventsList/status/commit/:sysKey', 'eventsList.commitEventList'); // commit some eventList, set its status to 2
// no attributes needed
// {

// }



// app.put('/api/v1/eventsList/status/store/:sysKey', 'eventsList.storeEventList'); // store some eventList, set its status to 1
// no attributes needed
// {

// }



// app.put('/api/v1/eventsList/status/commit', 'eventsList.commitEventsList'); // commit some eventsList, set their status to 2
// [
//     {
//         sysKey
//     },
//     {
//         sysKey
//     },
//     {
//         sysKey
//     }
// ]



// app.put('/api/v1/eventsList/status/store/:sysKey', 'eventsList.storeEventList'); // store some eventList, set its status to 1
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