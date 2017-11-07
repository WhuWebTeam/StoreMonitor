/**
 * urls releated to users work for safe of count line
 * @module users
 * 
 * @file StroeMonitor
 * @version 0.0.1
 */

/** users */

module.exports = app => {
    app.get('/api/v1/user/index', 'user.index'); // user module index test

    app.get('/api/v1/user', 'user.getUsers'); // get users' info
    app.get('/api/v1/user/:userId', 'user.getUser'); // get some user's info
    app.put('/api/v1/users/authority/:userId', 'user.changeAuthority'); // change user's authority, high level user can modify low level user's level
    app.put('/api/v1/user/password/:userId', 'user.changePassword'); // change some user's password
    app.post('/api/v1/user/:userId', 'user.addUser'); // add some user
    app.post('/api/v1/user/signIn', 'user.signIn'); // user login
    app.delete('/api/v1/user/:userId', 'user.deleteUser'); // delete some user
}


// app.put('/api/v1/users/:userId', 'user.changeAuthority'); // change user's level, high authority user can modify low level user's level
// :userId oprateman's id
// {
//      id,
//      authorityId
// }


// app.put('/api/v1/user/password/:userId', 'user.changePassword'); // change some user's password
// :userId oprateman's id
// {
//     password
// }


// app.post('/api/v1/user/:userId', 'user.addUser'); // add some user
// :userId oprateman's id
// {
//     id,
//     userName,
//     password,
//     phone,
//     email
// }


// app.post('/api/v1/user/signIn', 'user.signIn'); // user login
// {
//     id,
//     password
// }

// app.delete('/api/v1/user/:userId', 'user.deleteUser'); // delete some user
// :userId oprateman's id
// {
//     id
// }