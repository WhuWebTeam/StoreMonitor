module.exports = app => {
    class Test extends app.Controller {
        async maxTs() {
            this.ctx.body = await this.service.cashierSalesInfo.maxTs();
        }
    }

    return Test;
}