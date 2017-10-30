module.exports = app => {
    class Index extends app.Controller {
        async index() {
            this.ctx.body = {
                code: 400,
                data: 'access successful'
            };
        }
    }

    return Index;
}