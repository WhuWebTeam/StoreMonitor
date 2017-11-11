module.exports = app => {
    return {
        schedule: {
            cron: '*/1 31 12 * * *',
            type: 'all',
            immediate: false,
            disable: app.config.env === 'local'
        },

        async task(ctx) {
            console.log('cron');
        }
    }
}