module.exports = app => {
    return {
        schedule: {
            interval: '10m',
            type: 'all',
            immediate: false,
            disable: app.config.env === 'server'
        },

        async task(ctx) {
            await ctx.service.logger.logDefault('running', 'migrate new data from bills to customerSalesInfo');
            await ctx.service.customerSalesInfo.migrate();
        }
    }
}