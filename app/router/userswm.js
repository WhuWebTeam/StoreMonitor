module.exports = app => {
    
        // wuMartUsers controller test
        app.get('/api/v1/userswm/index', 'userswm.index');
    
        app.get('/api/v1/userswm/users', 'userswm.getUsers');  // get wu mei users' info
        app.get('/api/v1/userswm/user/:userId', 'userswm.getUser'); // get wu mei some user's info
}