module.exports = app => {
    app.get('/api/v1/vedio/index', 'vedio.index');

    app.post('/api/v1/vedio', 'vedio.addVedioRecord');
}