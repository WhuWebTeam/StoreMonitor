module.exports = app => {
    return {
        schedule: {
            interval: '1s',
            type: 'all',
            immediate: false,
            disable: app.config.env === 'local'
        },

        async task(ctx) {
            console.log('')
            // const ts = await ctx.service.
        }
    }
}