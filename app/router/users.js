/**
 * urls releated to users work for safe of count line
 * @module users
 * 
 * @file StroeMonitor
 * @version 0.0.1
 */

/** users */

module.exports = app => {
    app.get('/api/v1/users/index', 'users.index'); // user module index test

    app.get('/api/v1/users', 'users.getUsers'); // get users' info
    app.put('/api/v1/users/authority/:userId', 'users.changeAuthority'); // change user's authority, high level user can modify low level user's level
    app.put('/api/v1/users/password/:userId', 'users.changePassword'); // change some user's password
    app.put('/api/v1/users', 'users.modifyUser'); // modify user's info
    app.post('/api/v1/users/query', 'users.getUser'); // get some info of some users specified by id, userName, password, authorityId, phone, email
    app.post('/api/v1/users/signIn', 'users.signIn'); // user login
    app.post('/api/v1/users', 'users.addUser'); // add some user
    app.delete('/api/v1/users/:userId', 'users.deleteUser'); // delete some user
}


// app.put('/api/v1/users/:userId', 'user.changeAuthority'); // change user's level, high authority user can modify low level user's level
// :userId oprateman's id
// {
//      id,
//      authorityId
// }



// app.put('/api/v1/users/password/:userId', 'user.changePassword'); // change some user's password
// :userId oprateman's id
// {
//     id,
//     password
// }



// app.post('/api/v1/users/query', 'users.getUser'); // get some info of some users specified by id, userName, password, authorityId, phone, email
// attributes belonging to the following object
// {
//     id,
//     userName,
//     password,
//     authorityId,
//     phone,
//     email
// }



// app.post('/api/v1/users/signIn', 'user.signIn'); // user login
// {
//     id,
//     password
// }



// app.post('/api/v1/users', 'user.addUser'); // add some user
// :userId oprateman's id
// attributes belonging to the following object, id must exists
// {
//     id,
//     userName,
//     password,
//     phone,
//     email
// }



// app.delete('/api/v1/users/:userId', 'user.deleteUser'); // delete some user
// :userId oprateman's id
// {
//     id
// }
