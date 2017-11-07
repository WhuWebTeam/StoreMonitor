module.exports = app => {
    return {
        schedule: {
            cron: '* */10 2 * * *',
            type: 'all',
            immediate: false,
            disable: app.config.env === 'server'
        },

        async task(ctx) {
            const wmUsers = 'dsg'; // ------------ request wm api to get wu staffs' info

        }
    }
}