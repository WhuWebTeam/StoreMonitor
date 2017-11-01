module.exports = app => {
    app.get('/api/v1/video/index', 'video.index');

    app.post('/api/v1/video', 'video.addVideoRecord');
}