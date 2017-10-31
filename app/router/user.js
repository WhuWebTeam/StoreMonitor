module.exports = app => {
    app.get('/api/v1/user/index', 'user.index');

    app.get('/api/v1/user', 'user.getUsers');
    app.get('/api/v1/user/:userId', 'user.getUser');
    app.put('/api/v1/users/:userId', 'user.modifyUser');
    app.post('/api/v1/user', 'user.addUser');
    app.delete('/api/v1/user/:userId', 'user.deleteUser');
}