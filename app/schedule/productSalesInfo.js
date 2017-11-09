module.exports = app => {
    return {
        schedule: {
            interval: '1s',
            type: 'all',
            immediate: false,
            disable: app.config.env === 'server'
        },

        async task(ctx) {
            console.log('producSalesInfo');
        }
    }
}