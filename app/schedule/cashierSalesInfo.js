module.exports = app => {
    return {
        schedule: {
            interval: '10m',
            type: 'all',
            immediate: false,
            disable: app.config.env === 'server'
        },

        async task(ctx) {
            await ctx.service.logger.logDefault('running', 'migrate new data from bills to cashierSalesInfo');
            await ctx.service.cashierSalesInfo.migrate();
        }
    }
}