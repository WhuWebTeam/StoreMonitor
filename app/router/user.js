module.exports = app => {
    app.get('/api/v1/user/index', 'user.index'); // user module index test

    app.get('/api/v1/user', 'user.getUsers'); // get users' info
    app.get('/api/v1/user/:userId', 'user.getUser'); // get some user's info
    app.put('/api/v1/users/:userId', 'user.changeLevel'); // change user's level, high level user can modify low level user's level
    app.put('/api/v1/user/password/:userId', 'user.changePassword'); // change some user's password
    app.post('/api/v1/user/:userId', 'user.addUser'); // add some user
    app.post('/api/v1/user/signIn', 'user.signIn'); // user login
    app.delete('/api/v1/user/:userId', 'user.deleteUser'); // delete some user
}


// app.put('/api/v1/users/:userId', 'user.changeLevel'); // change user's level, high level user can modify low level user's level
// :userId oprateman's userNumber
// {
//      userNumber,
//      level   
// }


// app.put('/api/v1/user/password/:userId', 'user.changePassword'); // change some user's password
// :userId oprateman's userNumber
// {
//     password
// }


// app.post('/api/v1/user/:userId', 'user.addUser'); // add some user
// :userId oprateman's userNumber
// {
//     userNumber,
//     userName,
//     password,
//     level,
//     phone,
//     email
// }


// app.post('/api/v1/user/signIn', 'user.signIn'); // user login
// {
//     userNumber,
//     password
// }

// app.delete('/api/v1/user/:userId', 'user.deleteUser'); // delete some user
// :userId oprateman's userNumber
// {
//     userNmuber
// }