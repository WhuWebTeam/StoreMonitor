module.exports = app => {
    class Event extends app.Controller {
        async index() {
            this.ctx.body = {
                code: 400,
                data: 'Test Successful'
            }
        }
    }

    return Event;
}