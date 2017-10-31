module.exports = app => {
    app.get('/', 'index.index');
    app.get('/database', 'index.pgTest');

    require('./router/user')(app);
    require('./router/vedio')(app);
}