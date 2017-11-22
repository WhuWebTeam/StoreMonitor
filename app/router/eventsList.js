module.exports = app => {
    // app.controller.eventsList test
    app.get('/api/v1/evensList/index', 'eventsList.index');

    app.get('/api/v1/eventsList', 'eventsList.getEventsList'); // get all eventsList's info
    app.get('/api/v1/eventsList/count', 'eventsList.getCount'); // get count of eventsList total, unconfirmed, confirmed
    // app.get('/api/v1/eventsList/:status', 'eventsList.getlists'); // get record of eventsList record
    app.put('/api/v1/eventsList/result/:ts', 'eventsList.setResult'); // confirm the scan result
    app.put('/api/v1/eventsList/status/:ts', 'eventsList.StoreEventsList'); // set some eventList status to temp store
    app.post('/api/v1/eventsList/query', 'eventsList.getEventList'); // get info of some eventList specied by id, transId, ts, createTime, updateTime, editResult, videoUrl, pic1Url, pic2Url, pic3Url, pic4Url
}


// app.put('/api/v1/eventsList/result/:ts', 'eventLists.setResult'); // confirm the scan result
// {
//     editResult
// }


// app.put('/api/v1/eventsList/status/:ts', 'eventsList.StoreEventsList'); // set some eventList status to temp store
// there is no parameter
// {

// }



// app.post('/api/v1/eventsList/query', 'eventsList.getEventList'); // get info of some eventList specied by id, transId, ts, createTime, updateTime, editResult, videoUrl, pic1Url, pic2Url, pic3Url, pic4Url
// attributes belongs to the following object
// {
//     id,
//     transId,
//     ts,
//     createTime,
//     updateTime,
//     videoUrl,
//     pic1Url,
//     pic2Url,
//     pic3Url,
//     pic4Url
// }