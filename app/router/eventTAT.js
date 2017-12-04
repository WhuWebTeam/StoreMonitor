

/**
 * URL releated to oprate table eventTAT
 * @module eventTAT
 * @since 1.0.0
 */
module.exports = app => {

    app.get('/api/v1/eventTAT/index', 'eventTAT.index'); // index test

    app.get('/api/v1/eventTAT/responseTime/:userId/:day', 'eventTAT.getResponseTime'); // get manager's response time(day: 'week', 'month', '3month', '6month')
    app.post('/api/v1/eventTAT/openTime/:sysKey', 'eventTAT.eventOpenTime'); // log open event's time(type:0)
    app.post('/api/v1/eventTAT/storeTime/:sysKey', 'eventTAT.eventStoreTime'); // log store event's time(type:1)
    app.post('/api/v1/eventTAT/commitTime/:sysKey', 'eventTAT.eventCommitTime'); // log commit event's time(type:2)
    app.post('/api/v1/eventTAT/oneKeyCommit', 'eventTAT.eventCommitTimes'); // log many commit events' time(type:2)
}



// app.post('/api/v1/eventTAT/openTime/:sysKey', 'eventTAT.eventOpenTime'); // log open event's time(type:0)
// no attributes need
// {

// }



// app.post('/api/v1/eventTAT/storeTime/:sysKey', 'eventTAT.eventStoreTime'); // log store event's time(type:1)
// no attributes needed
// {

// }



// app.post('/api/v1/eventTAT/commitTime/:sysKey', 'eventTAT.eventCommitTime'); // log commit event's time(type:2)
// no attributes needed
// {

// }



// app.post('/api/v1/eventTAT/oneKeyCommit', 'eventTAT.eventCommitTimes'); // log many commit events' time
// [
//     {
//         sysKey,
//     },
//     {
//         sysKey
//     }
// ]