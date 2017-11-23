module.exports = app => {

    app.get('/api/v1/eventTAT/index', 'eventTAT.index'); // index test

    app.post('/api/v1/eventTAT/openTime/:sysKey', 'eventTAT.eventOpenTime'); // log open event's time(type:0)
    app.post('/api/v1/eventTAT/storeTime/:sysKey', 'eventTAT.eventStoreTime'); // log store event's time(type:1)
    app.post('/api/v1/eventTAT/commitTime/:sysKey', 'eventTAT.eventCommitTime'); // log commit event's time(type:2)
}