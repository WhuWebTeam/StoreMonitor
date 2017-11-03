/**
 * urls releated to video
 * @module video
 * 
 * @file StroeMonitor
 * @version 0.0.1
 */

/** video */
module.exports = app => {
    app.get('/api/v1/video/index', 'video.index');

    // used to get data from DVA system
    app.post('/api/v1/video', 'video.addVideoRecord');
}