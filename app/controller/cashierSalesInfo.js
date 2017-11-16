module.exports = app => {
    class CashierSalesInfo extends app.Controller {
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }

    }

    return CashierSalesInfo;
}