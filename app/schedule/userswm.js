module.exports = app => {
    return {
        schedule: {
            cron: '* * */1 * * *',
            type: 'all',
            immediate: false,
            disable: app.config.env === 'local'
        },

        async task(ctx) {
            
            // get users' info of Wu Mei supermarket
            let wmusers = await ctx.curl('https://httpbin.org/get?foo=bar', {
                dataType: 'json',
                timeout: 60000,
            });

            // write users' info of Wu Mei supermarket to local database(company.userswm)
            // wmusers.map(wmuser => {

            //     // format users' info of Wu Mei supermarket to table structure
            //     let user = {};
            //     user.wmUserId = wmuser.id || '10001'; //-----  not null restrict
            //     user.wmUserLvl = wmuser.level || '';
            //     user.userName = wmuser.name || '';
            //     user.phone = wmuser.phone || '';
            //     user.email = wmuser.email || '';
            //     user.authorityId = '';

                // if (!await ctx.service.userswm.exists(user.wmUserId)) {
                //     return;
                // }

                // await app.service.dbHelp.insert('userswm', user);


                //  ctx.service.test.print('cron');
            // });
        }
    }
}