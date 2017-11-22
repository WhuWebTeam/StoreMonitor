module.exports = app => {
    return {
        schedule: {
            interval: '10s',
            type: 'all',
            immediate: true,
            disable: app.config.env === 'server'
        },

        async task(ctx) {
            await ctx.service.productSalesInfo.migrate();
        }
    }
}