module.exports = app => {
    class ProductSalesInfo extends app.Controller {
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }

    }

    return ProductSalesInfo;
}