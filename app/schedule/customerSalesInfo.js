module.exports = app => {
    return {
        schedule: {
            interval: '1m',
            type: 'all',
            immediate: true,
            disable: app.config.env === 'server'
        },

        async task(ctx) {
            await ctx.service.customerSalesInfo.migrate();
        }
    }
}