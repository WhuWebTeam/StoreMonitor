module.exports = app => {
    class CustomerSalesInfo extends app.Controller {
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }
 
    }

    return CustomerSalesInfo;
}