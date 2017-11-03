module.exports = app => {
    return {
        schedule: {
            interval: '1s',
            type: 'worker',
            immediate: false,
            disable: app.config.env === 'local'
        },

        async task(ctx) {
            ctx.service.test.print('interval');
        }
    }
}