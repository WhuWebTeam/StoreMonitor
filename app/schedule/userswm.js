module.exports = app => {
    return {
        schedule: {
            cron: '* * */1 * * *',
            type: 'all',
            immediate: true,
            disable: app.config.env === 'server'
        },

        async task(ctx) {
            
            // get users' info of Wu Mei supermarket
            const wmusers = await ctx.curl('https://registry.npm.taobao.org/egg/latest', {
                contentType: 'json',
            });

            console.log(wmusers.data);
            // write users' info of Wu Mei supermarket to local database(company.userswm)
            // wmusers.map(wmuser => {

            //     // format users' info of Wu Mei supermarket to table structure
            //     let user = {};
            //     user.wmUserId = wmuser.id || ''; //-----  not null restrict
            //     user.wmUserLvl = wmuser.level || '';
            //     user.userName = wmuser.name || '';
            //     user.phone = wmuser.phone || '';
            //     user.email = wmuser.email || '';
            //     user.authorityId = '';

            // //     if (!await ctx.app.service.userswm.exists(user.wmUserId)) {
            // //         return;
            // //     }

            // //     await app.service.dbHelp.insert('userswm', user);
            // });
        }
    }
}