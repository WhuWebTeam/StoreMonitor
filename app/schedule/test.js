module.exports = app => {
    return {
        schedule: {
            interval: '1s',
            type: 'all',
            immediate: false,
            disable: app.config.env === 'local'
        },

        async task(ctx) {
            let result = await ctx.curl('http://localhost:7002/api/v1/users/signIn', {
                method: 'post',
                contentType: 'json',
                data: {
                    id: '10003',
                    password: '123'
                },
                dataType: 'json',
                timeout: 3000
            });

            // let result = await ctx.curl('http://localhost:7002/database', {
            //     method: 'get',
            //     data: {
            //         id: '10003',
            //         password: '123'
            //     },
            //     dataType: 'json',
            //     timeout: 3000
            // });
        }
    }
}