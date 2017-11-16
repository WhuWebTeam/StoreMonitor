module.exports = app => {
    return {
        schedule: {
            interval: '10s',
            type: 'all',
            immediate: true,
            disable: app.config.env === 'server'
        },

        async task(ctx) {
            await ctx.service.logger.logDefault('running', 'migrate new data from bills to productSalesInfo');
            await ctx.service.productSalesInfo.migrate();
        }
    }
}