module.exports = app => {
    // app.controller.video test
    app.get('/api/v1/video/index', 'video.index');

    app.post('/api/v1/video', 'video.getDVAData'); // a new video record from DVA system
}