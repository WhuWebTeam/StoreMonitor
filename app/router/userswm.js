module.exports = app => {
    // wuMartUsers controller test
    app.get('/api/v1/userswm/index', 'userswm.index');
    
    app.get('/api/v1/userswm/users', 'userswm.getUsers');  // get wu mei users' info
    app.post('/api/v1/userswm/users/query', 'userswm.getUser'); // get info of some wu mei users specified by wmUserId, wmUserLvl, authorityId, name phone, email
}

// get info of some wu mei users specified by wmUserId, wmUserLvl, authorityId, name, phone or email
// app.post('/api/v1/userswm/users/query', 'userswm.getUser');
// {
//     wmUserId,
// 	   wmUserLvl,
// 	   authorityId,
// 	   name,
// 	   phone,
// 	   email
// }