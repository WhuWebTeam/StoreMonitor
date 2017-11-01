module.exports = app => {
    app.get('/api/v1/user/index', 'user.index'); // user module index test

    app.get('/api/v1/user', 'user.getUsers'); // get users' info
    app.get('/api/v1/user/:userId', 'user.getUser'); // get some user's info
    app.put('/api/v1/users/:userId', 'user.modifyUser'); // bind user to count line
    app.put('/api/v1/user/password/:userId', 'user.changePassword'); // change some user's password
    app.post('/api/v1/user', 'user.addUser'); // add some user
    app.delete('/api/v1/user/:userId', 'user.deleteUser'); // delete some user 
}