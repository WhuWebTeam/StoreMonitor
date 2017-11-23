module.exports = app => {
    return {
        schedule: {
            interval: '1m',
            type: 'all',
            // immediate: true,
            // disable: app.config.env === 'server'
            disable: true
        },

        async task(ctx) {
            await ctx.service.productSalesInfo.migrate();
        }
    }
}