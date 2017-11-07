module.exports = app => {

    // wuMartUsers controller test
    app.get('/api/v1/wuMartUsers/index', 'wuMartUsers.index');

    app.get('/api/v1/wuMartUsers/users', 'wuMartUsers.getUsers');  // get wu mei users' info
    app.get('/api/v1/wuMartUsers/user/:userId', 'wuMartUsers.getUser'); // get wu mei some user's info
}